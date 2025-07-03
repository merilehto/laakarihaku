import React from 'react';
import { MapPin, Clock, Star } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  chain: string;
  location: string;
  availability: string;
  languages: string[];
  image: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBookClick: (doctor: Doctor) => void;
}

const getChainLogo = (chain: string) => {
  const logos = {
    'Mehiläinen': '🟦',
    'Terveystalo': '🟩', 
    'Pihlajalinna': '🟪',
    'Aava': '🟨'
  };
  return logos[chain as keyof typeof logos] || '🏥';
};

const getAvailabilityStyles = (availability: string) => {
  const styles = {
    'Tänään vapaana': 'bg-green-100 text-green-800 border-green-200',
    'Huomenna': 'bg-blue-100 text-blue-800 border-blue-200',
    'Tällä viikolla': 'bg-orange-100 text-orange-800 border-orange-200'
  };
  
  return styles[availability as keyof typeof styles] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookClick }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="p-8">
        <div className="flex items-start gap-6">
          {/* Doctor Image */}
          <div className="relative flex-shrink-0">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-24 h-24 rounded-2xl object-cover shadow-lg"
            />
            <div className="absolute -top-2 -right-2 text-2xl bg-white rounded-full p-1 shadow-md">
              {getChainLogo(doctor.chain)}
            </div>
          </div>
          
          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-200">
                {doctor.name}
              </h3>
              <p className="text-xl font-semibold text-purple-600 mb-2">{doctor.specialty}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-600 ml-2">4.9 (127 arvostelua)</span>
              </div>
            </div>
            
            {/* Location & Availability */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                <span className="font-medium">{doctor.location}</span>
              </div>
              <span className={`px-4 py-2 text-sm font-bold rounded-full border-2 ${getAvailabilityStyles(doctor.availability)}`}>
                <Clock className="h-4 w-4 inline mr-2" />
                {doctor.availability}
              </span>
            </div>
            
            {/* Provider & Languages */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">{doctor.chain}</span>
                <span className="mx-2">•</span>
                <span>Kielet: {doctor.languages.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Book Button */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={() => onBookClick(doctor)}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500/30"
          >
            Varaa aika • {doctor.chain}
          </button>
          <p className="text-xs text-gray-500 text-center mt-3">
            Siirryt {doctor.chain}:n ajanvaraukseen
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;