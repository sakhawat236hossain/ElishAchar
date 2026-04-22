import { NextResponse } from "next/server";
import { collections, dbConnect } from "../../../../lib/dbConnect";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const productCollection = await dbConnect(collections.PRODUCTS);

    const result = await productCollection.insertOne(body);

    return NextResponse.json(
      { message: "Product added", id: result.insertedId },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 },
    );
  }
};
