import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, DollarSign, Home, Bed, Bath, Phone, Mail, Calendar, Share2, Heart } from 'lucide-react';
import { useData } from '../contexts/DataContext';

function HousingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getHousingById, savedItems, saveItem, unsaveItem } = useData();
  
  const housing = getHousingById(id!);
  const isSaved = savedItems.some(item => item.type === 'housing' && item.itemId === housing?.id);

  if (!housing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-4">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/housing" className="text-slate-600 hover:text-slate-700 font-medium">
            Back to Housing
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/housing" className="text-slate-600 hover:text-slate-700 font-medium">
            ← Back to Housing
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="h-96 overflow-hidden">
                <img
                  src={housing.images[0]}
                  alt={housing.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-gray-900">{housing.title}</h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(housing.type)}`}>
                      {housing.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{housing.address}</span>
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

              {/* Property Meta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">₹{housing.rent.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Monthly Rent</div>
                </div>
                <div className="text-center">
                  <Bed className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">{housing.bedrooms} Bedrooms</div>
                  <div className="text-sm text-gray-600">{housing.bathrooms} Bathrooms</div>
                </div>
                <div className="text-center">
                  <Home className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">₹{housing.deposit.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Security Deposit</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">{housing.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {housing.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg"
                    >
                      <Home className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Owner</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-gray-900">{housing.contactName}</div>
                  <div className="flex items-center text-gray-600 mt-2">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">{housing.contactPhone}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">{housing.contactEmail}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                    Contact Owner
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold mt-2 transition-colors">
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>

            {/* Property Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Summary</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="text-gray-900 capitalize">{housing.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="text-gray-900">{housing.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bathrooms:</span>
                  <span className="text-gray-900">{housing.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Area:</span>
                  <span className="text-gray-900">{housing.area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed on:</span>
                  <span className="text-gray-900">{new Date(housing.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Availability:</span>
                  <span className="text-green-600 font-medium">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HousingDetailPage;