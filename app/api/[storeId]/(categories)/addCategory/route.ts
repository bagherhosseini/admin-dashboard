import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";
import { z } from "zod";

export async function POST(req: NextRequest, { params }: { params: { storeId: string } }) {
  try {
    const { storeId, name, description, billboardId } = await req.json();

    if (!params.storeId && params.storeId !== storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    // Create a new product in the database.
    const newCategory = await prismadb.category.create({
      data: { name, description, storeId, billboardId }
    });

    return new Response(
      JSON.stringify({ newCategory, message: "Success" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    // Handle other errors here if needed.
    return new Response(
      JSON.stringify({ error: "An error occurred", errorMessage: error }),
      {
        status: 500,
      }
    );
  }
}