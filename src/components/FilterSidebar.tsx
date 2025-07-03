import React from 'react';
import { MapPin, Filter } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    chains: string[];
    availability: string[];
    specialties: string[];
    locations: string[];
  };
  selectedFilters: {
    chains: string[];
    availability: string[];
    specialties: string[];
    locations: string[];
  };
  onFilterChange: (category: string, value: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  filters, 
  selectedFilters, 
  onFilterChange 
}) => {
  const locations = ['Helsinki', 'Espoo', 'Vantaa', 'Koko pääkaupunkiseutu'];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-8">
      <div className="flex items-center gap-3 mb-8">
        <Filter className="h-6 w-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">Rajaa hakua</h2>
      </div>
      
      {/* Location Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-bold text-gray-800">Sijainti</h3>
        </div>
        <div className="space-y-3">
          {locations.map((location) => (
            <label key={location} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded-lg border-2 border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                checked={selectedFilters.locations?.includes(location) || false}
                onChange={() => onFilterChange('locations', location)}
              />
              <span className="ml-3 text-gray-700 font-medium group-hover:text-purple-700 transition-colors duration-200">
                {location}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Provider Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🏥</span>
          <h3 className="text-lg font-bold text-gray-800">Palveluntarjoaja</h3>
        </div>
        <div className="space-y-3">
          {filters.chains.map((chain) => (
            <label key={chain} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded-lg border-2 border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                checked={selectedFilters.chains.includes(chain)}
                onChange={() => onFilterChange('chains', chain)}
              />
              <span className="ml-3 flex items-center gap-2">
                <span className="text-lg">
                  {chain === 'Mehiläinen' && '🟦'}
                  {chain === 'Terveystalo' && '🟩'}
                  {chain === 'Pihlajalinna' && '🟪'}
                  {chain === 'Aava' && '🟨'}
                </span>
                <span className="text-gray-700 font-medium group-hover:text-purple-700 transition-colors duration-200">
                  {chain}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">⏰</span>
          <h3 className="text-lg font-bold text-gray-800">Saatavuus</h3>
        </div>
        <div className="space-y-3">
          {filters.availability.map((availability) => (
            <label key={availability} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded-lg border-2 border-gray-300 text-green-600 focus:ring-green-500 focus:ring-2 transition-all duration-200"
                checked={selectedFilters.availability.includes(availability)}
                onChange={() => onFilterChange('availability', availability)}
              />
              <span className="ml-3 text-gray-700 font-medium group-hover:text-green-700 transition-colors duration-200">
                {availability}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Specialty Filter */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🩺</span>
          <h3 className="text-lg font-bold text-gray-800">Erikoisala</h3>
        </div>
        <div className="space-y-3">
          {filters.specialties.map((specialty) => (
            <label key={specialty} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all duration-200"
                checked={selectedFilters.specialties.includes(specialty)}
                onChange={() => onFilterChange('specialties', specialty)}
              />
              <span className="ml-3 text-gray-700 font-medium group-hover:text-blue-700 transition-colors duration-200">
                {specialty}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;