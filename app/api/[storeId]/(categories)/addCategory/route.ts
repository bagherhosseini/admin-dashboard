import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";
import { z } from "zod";

export async function POST(req: NextRequest, { params }: { params: { storeId: string } }) {
  try {
    const { storeId, name, description, billboardId } = await req.json();

    if (!params.storeId && params.storeId !== storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Define a schema to validate the request body.
    const CategoryValidation = z.object({
      storeId: z.string().min(3),
      name: z.string().min(3),
      description: z.string(),
      billboardId: z.number().min(1),
    });

    // Validate the request body against the schema.
    const validatedData = CategoryValidation.parse({
      storeId,
      name,
      description,
      billboardId,
    });

    // Create a new product in the database.
    const newCategory = await prismadb.category.create({
      data: validatedData,
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