import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";
import { z } from "zod";

export async function POST(req: NextRequest, { params }: { params: { storeId: string } }) {
  try {
    const data = await req.json();
    const {
      storeId,
      name,
      description,
    } = data as {
      storeId: string;
      name: string;
      description: string;
    };

    if (!params.storeId && params.storeId !== storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Create a new size in the database
    const newSize = await prismadb.size.create({
      data: {
        storeId,
        name,
        description,
      },
    });

    return new Response(JSON.stringify({ newSize, message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    console.error("server: ", error);

    return new Response(JSON.stringify({ error: "An error occurred", errorMessage: error }), {
      status: 500,
    });
  }
}