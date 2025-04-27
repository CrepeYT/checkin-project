"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { ArrowLeft, ArrowRight } from "lucide-react";
import QRCode from "react-qr-code";

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
  const [students, setStudents] = useState<any[]>([]);
  const [qrCode, setQrCode] = useState<string | null>(null);

  // ดึงข้อมูลสมาชิกของคลาสนี้
  useEffect(() => {
    const studentsRef = collection(db, "classes", classData.id, "students");
    const q = query(studentsRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const studentsList: any[] = [];
      querySnapshot.forEach((doc) => {
        studentsList.push({ id: doc.id, ...doc.data() });
      });
      setStudents(studentsList);
    });

    return () => unsubscribe();
  }, [classData.id]);

  const handleUploadCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      console.log("CSV content:", text);
      // คุณสามารถ parse CSV แล้วส่งข้อมูลไป firebase ได้ที่นี่
    };
    reader.readAsText(file);
  };

  const handleCreateQR = () => {
    const generatedLink = `https://your-app-url/class/${classData.id}`;
    setQrCode(generatedLink);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-md"> {/* จำกัดขนาด */}
        <button
          onClick={onBack}
          className="mb-6 bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold py-2 px-4 rounded"
        >
          กลับ
        </button>

        {/* Card */}
        <div className="border-2 border-purple-700 rounded-2xl p-6">
          <h3 className="text-center text-2xl font-bold text-purple-700 mb-4">{classData.name}</h3>
          
          {/* ดูสรุปการเข้าเรียน */}
          <div className="text-center text-purple-700">
            <button className="border border-purple-700 py-2 px-6 rounded-lg mb-4">
              ดูสรุปการเข้าเรียน
            </button>
            <p className="mb-2">ชื่อ-สกุล | รหัส นศ.</p>
            <p>จำนวนสมาชิกที่เช็คชื่อ {students.length}</p>
          </div>

          {/* รายชื่อสมาชิก */}
          <div className="space-y-4 mt-6">
            {students.length > 0 ? (
              students.map((student) => (
                <div
                  key={student.id}
                  className="flex justify-between items-center bg-purple-100 hover:bg-purple-200 p-4 rounded-lg"
                >
                  <span className="text-lg font-semibold text-purple-900">{student.name}</span>
                  <span className="text-sm text-purple-700">
                    {student.attended ? "เช็คชื่อแล้ว" : "ยังไม่เช็คชื่อ"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">ไม่มีข้อมูลสมาชิก</p>
            )}
          </div>
          <div className="mt-6 flex flex-col gap-4 items-center">
            <button
              className="border border-purple-600 text-purple-600 px-6 py-2 rounded-full hover:bg-purple-100"
              onClick={handleCreateQR}
            >
              Create QR Code
            </button>

            {/* แสดง QR Code ถ้ามี */}
            {qrCode && (
              <div className="mt-4">
                <QRCode value={qrCode} size={180} />
              </div>
            )}
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
