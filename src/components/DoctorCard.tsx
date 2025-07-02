import React from 'react';
import { MapPin, Clock } from 'lucide-react';

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

const getAvailabilityBadge = (availability: string) => {
  const badgeClasses = {
    'Tänään vapaana': 'bg-success-100 text-success-800 border-success-200',
    'Huomenna': 'bg-blue-100 text-blue-800 border-blue-200',
    'Tällä viikolla': 'bg-gray-100 text-gray-800 border-gray-200'
  };
  
  return badgeClasses[availability as keyof typeof badgeClasses] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {doctor.name}
            </h3>
            <span className="text-xl ml-2 flex-shrink-0">
              {getChainLogo(doctor.chain)}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-2">{doctor.specialty}</p>
          
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="mr-4">{doctor.location}</span>
            <span className={`px-2 py-1 text-xs rounded-full border ${getAvailabilityBadge(doctor.availability)}`}>
              <Clock className="h-3 w-3 inline mr-1" />
              {doctor.availability}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Kielet: {doctor.languages.join(', ')}
            </div>
            <button
              onClick={() => onBookClick(doctor)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Varaa aika
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;