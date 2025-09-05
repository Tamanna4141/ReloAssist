import React, { useState, useMemo } from 'react';
import { Search, MapPin, DollarSign, Home, Filter } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import HousingCard from '../components/housing/HousingCard';
import HousingFilterPanel from '../components/housing/HousingFilterPanel';

function HousingPage() {
  const { housing } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [rentRange, setRentRange] = useState<[number, number]>([0, 100000]);
  const [housingType, setHousingType] = useState('');
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredHousing = useMemo(() => {
    return housing.filter(house => {
      if (!house.isApproved || !house.isAvailable) return false;
      
      const matchesSearch = house.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           house.area.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = !selectedCity || house.city === selectedCity;
      const matchesRent = house.rent >= rentRange[0] && house.rent <= rentRange[1];
      const matchesType = !housingType || house.type === housingType;
      const matchesBedrooms = house.bedrooms >= minBedrooms;

      return matchesSearch && matchesCity && matchesRent && matchesType && matchesBedrooms;
    });
  }, [housing, searchQuery, selectedCity, rentRange, housingType, minBedrooms]);

  const cities = Array.from(new Set(housing.map(house => house.city)));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Housing</h1>
          <p className="text-gray-600">
            Discover your perfect home. {filteredHousing.length} properties available.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* City Filter */}
            <div className="lg:w-48 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block w-80">
            <HousingFilterPanel
              rentRange={rentRange}
              setRentRange={setRentRange}
              housingType={housingType}
              setHousingType={setHousingType}
              minBedrooms={minBedrooms}
              setMinBedrooms={setMinBedrooms}
            />
          </div>

          {/* Mobile Filter Panel */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
              <div className="bg-white w-80 h-full p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <HousingFilterPanel
                  rentRange={rentRange}
                  setRentRange={setRentRange}
                  housingType={housingType}
                  setHousingType={setHousingType}
                  minBedrooms={minBedrooms}
                  setMinBedrooms={setMinBedrooms}
                />
              </div>
            </div>
          )}

          {/* Housing Grid */}
          <div className="flex-1">
            {filteredHousing.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredHousing.map(house => (
                  <HousingCard key={house.id} housing={house} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Housing Found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HousingPage;