import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, DollarSign, Briefcase, Building, Calendar, Users, ArrowRight, Heart, Share2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import HousingRecommendations from '../components/relocation/HousingRecommendations';

function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getJobById, savedItems, saveItem, unsaveItem } = useData();
  const { isAuthenticated } = useAuth();
  
  const job = getJobById(id!);
  const isSaved = savedItems.some(item => item.type === 'job' && item.itemId === job?.id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-700 font-medium">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveToggle = () => {
    if (isSaved) {
      unsaveItem('job', job.id);
    } else {
      saveItem('job', job.id);
    }
  };

  const formatSalary = (salary: number, type: string) => {
    return `₹${salary.toLocaleString()}${type === 'monthly' ? '/month' : '/year'}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/jobs" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Jobs
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Job Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{job.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Building className="h-5 w-5 mr-2" />
                    <span className="text-lg font-medium">{job.company}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{job.workplaceAddress}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSaveToggle}
                    className={`p-3 rounded-full transition-colors ${
                      isSaved 
                        ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Job Meta Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{formatSalary(job.salary, job.salaryType)}</div>
                  <div className="text-sm text-gray-600">Salary</div>
                </div>
                <div className="text-center">
                  <Briefcase className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900 capitalize">{job.experienceLevel}</div>
                  <div className="text-sm text-gray-600">Experience Level</div>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900 capitalize">{job.employmentType.replace('-', ' ')}</div>
                  <div className="text-sm text-gray-600">Employment Type</div>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h3>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex items-center justify-between p-6 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Ready to apply?</h4>
                  <p className="text-sm text-gray-600">Join {job.company} and start your new journey</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Summary</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted on:</span>
                  <span className="text-gray-900">{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Type:</span>
                  <span className="text-gray-900 capitalize">{job.employmentType.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="text-gray-900 capitalize">{job.experienceLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">City:</span>
                  <span className="text-gray-900">{job.city}</span>
                </div>
              </div>
            </div>

            {/* Housing Recommendations */}
            <HousingRecommendations jobId={job.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;