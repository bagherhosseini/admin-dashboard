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
      data: {storeId, name, description, billboardId}
    });

    return new Response(
      JSON.stringify({ newCategory, message: "Success" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      // If it's a ZodError (validation error), extract the messages and return them in the response.
      const validationMessages = error.errors.map(
        (validationError) => validationError.message
      );
      return new Response(
        JSON.stringify({ errors: validationMessages[0] }),
        {
          status: 400,
        }
      );
    } else {
      // Handle other errors here if needed.
      return new Response(
        JSON.stringify({ error: "An error occurred", errorMessage: error }),
        {
          status: 500,
        }
      );
    }
  }
}