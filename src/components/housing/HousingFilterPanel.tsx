import React from 'react';
import { DollarSign, Home, Bed } from 'lucide-react';

interface HousingFilterPanelProps {
  rentRange: [number, number];
  setRentRange: (range: [number, number]) => void;
  housingType: string;
  setHousingType: (type: string) => void;
  minBedrooms: number;
  setMinBedrooms: (bedrooms: number) => void;
}

function HousingFilterPanel({
  rentRange,
  setRentRange,
  housingType,
  setHousingType,
  minBedrooms,
  setMinBedrooms,
}: HousingFilterPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <Home className="h-5 w-5 mr-2" />
        Filter Housing
      </h3>

      {/* Rent Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
          <DollarSign className="h-4 w-4 mr-2" />
          Monthly Rent
        </label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="number"
              placeholder="Min"
              value={rentRange[0]}
              onChange={(e) => setRentRange([parseInt(e.target.value) || 0, rentRange[1]])}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={rentRange[1]}
              onChange={(e) => setRentRange([rentRange[0], parseInt(e.target.value) || 100000])}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-gray-600">
            ₹{rentRange[0].toLocaleString()} - ₹{rentRange[1].toLocaleString()}
          </div>
        </div>
      </div>

      {/* Housing Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Property Type
        </label>
        <div className="space-y-2">
          {['apartment', 'house', 'pg', 'shared'].map(type => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="housingType"
                value={type}
                checked={housingType === type}
                onChange={(e) => setHousingType(e.target.value)}
                className="mr-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 capitalize">{type}</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="housingType"
              value=""
              checked={housingType === ''}
              onChange={() => setHousingType('')}
              className="mr-3 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">All Types</span>
          </label>
        </div>
      </div>

      {/* Minimum Bedrooms */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Bed className="h-4 w-4 mr-2" />
          Minimum Bedrooms
        </label>
        <select
          value={minBedrooms}
          onChange={(e) => setMinBedrooms(parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value={0}>Any</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          setHousingType('');
          setMinBedrooms(0);
          setRentRange([0, 100000]);
        }}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
}

export default HousingFilterPanel;