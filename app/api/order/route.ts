import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";
import { z } from "zod";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const {
      storeId
    } = data as {
      storeId: number;
    };

    // Define a schema to validate the request body against
    const ProductValidation = z.object({
      storeId: z.number().min(1),
    });

    // Validate the request body against the schema above
    ProductValidation.parse({
      storeId
    });

    // extract the inferred type
    type ProductValidation = z.infer<typeof ProductValidation>;

    const orders = await prismadb.order.findMany({ where: { storeId: storeId } });
    const productIdArray: number[] = orders.flatMap(item =>
      item.products.map(product => product.productId)
    );

    const uniqueProductIdArray: number[] = [...new Set(productIdArray)];

    const productsResponse = await prismadb.product.findMany({
      where: {
        id: {
          in: uniqueProductIdArray
        }
      }
    });;

    // Create a new object with full product information, excluding productId
    const newResponse = {
      orders: orders.map(order => {
        const productsWithFullInfo = order.products.map((product: { productId: number }) => {
          const productInfo = productsResponse.find(p => p.id === product.productId);
          const { productId, ...productWithoutId } = productInfo;
          return {
            ...productWithoutId,
          };
        });

        return {
          ...order,
          products: productsWithFullInfo, // Replace products with products with full info, excluding productId
        };
      }),
    };

    return new Response(JSON.stringify({ Orders: newResponse.orders }), {
      status: 200,
    });

  } catch (error) {
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
      console.log(error);
      return new Response(JSON.stringify({ error: "An error occurred", errorMessage: error }), {
        status: 500,
      });
    }
  }
}

