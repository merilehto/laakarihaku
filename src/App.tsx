import { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DoctorCard from './components/DoctorCard';
import FilterSidebar from './components/FilterSidebar';
import BookingModal from './components/BookingModal';
import doctorsData from './data/doctors.json';

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

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    chains: [] as string[],
    availability: [] as string[],
    specialties: [] as string[],
    locations: [] as string[]
  });

  const doctors: Doctor[] = doctorsData;

  // Location mapping for Helsinki suburbs and surrounding areas
  const getLocationMapping = () => {
    return {
      'Helsinki': ['töölö', 'kallio', 'kamppi', 'punavuori', 'vuosaari', 'malmi', 'herttoniemi', 'munkkiniemi', 'lauttasaari', 'sörnäinen', 'oulunkylä', 'mellunmäki', 'kontula', 'arabianranta', 'jakomäki', 'ruoholahti', 'kluuvi', 'pasila', 'itäkeskus'],
      'Espoo': ['tapiola', 'leppävaara', 'espoo'],
      'Vantaa': ['myyrmäki', 'vantaa'],
      'Koko pääkaupunkiseutu': [] // Special case - matches everything
    };
  };

  // Extract unique filter options + add location filter
  const filterOptions = useMemo(() => ({
    chains: [...new Set(doctors.map(d => d.chain))],
    availability: [...new Set(doctors.map(d => d.availability))],
    specialties: [...new Set(doctors.map(d => d.specialty))],
    locations: ['Helsinki', 'Espoo', 'Vantaa', 'Koko pääkaupunkiseutu']
  }), [doctors]);

  // Filter doctors based on search term and selected filters
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      // Search filter
      const matchesSearch = !searchTerm || 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Chain filter
      const matchesChain = selectedFilters.chains.length === 0 || 
        selectedFilters.chains.includes(doctor.chain);

      // Availability filter
      const matchesAvailability = selectedFilters.availability.length === 0 || 
        selectedFilters.availability.includes(doctor.availability);

      // Specialty filter
      const matchesSpecialty = selectedFilters.specialties.length === 0 || 
        selectedFilters.specialties.includes(doctor.specialty);

      // Location filter with suburb mapping
      const matchesLocation = selectedFilters.locations.length === 0 || 
        selectedFilters.locations.some(selectedLocation => {
          if (selectedLocation === 'Koko pääkaupunkiseutu') return true;
          
          const locationMapping = getLocationMapping();
          const suburbs = locationMapping[selectedLocation as keyof typeof locationMapping];
          
          if (!suburbs) return false;
          
          // Check if doctor's location matches the main city or any of its suburbs
          const doctorLocation = doctor.location.toLowerCase();
          
          // Direct city match
          if (doctorLocation.includes(selectedLocation.toLowerCase())) return true;
          
          // Suburb match
          return suburbs.some(suburb => doctorLocation.includes(suburb));
        });

      return matchesSearch && matchesChain && matchesAvailability && matchesSpecialty && matchesLocation;
    });
  }, [doctors, searchTerm, selectedFilters]);

  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters(prev => {
      const categoryFilters = prev[category as keyof typeof prev] as string[];
      const isSelected = categoryFilters.includes(value);
      
      if (isSelected) {
        return {
          ...prev,
          [category]: categoryFilters.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...categoryFilters, value]
        };
      }
    });
  };

  const handleSpecialtySelect = (specialty: string) => {
    setSearchTerm(specialty);
  };

  const handleLocationSelect = (location: string) => {
    handleFilterChange('locations', location);
  };

  const handleTimeSelect = (time: string) => {
    const timeMapping: {[key: string]: string} = {
      'Tänään': 'Tänään vapaana',
      'Huomenna': 'Huomenna',
      'Tällä viikolla': 'Tällä viikolla',
      'Ensi viikolla': 'Tällä viikolla'
    };
    const mappedTime = timeMapping[time] || time;
    handleFilterChange('availability', mappedTime);
  };

  const handleBookClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          resultCount={filteredDoctors.length}
          onSpecialtySelect={handleSpecialtySelect}
          onLocationSelect={handleLocationSelect}
          onTimeSelect={handleTimeSelect}
        />
        
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <FilterSidebar
              filters={filterOptions}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Results */}
          <div className="lg:col-span-3">
            {!searchTerm && filteredDoctors.length === doctors.length ? (
              <div className="text-center py-24">
                <div className="text-8xl mb-8">🔍</div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  yli 800 lääkäriä saatavilla
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Käytä hakua tai suodattimia löytääksesi sopivan lääkärin. 
                  Kaikki suurimmat terveysyhtiöt yhdessä paikassa.
                </p>
                <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-2xl p-8 max-w-lg mx-auto">
                  <p className="text-lg font-semibold text-gray-700">
                    Aloita hakemalla erikoisalaa, sijaintia tai lääkärin nimeä ⬆️
                  </p>
                </div>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-8xl mb-8">😔</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Ei tuloksia hakuehdoillasi
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Kokeile muuttaa hakuehtoja tai suodattimia
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedFilters({
                      chains: [],
                      availability: [],
                      specialties: [],
                      locations: []
                    });
                  }}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg"
                >
                  Tyhjennä kaikki suodattimet
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredDoctors.map(doctor => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookClick={handleBookClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        doctor={selectedDoctor}
      />
    </div>
  );
}

export default App;