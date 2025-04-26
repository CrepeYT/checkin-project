"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { ArrowLeft, ArrowRight } from "lucide-react";

// -- หน้าที่ 1: MyClassPage
const MyClassPage = ({ onNext, onSelectClass }: { onNext: () => void; onSelectClass: (classData: any) => void }) => {
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    const classesRef = collection(db, "classes");
    const q = query(classesRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const classList: any[] = [];
      querySnapshot.forEach((doc) => {
        classList.push({ id: doc.id, ...doc.data() });
      });
      setClasses(classList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
      <div className="flex gap-10">
        <div className="bg-white border-2 border-purple-300 rounded-lg p-6 shadow-lg w-96">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-purple-700">My Class</h2>
            <button onClick={onNext} className="text-purple-700 hover:text-purple-900">
              <ArrowRight size={28} />
            </button>
          </div>

          {/* Class List */}
          <div className="flex flex-col gap-4">
            {classes.length > 0 ? (
              classes.map((cls) => (
                <div
                  key={cls.id}
                  className="flex justify-between items-center bg-purple-200 hover:bg-purple-300 p-4 rounded-lg cursor-pointer transition-all"
                  onClick={() => onSelectClass(cls)}
                >
                  <span className="text-lg font-semibold text-purple-900">{cls.name}</span>
                  <div className="bg-white text-purple-700 font-bold w-8 h-8 flex items-center justify-center rounded-full">
                    {cls.name.charAt(0)}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">ยังไม่มีคลาสใด ๆ</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// -- หน้าที่ 2: ClassPage
const ClassPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
      <div className="bg-white border-2 border-purple-300 rounded-lg p-6 shadow-lg w-96">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={onBack} className="text-purple-700 hover:text-purple-900">
            <ArrowLeft size={28} />
          </button>
          <h2 className="text-2xl font-bold text-purple-700 text-center flex-grow">Class</h2>
        </div>
      </div>
    </div>
  );
};

// -- หน้าที่ 3: ViewClassDetailPage (เข้ามาดูคลาส)
const ViewClassDetailPage = ({ classData, onBack }: { classData: any; onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-md"> {/* จำกัดขนาด */}
        <button
          onClick={onBack}
          className="mb-6 bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold py-2 px-4 rounded"
        >
          กลับ
        </button>

       


        <div className="border-2 border-purple-700 rounded-2xl p-6">
          <h3 className="text-center text-2xl font-bold text-purple-700 mb-4">{classData.name}</h3>
          <div className="text-center text-purple-700">
            <button className="border border-purple-700 py-2 px-6 rounded-lg mb-4">
              ดูสรุปการเข้าเรียน
            </button>
            <p className="mb-2">ชื่อ-สกุล | รหัส นศ.</p>
            <p>จำนวนสมาชิกที่เช็คชื่อ 0</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// -- Controller หลัก
const ClassSection = () => {
  const [page, setPage] = useState<"myclass" | "class" | "view">("myclass");
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const handleNext = () => {
    setPage("class");
  };

  const handleBack = () => {
    setPage("myclass");
  };

  const handleSelectClass = (classData: any) => {
    setSelectedClass(classData);
    setPage("view");
  };

  return (
    <>
      {page === "myclass" && <MyClassPage onNext={handleNext} onSelectClass={handleSelectClass} />}
      {page === "class" && <ClassPage onBack={handleBack} />}
      {page === "view" && selectedClass && <ViewClassDetailPage classData={selectedClass} onBack={handleBack} />}
    </>
  );
};

export default ClassSection;
