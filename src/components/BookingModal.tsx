import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, ExternalLink } from 'lucide-react';

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

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
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

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, doctor }) => {
  if (!doctor) return null;

  const handleBooking = () => {
    // This would redirect to the actual booking system
    alert(`Demo: Siirryt ${doctor.chain}:n ajanvaraukseen`);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={onClose}
            >
              <span className="sr-only">Sulje</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Varaa aika lääkärille
              </Dialog.Title>

              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center">
                    <h4 className="text-lg font-semibold text-gray-900 mr-2">
                      {doctor.name}
                    </h4>
                    <span className="text-xl">
                      {getChainLogo(doctor.chain)}
                    </span>
                  </div>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500">{doctor.location}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Huomio:</strong> Siirryt {doctor.chain}:n ajanvaraukseen varmistaaksesi ajan saatavuuden ja viimeistelläksesi varauksen.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Demo-versio:</strong> Tämä on demosovellus. Todellinen ajanvaraus tapahtuu palveluntarjoajan sivustolla.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleBooking}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Siirryt {doctor.chain}:n ajanvaraukseen
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Peruuta
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default BookingModal;