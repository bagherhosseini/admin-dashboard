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
      Array.isArray(item.products)
        ? item.products.map((product: any) => (product && typeof product === 'object' && 'productId' in product) ? product.productId : null)
        : new Response(JSON.stringify({ errorsMessage: "DB error: order, productIdArray"}), { status: 500,})
    );

    // Use a Set to store unique productIds
    const uniqueProductIdSet = new Set(productIdArray);

    // Convert the Set back to an array to get unique productIds
    const uniqueProductIdArray = Array.from(uniqueProductIdSet);

    const productsResponse = await prismadb.product.findMany({
      where: {
        id: {
          in: uniqueProductIdArray
        }
      }
    });;

    const newResponse = {
      orders: orders.map(order => {
        const productsWithFullInfo = Array.isArray(order.products)
          ? order.products.map((product: any) => {
              if (product && typeof product === 'object' && 'productId' in product) {
                const productInfo = productsResponse.find(p => p.id === product.productId);
                if (productInfo) {
                  return {
                    ...productInfo,
                    quantity: product.quantity, // Include the "quantity" property
                  };
                }
              }
              return null;
            })
          : [];
    
        return {
          ...order,
          products: productsWithFullInfo
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

