import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Briefcase, Building, Clock, Heart } from 'lucide-react';
import { Job } from '../../types';
import { useData } from '../../contexts/DataContext';

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  const { savedItems, saveItem, unsaveItem } = useData();
  const isSaved = savedItems.some(item => item.type === 'job' && item.itemId === job.id);

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

  const getExperienceBadgeColor = (level: string) => {
    switch (level) {
      case 'entry': return 'bg-green-100 text-green-800';
      case 'mid': return 'bg-blue-100 text-blue-800';
      case 'senior': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link to={`/jobs/${job.id}`}>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
              {job.title}
            </h3>
          </Link>
          <div className="flex items-center text-gray-600 mb-2">
            <Building className="h-4 w-4 mr-2" />
            <span className="font-medium">{job.company}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>
        </div>

        <button
          onClick={handleSaveToggle}
          className={`p-2 rounded-full transition-colors ${
            isSaved 
              ? 'text-red-500 hover:bg-red-50' 
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getExperienceBadgeColor(job.experienceLevel)}`}>
          {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {job.employmentType.replace('-', ' ').toUpperCase()}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-green-600 font-semibold">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>{formatSalary(job.salary, job.salaryType)}</span>
        </div>
        
        <Link
          to={`/jobs/${job.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center"
        >
          View Details
          <Briefcase className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default JobCard;