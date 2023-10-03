import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";
import { z } from "zod";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();

  if (
    typeof data.title === 'string' &&
    typeof data.price === 'number' &&
    typeof data.description === 'string' &&
    typeof data.img === 'string' &&
    typeof data.categoryId === 'number' &&
    typeof data.archived === 'boolean' &&
    typeof data.featured === 'boolean' &&
    typeof data.sizeId === 'number'
  ) {
    const {
      title,
      price,
      description,
      img,
      categoryId,
      archived,
      featured,
      sizeId,
  } = data;

    // Define a schema to validate the request body against
    const ProductValidation = z.object({
      title: z.string().min(3),
      price: z.number(),
      description: z.string(),
      img: z.string(),
      categoryId: z.number(),
      archived: z.boolean(),
      featured: z.boolean(),
      sizeId: z.number(),
    });

    // Validate the request body against the schema above
    ProductValidation.parse({ title, price, description, img, categoryId, archived, featured, sizeId });

    // extract the inferred type
    type ProductValidation = z.infer<typeof ProductValidation>;

    // Create a new product in the database
    const newProduct = await prismadb.product.create({
      data: {
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

    return new Response(JSON.stringify({newProduct, message: "Success"}), { status: 200 });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      // If it's a ZodError (validation error), extract the messages and return them in the response
      const validationMessages = error.errors.map((validationError) => validationError.message);
      return new Response(JSON.stringify({ errors: validationMessages[0] }), {
        status: 400,
      });
    } else {
      // Handle other errors here if needed
      return new Response(JSON.stringify({ error: "An error occurred" }), {
        status: 500,
      });
    }
  }
}
