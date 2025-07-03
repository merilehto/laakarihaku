import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/10 rounded-full -translate-y-48 translate-x-48"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-24 text-center">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">Lääkärihaku</span>
            </h1>
            <p className="text-2xl lg:text-4xl font-bold text-purple-100 mb-4">
              Suomen paras lääkäriaikahaku
            </p>
            <p className="text-lg lg:text-xl text-purple-200 max-w-4xl mx-auto leading-relaxed">
              Löydä ja varaa lääkäriaika sekunneissa. Kaikki lääkärit yhdestä paikasta.
            </p>
          </div>
          
          {/* Trust Stats */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center items-center gap-8 text-lg font-semibold">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-white">yli 800 lääkäriä</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white">4.9★ arvosana</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-white">24/7 saatavilla</span>
              </div>
            </div>
          </div>

          {/* Provider Logos */}
          <div className="max-w-5xl mx-auto">
            <p className="text-sm text-purple-300 mb-6 font-medium uppercase tracking-wider">
              Yhteistyössä suurimpien terveysyhtiöiden kanssa
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 text-2xl">
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                <span>🟦</span>
                <span className="font-bold text-white">Mehiläinen</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                <span>🟩</span>
                <span className="font-bold text-white">Terveystalo</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                <span>🟪</span>
                <span className="font-bold text-white">Pihlajalinna</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                <span>🟨</span>
                <span className="font-bold text-white">Aava</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-16 text-gray-50">
          <path fill="currentColor" fillOpacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,133.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;