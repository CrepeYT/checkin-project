import { ArrowRight } from 'lucide-react';
import React from 'react';

const ClassSection = () => {
  return (
    <div className="border-2 border-purple-500 rounded-2xl p-4 h-95 md:w-150 md:h-150 md:ml-160 md:-mt-101 md:flex md:flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex-grow text-center text-2xl font-bold text-purple-800">
          My Class
        </h2>
        <button className="text-2xl text-purple-600">
          <ArrowRight />
        </button>
      </div>
      <div className="text-right">
        <p className="font-semibold text-purple-800">Class 0</p>
      </div>

    </div>
  );
};

export default ClassSection;
