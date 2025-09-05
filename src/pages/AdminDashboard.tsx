import React, { useState } from 'react';
import { BarChart3, Users, Briefcase, Home, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import AdminJobForm from '../components/admin/AdminJobForm';
import AdminHousingForm from '../components/admin/AdminHousingForm';

function AdminDashboard() {
  const { jobs, housing } = useData();
  const [activeTab, setActiveTab] = useState('overview');
  const [showJobForm, setShowJobForm] = useState(false);
  const [showHousingForm, setShowHousingForm] = useState(false);

  const pendingJobs = jobs.filter(job => !job.isApproved).length;
  const pendingHousing = housing.filter(house => !house.isApproved).length;
  const totalUsers = 156; // Mock data

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage jobs, housing, and users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{jobs.length}</div>
                <div className="text-sm text-gray-600">Total Jobs</div>
                {pendingJobs > 0 && (
                  <div className="text-xs text-orange-600 mt-1">{pendingJobs} pending approval</div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{housing.length}</div>
                <div className="text-sm text-gray-600">Housing Listings</div>
                {pendingHousing > 0 && (
                  <div className="text-xs text-orange-600 mt-1">{pendingHousing} pending approval</div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalUsers}</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">89%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
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
                    ? 'border-slate-500 text-slate-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'jobs'
                    ? 'border-slate-500 text-slate-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Manage Jobs
              </button>
              <button
                onClick={() => setActiveTab('housing')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'housing'
                    ? 'border-slate-500 text-slate-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Manage Housing
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setShowJobForm(true)}
                        className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-md transition-colors text-left"
                      >
                        + Add New Job
                      </button>
                      <button
                        onClick={() => setShowHousingForm(true)}
                        className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-md transition-colors text-left"
                      >
                        + Add New Housing
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Pending Reviews</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Job Postings</span>
                        <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">{pendingJobs}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Housing Listings</span>
                        <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">{pendingHousing}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Job Listings</h3>
                  <button
                    onClick={() => setShowJobForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Job
                  </button>
                </div>

                <div className="space-y-4">
                  {jobs.map(job => (
                    <div key={job.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{job.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              job.isApproved 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {job.isApproved ? 'Approved' : 'Pending'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">{job.company}</div>
                          <div className="text-sm text-gray-500">{job.location} • ₹{job.salary.toLocaleString()}/{job.salaryType === 'monthly' ? 'mo' : 'yr'}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!job.isApproved && (
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors">
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-slate-600 hover:bg-red-50 rounded-md transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Housing Tab */}
            {activeTab === 'housing' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Housing Listings</h3>
                  <button
                    onClick={() => setShowHousingForm(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Housing
                  </button>
                </div>

                <div className="space-y-4">
                  {housing.map(house => (
                    <div key={house.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{house.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              house.isApproved 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {house.isApproved ? 'Approved' : 'Pending'}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 capitalize">
                              {house.type}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">{house.area}, {house.city}</div>
                          <div className="text-sm text-gray-500">₹{house.rent.toLocaleString()}/mo • {house.bedrooms} Bed • {house.bathrooms} Bath</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!house.isApproved && (
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors">
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-slate-600 hover:bg-red-50 rounded-md transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        {showJobForm && (
          <AdminJobForm
            onClose={() => setShowJobForm(false)}
            onSubmit={(jobData) => {
              // Handle job creation
              setShowJobForm(false);
            }}
          />
        )}

        {showHousingForm && (
          <AdminHousingForm
            onClose={() => setShowHousingForm(false)}
            onSubmit={(housingData) => {
              // Handle housing creation
              setShowHousingForm(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;