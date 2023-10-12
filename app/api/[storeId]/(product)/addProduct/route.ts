import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";
import { z } from "zod";

export async function POST(req: NextRequest, { params }: { params: { storeId: string } }) {
  try {
    const data = await req.json();
    const {
      storeId,
      title,
      price,
      description,
      img,
      categoryId,
      archived,
      featured,
      sizeId,
    } = data as {
      storeId: string
      title: string;
      price: number;
      description: string;
      img: string;
      categoryId: number;
      archived: boolean;
      featured: boolean;
      sizeId: number;
    };

    if (!params.storeId && params.storeId !== storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Create a new product in the database
    const newProduct = await prismadb.product.create({
      data: {
        storeId,
        title,
        price,
        description,
        img,
        categoryId,
        archived,
        featured,
        sizeId,
      },
    });

    return new Response(JSON.stringify({ newProduct, message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    console.error("server: ", error);

    return new Response(JSON.stringify({ error: "An error occurred", errorMessage: error }), {
      status: 500,
    });
  }
}
