import React from 'react';
import { DollarSign, Briefcase, GraduationCap } from 'lucide-react';

interface FilterPanelProps {
  salaryRange: [number, number];
  setSalaryRange: (range: [number, number]) => void;
  experienceLevel: string;
  setExperienceLevel: (level: string) => void;
  employmentType: string;
  setEmploymentType: (type: string) => void;
}

function FilterPanel({
  salaryRange,
  setSalaryRange,
  experienceLevel,
  setExperienceLevel,
  employmentType,
  setEmploymentType,
}: FilterPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <Briefcase className="h-5 w-5 mr-2" />
        Filter Jobs
      </h3>

      {/* Salary Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
          <DollarSign className="h-4 w-4 mr-2" />
          Salary Range (Monthly)
        </label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="number"
              placeholder="Min"
              value={salaryRange[0]}
              onChange={(e) => setSalaryRange([parseInt(e.target.value) || 0, salaryRange[1]])}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={salaryRange[1]}
              onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value) || 200000])}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-gray-600">
            ₹{salaryRange[0].toLocaleString()} - ₹{salaryRange[1].toLocaleString()}
          </div>
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
          <GraduationCap className="h-4 w-4 mr-2" />
          Experience Level
        </label>
        <div className="space-y-2">
          {['entry', 'mid', 'senior'].map(level => (
            <label key={level} className="flex items-center">
              <input
                type="radio"
                name="experienceLevel"
                value={level}
                checked={experienceLevel === level}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="mr-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 capitalize">{level} Level</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="experienceLevel"
              value=""
              checked={experienceLevel === ''}
              onChange={() => setExperienceLevel('')}
              className="mr-3 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">All Levels</span>
          </label>
        </div>
      </div>

      {/* Employment Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Employment Type
        </label>
        <div className="space-y-2">
          {['full-time', 'part-time', 'contract'].map(type => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="employmentType"
                value={type}
                checked={employmentType === type}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="mr-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 capitalize">{type.replace('-', ' ')}</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="employmentType"
              value=""
              checked={employmentType === ''}
              onChange={() => setEmploymentType('')}
              className="mr-3 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">All Types</span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          setExperienceLevel('');
          setEmploymentType('');
          setSalaryRange([0, 200000]);
        }}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
}

export default FilterPanel;