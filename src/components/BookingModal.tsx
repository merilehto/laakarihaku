import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, ExternalLink, Star, MapPin, Calendar } from 'lucide-react';

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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={onClose} />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-3xl px-8 pt-8 pb-8 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="absolute top-0 right-0 pt-6 pr-6">
            <button
              type="button"
              className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
              onClick={onClose}
            >
              <span className="sr-only">Sulje</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <Dialog.Title as="h3" className="text-3xl leading-6 font-bold text-gray-900 mb-8">
                Vahvista ajanvaraus
              </Dialog.Title>

              {/* Doctor Info Card */}
              <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 text-xl bg-white rounded-full p-1 shadow-md">
                      {getChainLogo(doctor.chain)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {doctor.name}
                    </h4>
                    <p className="text-lg font-semibold text-purple-600 mb-2">{doctor.specialty}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-600 ml-2">4.9</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-orange-500" />
                        {doctor.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-green-500" />
                        {doctor.availability}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Process Info */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
                <h5 className="font-bold text-blue-900 mb-3 text-lg">📋 Ajanvarauksen vaiheet</h5>
                <div className="space-y-3 text-blue-800">
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <span>Siirryt {doctor.chain}:n turvalliseen ajanvaraukseen</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <span>Valitse sopiva aika saatavilla olevista vaihtoehtoista</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <span>Vahvista henkilötietosi ja ajanvaraus</span>
                  </div>
                </div>
              </div>

              {/* Demo Notice */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
                <h5 className="font-bold text-yellow-900 mb-2 text-lg">⚠️ Demo-versio</h5>
                <p className="text-yellow-800">
                  Tämä on demonstraatio. Todellisessa palvelussa siirtyisit nyt {doctor.chain}:n 
                  viralliseen ajanvaraukseen suorittamaan varauksen.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row-reverse gap-4">
            <button
              type="button"
              className="flex-1 inline-flex justify-center items-center rounded-2xl border border-transparent shadow-lg px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-lg font-bold text-white hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-500/30 transition-all duration-200 transform hover:scale-105"
              onClick={handleBooking}
            >
              <ExternalLink className="h-5 w-5 mr-3" />
              Siirry {doctor.chain}:n ajanvaraukseen
            </button>
            <button
              type="button"
              className="flex-1 inline-flex justify-center rounded-2xl border-2 border-gray-300 shadow-sm px-6 py-4 bg-white text-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-200"
              onClick={onClose}
            >
              Takaisin hakuun
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default BookingModal;