import React from 'react'

import c1 from '../../assets/calender1.png';
import c2 from '../../assets/calender2.png';

const Calendar = () => {
  return (
    <div className="hero7 flex min-h-screen items-center justify-center event relative">
      {/* Scrollable Container */}
      <div className=" mt-20 w-[120vh] overflow-x-auto whitespace-nowrap snap-x snap-mandatory flex items-center justify-start space-x-5 custom-scroll">
        
        {/* Image 1 */}
        <img 
          src={c1}
          alt="Event Timetable 1" 
          className="w-[120vh] h-auto object-contain opacity-70 snap-center"
        />
        
        {/* Image 2 */}
        <img 
          src={c2}
          alt="Event Timetable 2" 
          className="w-[120vh] h-auto object-contain opacity-70 snap-center"
        />

      </div>
    </div>
  )
}

export default Calendar
