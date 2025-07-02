import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🏥</span>
            <h1 className="text-2xl font-bold text-primary-700">Lääkärihaku</h1>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-gray-600 text-sm">
              Kaikki vapaat lääkäriajat yhdestä paikasta
            </p>
          </div>
        </div>
        <div className="md:hidden mt-2">
          <p className="text-gray-600 text-sm text-center">
            Kaikki vapaat lääkäriajat yhdestä paikasta
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;