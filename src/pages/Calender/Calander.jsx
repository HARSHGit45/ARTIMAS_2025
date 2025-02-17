import React from 'react';
import c1 from '../../assets/1.png';
import c2 from '../../assets/2.png';

const Calendar = () => {
  return (
    <div className="hero7 flex flex-col min-h-screen w-full items-center justify-center event relative py-28 px-28">
      <h2 className="text-3xl font-bold text-white mb-6">Event Timetable</h2>

      <div className="flex flex-col items-center gap-10">
        {/* Image 1 */}
        <div className="relative w-[30vh] sm:w-[40vh] xl:w-[90vh] md:w-[50vh] lg:w-[60vh] p-2 bg-gradient-to-br from-white/40 to-white/10 rounded-xl shadow-xl">
          
          <img 
            src={c1}
            alt="Event Timetable 1" 
            className="w-auto h-auto object-contain border-4 border-white rounded-lg"
          />
        </div>

        {/* Image 2 */}
        <div className="relative w-[30vh] sm:w-[40vh] xl:w-[90vh] md:w-[50vh] lg:w-[60vh] p-2 bg-gradient-to-br from-white/10 to-white/10 rounded-xl shadow-xl">
          
          <img 
            src={c2}
            alt="Event Timetable 2" 
            className="w-full h-auto object-contain border-4 border-white rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
