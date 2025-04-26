import { v4 as uuidv4 } from 'uuid';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/firebase'; // firebase.ts ที่คุณตั้งค่า
import { NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore'; // ดึง method มาจาก firestore

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Class name is required' },
        { status: 400 }
      );
    }

    const userUUID = uuidv4();

    // ใช้ collection() และ addDoc() ตามแบบ modular
    const classesRef = collection(db, 'classes');

    const newClassRef = await addDoc(classesRef, {
      name: name.trim(),
      user_id: userId,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json(
      { data: { id: newClassRef.id, name: name.trim() } },
      { status: 201 }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
