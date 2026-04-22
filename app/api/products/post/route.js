import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../../lib/dbConnect";

export async function POST(req) {
  try {

    const { name, price, image, weight } = await req.json(); 
    
    const collection = await dbConnect(collections.PRODUCTS);

    const result = await collection.insertOne({
      name,
      price,
      weight, 
      image,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (error) {
  
    console.error("Database Error:", error); 
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}