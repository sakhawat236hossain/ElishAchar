import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../../lib/dbConnect";


export async function GET() {
  try {
    const collection = await dbConnect(collections.PRODUCTS);
    
    const products = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}