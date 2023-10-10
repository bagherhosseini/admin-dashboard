import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import { z } from "zod";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {
      name,
      description,
      storeId,
    }  = await req.json();
    // Define a schema to validate the request body against
    const SizeValidation = z.object({
        name: z.string().min(1),
        description: z.string().min(3),
        storeId: z.string().min(3),
      
    });

    // Validate the request body against the schema above
    SizeValidation.parse({
      name,
      description,
      storeId,
    });

    // extract the inferred type
    type SizeValidation = z.infer<typeof SizeValidation>;

    // Create a new sizes in the database
    const newSize = await prismadb.size.create({
      data: {
        name,
        description,
        storeId,
      },
    });

    return new Response(JSON.stringify({ newSize, message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      // If it's a ZodError (validation error), extract the messages and return them in the response
      const validationMessages = error.errors.map(
        (validationError) => validationError.message
      );
      return new Response(JSON.stringify({ errors: validationMessages[0] }), {
        status: 400,
      });
    } else {
      // Handle other errors here if needed
      return new Response(JSON.stringify({ error: "An error occurred", errorMessage: error }), {
        status: 500,
      });
    }
  }
}
