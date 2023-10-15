import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";
import { z } from "zod";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET( req: NextRequest, { params }: { params: { storeId: string } }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const orders = await prismadb.order.findMany({ where: { storeId: params.storeId } });
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
    
    return new Response(JSON.stringify({ Orders: newResponse.orders }),{headers: corsHeaders});

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

