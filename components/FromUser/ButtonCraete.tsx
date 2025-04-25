"use client";
import Image from "next/image";
import { useState } from "react";
import { House, X } from 'lucide-react';

export default function AddClassPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [className, setClassName] = useState("");

  return (
    <>
      {/* ปุ่มกด    กดScan QRยังไม่ทำ */}
      <div className="md:-mt-80 md:-mr-105">
        <div className="gap-4 mt-30 flex justify-center md:flex-col">
          <button className="border border-purple-600 text-purple-600 px-4 py-1 rounded-full hover:bg-purple-100">
            Scan QR
          </button>
          <button
            className="border border-purple-600 text-purple-600 px-4 py-1 rounded-full hover:bg-purple-100"
            onClick={() => setShowPopup(true)}
          >
            Add a class
          </button>
        </div>
      </div>

      {/* ส่วนคือPOPUP หน้าสร้างคลาส */}
      {showPopup && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg flex p-6 relative max-w-3xl w-full">
            {/* ปุ่มกากกบาต */}
            <button
              className="absolute top-2 right-1 text-purple-500 text-3xl hover:text-purple-700 "
              onClick={() => setShowPopup(false)}
            >
             <X size={40}/>
            </button>
            <div className="w-1/2 flex items-center justify-center relative">
              <Image
                src="/assets/images/person.png" // pathรูปตูนหน้าสร้างคลาส 
                width={200} 
                height={200} alt={"Person"} />
            </div>


            {/* อันนี้กรอกข้อชื่อต้องสร้างคลาสส */}
            <div className="w-1/2 bg-white rounded-xl border border-purple-300 p-6">
              <h2 className="text-purple-700 font-bold text-lg mb-4 flex items-center gap-2">
                <span><House /></span> ชื่อคลาส
              </h2>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="ชื่อคลาส"
                className="w-full border border-purple-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <button className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 rounded-lg w-full font-semibold">
                สร้าง
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
