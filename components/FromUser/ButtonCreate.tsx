"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export default function AddClassPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { user, isSignedIn } = useUser(); // ใช้ useUser จาก Clerk

  const handleCreateClass = async () => {
    if (!className.trim()) {
      setError("กรุณากรอกชื่อคลาสก่อน");
      return;
    }

    if (!isSignedIn || !user) {
      setError("คุณยังไม่ได้ล็อกอิน");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userId = user.id; // ใช้ id จาก Clerk
      const userEmail = user.primaryEmailAddress?.emailAddress || "";

      await addDoc(collection(db, "classes"), {
        name: className.trim(),
        created_by: userId,
        created_at: Timestamp.fromDate(new Date()),
        members: [userId],
        memberCount: 1,
        owner_email: userEmail,
        last_updated: Timestamp.fromDate(new Date()),
      });

      setSuccess(true);
      setClassName("");

      setTimeout(() => {
        setShowPopup(false);
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error details:", error);
      setError(`เกิดข้อผิดพลาด: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setClassName("");
    setError(null);
    setSuccess(false);
  };

  return (
    <>
      {/* ปุ่ม Add class */}
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

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg flex p-6 relative max-w-3xl w-full">
            <button
              className="absolute top-2 right-1 text-purple-500 hover:text-purple-700"
              onClick={closePopup}
            >
              <FaTimes size={40} />
            </button>

            <div className="hidden md:block w-1/2 flex items-center justify-center relative">
              <Image
                src="/assets/images/person.png"
                width={200}
                height={200}
                alt="Person"
                className="object-contain"
              />
            </div>

            <div className="w-full md:w-1/2 bg-white rounded-xl border border-purple-300 p-6">
              <h2 className="text-purple-700 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-purple-600">🏠</span> สร้างคลาสใหม่
              </h2>

              <input
                type="text"
                value={className}
                onChange={(e) => {
                  setClassName(e.target.value);
                  setError(null);
                }}
                placeholder="กรอกชื่อคลาส"
                className="w-full border border-purple-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateClass()}
              />

              {error && (
                <div className="text-red-500 mb-4 text-sm">{error}</div>
              )}

              {success && (
                <div className="text-green-500 mb-4 text-sm">
                  สร้างคลาสสำเร็จ! กำลังปิดหน้าต่าง...
                </div>
              )}

              <button
                onClick={handleCreateClass}
                disabled={loading}
                className={`bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full font-semibold transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังสร้าง...
                  </span>
                ) : "สร้างคลาส"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
