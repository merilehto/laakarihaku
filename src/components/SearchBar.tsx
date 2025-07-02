import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  resultCount: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, resultCount }) => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-lg"
          placeholder="Etsi lääkäriä tai palvelua..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {resultCount > 0 && (
        <div className="mt-3 text-sm text-gray-600">
          {resultCount} lääkäriä löytyi
        </div>
      )}
    </div>
  );
};

export default SearchBar;