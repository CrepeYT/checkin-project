"use client";
import { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import QRCode from "react-qr-code";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function AddClassPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const { user, isSignedIn } = useUser();

  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  

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

      const userId = user.id;
      const userEmail = user.primaryEmailAddress?.emailAddress || "";

      const docRef = await addDoc(collection(db, "classes"), {
        name: className.trim(),
        created_by: userId,
        created_at: Timestamp.fromDate(new Date()),
        members: [userId],
        memberCount: 1,
        owner_email: userEmail,
        last_updated: Timestamp.fromDate(new Date()),
      });

      const newQrCode = `https://your-app-url/class/${docRef.id}`;
      setQrCode(newQrCode);

      setSuccess(true);
      setClassName("");

      setTimeout(() => {
        setShowPopup(false);
        setSuccess(false);
        setQrCode(null);
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
    setQrCode(null);
  };

  // เริ่มต้นกล้องเมื่อ scanning = true
  useEffect(() => {
    if (scanning) {
      if (!scannerRef.current) {
        scannerRef.current = new Html5QrcodeScanner(
          "qr-reader",
          {
            fps: 10,
            qrbox: 250,
          },
          false
        );
      }

      scannerRef.current.render(
        (decodedText) => {
          alert(`สแกนสำเร็จ: ${decodedText}`);
          setScanning(false); // ปิดกล้องเมื่อสแกนสำเร็จ
        },
        (errorMessage) => {
          console.warn("QR Code scan error", errorMessage);
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error) => {
          console.error("Clear html5-qrcode error", error);
        });
      }
    };
  }, [scanning]);

  return (
    <>
      {/* ปุ่ม Add class */}
      <div className="md:-mt-80 md:-mr-105">
        <div className="gap-4 mt-30 flex justify-center md:flex-col">
          <button
            className="border border-purple-600 text-purple-600 px-4 py-1 rounded-full hover:bg-purple-100"
            onClick={() => setScanning(true)}
          >
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
      

      {/* Popup สร้างคลาส */}
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
                onKeyDown={(e) => e.key === "Enter" && handleCreateClass()}
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

              {/* แสดง QR Code */}
              {qrCode && (
                <div className="mt-4">
                  <h3 className="text-purple-700 font-bold text-lg mb-2">QR Code สำหรับเข้าเรียน:</h3>
                  <QRCode value={qrCode} size={256} />
                  <p className="text-center mt-2 text-purple-600">สแกนเพื่อเข้าเรียน</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* หน้าจอสแกน QR Code */}
      {scanning && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
          <button
            className="absolute top-2 right-1 text-purple-500 hover:text-purple-700"
            onClick={() => setScanning(false)}
          >
            <FaTimes size={40} />
          </button>
          <div id="qr-reader" style={{ width: "300px" }} />
          <p className="mt-4 text-purple-600">กรุณาสแกน QR Code</p>
        </div>
      )}
    </>
  );
}
