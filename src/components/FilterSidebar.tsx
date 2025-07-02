import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    chains: string[];
    availability: string[];
    specialties: string[];
    languages: string[];
  };
  selectedFilters: {
    chains: string[];
    availability: string[];
    specialties: string[];
    languages: string[];
  };
  onFilterChange: (category: string, value: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  filters, 
  selectedFilters, 
  onFilterChange 
}) => {
  const filterSections = [
    {
      title: 'Palveluntarjoaja',
      key: 'chains',
      options: filters.chains
    },
    {
      title: 'Saatavuus',
      key: 'availability',
      options: filters.availability
    },
    {
      title: 'Erikoisala',
      key: 'specialties',
      options: filters.specialties
    },
    {
      title: 'Kielet',
      key: 'languages',
      options: filters.languages
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Suodata tuloksia</h2>
      
      <div className="space-y-4">
        {filterSections.map((section) => (
          <Disclosure key={section.key} defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
                  <span>{section.title}</span>
                  <ChevronDownIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-gray-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <div className="space-y-3">
                    {section.options.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                          checked={selectedFilters[section.key as keyof typeof selectedFilters].includes(option)}
                          onChange={() => onFilterChange(section.key, option)}
                        />
                        <span className="ml-2 text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;