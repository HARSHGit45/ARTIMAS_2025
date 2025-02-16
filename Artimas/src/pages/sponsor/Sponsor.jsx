import React from 'react';
import wnj from '../../assets/wetnjoy.jpg';

const Sponsor = () => {
  return (
    <div className="hero6 flex min-h-screen items-center justify-center event relative">
      {/* Black Transparent Box (Increased Size) */}
      <div className="absolute mt-24 bg-black/50 w-4/5 md:w-2/3 max-w-3xl py-10 px-8 rounded-lg flex flex-col items-center justify-center text-white">
        
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6">Our Sponsors</h2>

        {/* Sponsor Logos (Grid with 3 Columns) */}
        <div className="grid grid-cols-3 gap-6">
          <img src={wnj} alt="Sponsor 1" className="w-60 h-auto object-contain transition-transform duration-300 hover:scale-105 hover:shadow-lg" />
          <img src={wnj} alt="Sponsor 2" className="w-60 h-auto object-contain transition-transform duration-300 hover:scale-105 hover:shadow-lg" />
          <img src={wnj} alt="Sponsor 3" className="w-60 h-auto object-contain transition-transform duration-300 hover:scale-105 hover:shadow-lg" />
          <img src={wnj} alt="Sponsor 4" className="w-60 h-auto object-contain transition-transform duration-300 hover:scale-105 hover:shadow-lg" />
          <img src={wnj} alt="Sponsor 5" className="w-60 h-auto object-contain transition-transform duration-300 hover:scale-105 hover:shadow-lg" />
          <img src={wnj} alt="Sponsor 6" className="w-60 h-auto object-contain transition-transform duration-300 hover:scale-105 hover:shadow-lg" />
          <img src={wnj} alt="Sponsor 7" className="w-60 h-auto object-contain transition-transform duration-300 hover:scale-105 hover:shadow-lg" />
          <img src={wnj} alt="Sponsor 8" className="w-60 h-auto object-contain transition-transform duration-300 hover:scale-105 hover:shadow-lg" />
          <img src={wnj} alt="Sponsor 9" className="w-60 h-auto object-contain transition-transform duration-300 hover:scale-105 hover:shadow-lg" />
        </div>

        {/* Thank You Message */}
        <p className="mt-6 text-lg text-center font-medium">
          We are grateful for our amazing sponsors!
        </p>

      </div>
    </div>
  );
};

export default Sponsor;
