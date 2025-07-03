import React from 'react';
import { Search, MapPin, Clock, Stethoscope } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  resultCount: number;
  onSpecialtySelect: (specialty: string) => void;
  onLocationSelect: (location: string) => void;
  onTimeSelect: (time: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  resultCount,
  onSpecialtySelect,
  onLocationSelect, 
  onTimeSelect 
}) => {
  const specialties = ['Ortopedi', 'Gastroenterologi', 'Geriatria', 'Yleislääkäri'];
  const locations = ['Helsinki', 'Espoo', 'Vantaa', 'Koko pääkaupunkiseutu'];
  const timeSlots = ['Tänään', 'Huomenna', 'Tällä viikolla', 'Ensi viikolla'];

  return (
    <div className="bg-white shadow-2xl rounded-3xl p-8 mb-12 border border-gray-100">
      {/* Main Search */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-purple-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-16 pr-6 py-6 border-2 border-purple-100 rounded-2xl text-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
            placeholder="Etsi lääkäriä, vaivaa tai palvelua..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Smart Search Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Specialty */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Stethoscope className="h-5 w-5 text-purple-600" />
            <label className="text-lg font-bold text-gray-800">Mikä vaivaa?</label>
          </div>
          <div className="space-y-2">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => onSpecialtySelect(specialty)}
                className="w-full text-left px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 font-medium text-gray-700 hover:text-purple-700"
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-orange-500" />
            <label className="text-lg font-bold text-gray-800">Missä?</label>
          </div>
          <div className="space-y-2">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => onLocationSelect(location)}
                className="w-full text-left px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 font-medium text-gray-700 hover:text-orange-700"
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-green-500" />
            <label className="text-lg font-bold text-gray-800">Milloin?</label>
          </div>
          <div className="space-y-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => onTimeSelect(time)}
                className="w-full text-left px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 font-medium text-gray-700 hover:text-green-700"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      {searchTerm && (
        <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-2xl p-6 text-center">
          <p className="text-2xl font-bold text-gray-800">
            <span className="text-purple-600">{resultCount}</span> lääkäriä löytyi hakuehdoillasi
          </p>
          <p className="text-gray-600 mt-2">Valitse sopiva aika alla olevista vaihtoehdoista</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;