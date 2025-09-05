import React, { useState } from 'react';
import { Briefcase, Home, Heart, TrendingUp, MapPin, DollarSign } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function UserDashboard() {
  const { savedItems, jobs, housing, getJobById, getHousingById } = useData();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const savedJobs = savedItems
    .filter(item => item.type === 'job')
    .map(item => getJobById(item.itemId))
    .filter(Boolean);

  const savedHousing = savedItems
    .filter(item => item.type === 'housing')
    .map(item => getHousingById(item.itemId))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
          <p className="text-gray-600 mt-2">Track your job search and housing preferences</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{savedJobs.length}</div>
                <div className="text-sm text-gray-600">Saved Jobs</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{savedHousing.length}</div>
                <div className="text-sm text-gray-600">Saved Housing</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{savedItems.length}</div>
                <div className="text-sm text-gray-600">Total Saved</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">Applications</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'jobs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Saved Jobs ({savedJobs.length})
              </button>
              <button
                onClick={() => setActiveTab('housing')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'housing'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Saved Housing ({savedHousing.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  {savedItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">No saved items yet</h4>
                      <p className="text-gray-600 mb-4">Start exploring jobs and housing options to save your favorites.</p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                          to="/jobs"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Browse Jobs
                        </Link>
                        <Link
                          to="/housing"
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Find Housing
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedItems.slice(0, 5).map(item => {
                        const data = item.type === 'job' ? getJobById(item.itemId) : getHousingById(item.itemId);
                        if (!data) return null;

                        return (
                          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              {item.type === 'job' ? (
                                <Briefcase className="h-5 w-5 text-blue-600 mr-3" />
                              ) : (
                                <Home className="h-5 w-5 text-green-600 mr-3" />
                              )}
                              <div>
                                <div className="font-medium text-gray-900">{data.title}</div>
                                <div className="text-sm text-gray-500">
                                  Saved {new Date(item.savedAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <Link
                              to={`/${item.type === 'job' ? 'jobs' : 'housing'}/${data.id}`}
                              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                              View Details
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Saved Jobs Tab */}
            {activeTab === 'jobs' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Saved Jobs</h3>
                {savedJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No saved jobs</h4>
                    <p className="text-gray-600 mb-4">Save interesting job postings to review later.</p>
                    <Link
                      to="/jobs"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Browse Jobs
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {savedJobs.map(job => (
                      <div key={job!.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">{job!.title}</h4>
                            <div className="text-sm text-gray-600">{job!.company}</div>
                          </div>
                          <span className="text-sm text-green-600 font-medium">
                            ₹{job!.salary.toLocaleString()}/{job!.salaryType === 'monthly' ? 'mo' : 'yr'}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job!.location}</span>
                        </div>
                        <Link
                          to={`/jobs/${job!.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          View Details →
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Saved Housing Tab */}
            {activeTab === 'housing' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Saved Housing</h3>
                {savedHousing.length === 0 ? (
                  <div className="text-center py-12">
                    <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No saved housing</h4>
                    <p className="text-gray-600 mb-4">Save housing options you're interested in.</p>
                    <Link
                      to="/housing"
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Find Housing
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {savedHousing.map(house => (
                      <div key={house!.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">{house!.title}</h4>
                            <div className="text-sm text-gray-600 capitalize">{house!.type}</div>
                          </div>
                          <span className="text-sm text-green-600 font-medium">
                            ₹{house!.rent.toLocaleString()}/mo
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{house!.area}, {house!.city}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <span>{house!.bedrooms} Bed • {house!.bathrooms} Bath</span>
                        </div>
                        <Link
                          to={`/housing/${house!.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          View Details →
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;