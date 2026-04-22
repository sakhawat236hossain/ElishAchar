import clientPromise from '@/lib/mongodb'; 
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const orderData = await req.json();
    const client = await clientPromise;
    const db = client.db('ElishAchar'); 

    // save oder data to database
    const result = await db.collection('orders').insertOne({
      ...orderData,
      createdAt: new Date(), 
    });

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ success: false, error: 'অর্ডার সেভ করতে সমস্যা হয়েছে' }, { status: 500 });
  }
}