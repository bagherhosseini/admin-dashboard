import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { title, price, description, img } = await req.json();
    // Create a new product in the database
    const newProduct = await prismadb.product.create({
      data: {
        title,
        price,
        description,
        img,
      },
    });
    return new Response(JSON.stringify(newProduct), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
}
