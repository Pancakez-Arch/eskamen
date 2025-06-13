import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { increment } = await request.json();
    const ref = doc(db, 'sessions', params.id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      return NextResponse.json({ error: 'Session ikke funnet' }, { status: 404 });
    }
    const current = snap.data().currentParticipants || 0;
    await updateDoc(ref, { currentParticipants: current + (increment || 1) });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Kunne ikke oppdatere session' }, { status: 500 });
  }
}

export async function DELETE(
  _context: unknown,
  { params }: { params: { id: string } }
) {
  try {
    await deleteDoc(doc(db, 'sessions', params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Kunne ikke slette session' }, { status: 500 });
  }
}
