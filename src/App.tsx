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
    languages: [] as string[]
  });

  const doctors: Doctor[] = doctorsData;

  // Extract unique filter options
  const filterOptions = useMemo(() => ({
    chains: [...new Set(doctors.map(d => d.chain))],
    availability: [...new Set(doctors.map(d => d.availability))],
    specialties: [...new Set(doctors.map(d => d.specialty))],
    languages: [...new Set(doctors.flatMap(d => d.languages))]
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

      // Language filter
      const matchesLanguage = selectedFilters.languages.length === 0 || 
        selectedFilters.languages.some(lang => doctor.languages.includes(lang));

      return matchesSearch && matchesChain && matchesAvailability && matchesSpecialty && matchesLanguage;
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          resultCount={filteredDoctors.length}
        />
        
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
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
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Ei tuloksia hakuehdoillasi
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Kokeile muuttaa hakuehtoja tai suodattimia
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
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