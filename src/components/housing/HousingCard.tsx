import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Home, Bed, Bath, Heart, Users } from 'lucide-react';
import { Housing } from '../../types';
import { useData } from '../../contexts/DataContext';

interface HousingCardProps {
  housing: Housing;
}

function HousingCard({ housing }: HousingCardProps) {
  const { savedItems, saveItem, unsaveItem } = useData();
  const isSaved = savedItems.some(item => item.type === 'housing' && item.itemId === housing.id);

  const handleSaveToggle = () => {
    if (isSaved) {
      unsaveItem('housing', housing.id);
    } else {
      saveItem('housing', housing.id);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'apartment': return 'bg-blue-100 text-blue-800';
      case 'house': return 'bg-green-100 text-green-800';
      case 'pg': return 'bg-purple-100 text-purple-800';
      case 'shared': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={housing.images[0]}
          alt={housing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleSaveToggle}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isSaved 
              ? 'text-red-500 bg-white shadow-md' 
              : 'text-white bg-black bg-opacity-20 hover:bg-opacity-40'
          }`}
        >
          <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Link to={`/housing/${housing.id}`}>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {housing.title}
              </h3>
            </Link>
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{housing.area}, {housing.city}</span>
            </div>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(housing.type)}`}>
            {housing.type.toUpperCase()}
          </span>
        </div>

        {/* Property Details */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{housing.bedrooms} Bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{housing.bathrooms} Bath</span>
          </div>
          {housing.type === 'shared' || housing.type === 'pg' ? (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>Shared</span>
            </div>
          ) : null}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-4">
          {housing.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              {amenity}
            </span>
          ))}
          {housing.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              +{housing.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center text-green-600 font-semibold text-lg">
              <DollarSign className="h-5 w-5 mr-1" />
              <span>₹{housing.rent.toLocaleString()}</span>
            </div>
            <div className="text-xs text-gray-500">+ ₹{housing.deposit.toLocaleString()} deposit</div>
          </div>
          
          <Link
            to={`/housing/${housing.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center"
          >
            View Details
            <Home className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HousingCard;