import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

const Summary = ({ classId, onBack }: { classId: string; onBack: () => void }) => {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const studentsRef = collection(db, "classes", classId, "students"); // ดึงข้อมูลจาก 'students' ของ class นี้
    const q = query(studentsRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const studentsList: any[] = [];
      querySnapshot.forEach((doc) => {
        studentsList.push({ id: doc.id, ...doc.data() });
      });
      setStudents(studentsList);
    });

    return () => unsubscribe();
  }, [classId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-6 bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold py-2 px-4 rounded"
        >
          กลับ
        </button>

        <div className="border-2 border-purple-700 rounded-2xl p-6">
          <h3 className="text-center text-2xl font-bold text-purple-700 mb-4">สรุปการเข้าเรียน</h3>
          <div className="space-y-4">
            {students.length > 0 ? (
              students.map((student) => (
                <div
                  key={student.id}
                  className="flex justify-between items-center bg-purple-100 hover:bg-purple-200 p-4 rounded-lg"
                >
                  <span className="text-lg font-semibold text-purple-900">{student.name}</span>
                  <span className="text-sm text-purple-700">{student.attended ? "เช็คชื่อแล้ว" : "ยังไม่เช็คชื่อ"}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">ไม่มีข้อมูลสมาชิก</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
