import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'sessions'));
    const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ error: 'Kunne ikke hente sessions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const docRef = await addDoc(collection(db, 'sessions'), data);
    return NextResponse.json({ id: docRef.id, ...data });
  } catch (error) {
    return NextResponse.json({ error: 'Kunne ikke opprette session' }, { status: 500 });
  }
}