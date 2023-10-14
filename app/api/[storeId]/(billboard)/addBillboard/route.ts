import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";
import { z } from "zod";
import Cors from "micro-cors";

Cors({
  origin:
    `https://admin-dashboard-kappa-one.vercel.app/api/6dbd33e5-0045-4c2f-8d0d-22383b27c5e9/getProduct`,
  credentials: true,
});

export async function POST(req: NextRequest, { params }: { params: { storeId: string } }) {

  Cors({
    origin:
      `https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/getProduct`,
    credentials: true,
  });

  try {
    const { title, img, storeId } = await req.json();

    if (!params.storeId && params.storeId !== storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    
    // Define a schema to validate the request body against
    const BillboardValidation = z.object({
      title: z.string().min(2),
      img: z.string().min(2),
      storeId: z.string().min(1),
    });

    // Validate the request body against the schema above
    BillboardValidation.parse({
      title,
      img,
      storeId,
    });

    // extract the inferred type
    type BillboardValidation = z.infer<typeof BillboardValidation>;

    // Create a new product in the database
    const newBillboard = await prismadb.billboard.create({
      data: {
        title,
        img,
        storeId,
      },
    });

    return new Response(JSON.stringify({ newBillboard, message: "Success" }), {
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
      return new Response(
        JSON.stringify({ error: "An error occurred", errorMessage: error }),
        {
          status: 500,
        }
      );
    }
  }
}
