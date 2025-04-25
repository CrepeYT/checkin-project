"use client"
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';

// หน้าที่ 1
const MyClassPage = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="border-2 border-purple-500 rounded-2xl p-4 h-95 md:w-150 md:h-150 md:ml-160 md:-mt-101 md:flex md:flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex-grow text-center text-2xl font-bold text-purple-800">
          My Class
        </h2>
        <button className="text-2xl text-purple-600" onClick={onNext}>
          <ArrowRight />
        </button>
      </div>
      <div className="text-right">
        <p className="font-semibold text-purple-800">Class 0</p>
      </div>
    </div>
  );
};

// หน้าที่ 2
const ClassPage = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="border-2 border-purple-500 rounded-2xl p-4 h-95 md:w-150 md:h-150 md:ml-160 md:-mt-101 md:flex md:flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex-grow text-center text-2xl font-bold text-purple-800">
          Class
        </h2>
        <button className="text-2xl text-purple-600" onClick={onNext}>
          <ArrowLeft />
        </button>
      </div>
      <div className="text-right">
        <p className="font-semibold text-purple-800">Class 0</p>
      </div>
    </div>
    
  );
   <div className='md:-mt-80 md:-mr-105'>
   <div className="gap-4 mt-30 flex justify-center md:flex-col">
       <button className="border border-purple-600 text-purple-600 px-4 py-1 rounded-full hover:bg-purple-100">
           Scan QR
       </button>
       <button className="border border-purple-600 text-purple-600 px-4 py-1 rounded-full hover:bg-purple-100">
           Add a class
       </button>
   </div>
</div>
};

//เปลี่ยนหน้า
const ClassSection = () => {
  const [page, setPage] = useState(0);

  const handleNext = () => {
    setPage((prevPage) => (prevPage + 1) % 2);
  };

  return page === 0 ? (
    <MyClassPage onNext={handleNext} />
  ) : (
    <ClassPage onNext={handleNext} />
  );
};

export default ClassSection;
