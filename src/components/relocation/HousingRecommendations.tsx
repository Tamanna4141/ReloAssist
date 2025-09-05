import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Home, ArrowRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface HousingRecommendationsProps {
  jobId: string;
}

function HousingRecommendations({ jobId }: HousingRecommendationsProps) {
  const { getNearbyHousing } = useData();
  const nearbyHousing = getNearbyHousing(jobId);

  if (nearbyHousing.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Home className="h-5 w-5 mr-2" />
          Nearby Housing
        </h3>
        <p className="text-gray-600">No housing options found near this workplace.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Home className="h-5 w-5 mr-2" />
          Recommended Housing
        </h3>
        <Link
          to="/housing"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center"
        >
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {nearbyHousing.slice(0, 3).map(housing => (
          <Link
            key={housing.id}
            to={`/housing/${housing.id}`}
            className="block p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {housing.title}
              </h4>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {housing.distance ? `${housing.distance.toFixed(1)} km` : 'Near'}
              </span>
            </div>
            
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{housing.area}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-green-600 font-medium">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>₹{housing.rent.toLocaleString()}/month</span>
              </div>
              <span className="text-xs text-gray-500 capitalize">{housing.type}</span>
            </div>
          </Link>
        ))}
      </div>

      {nearbyHousing.length > 3 && (
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <Link
            to="/housing"
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
          >
            View {nearbyHousing.length - 3} more options
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default HousingRecommendations;