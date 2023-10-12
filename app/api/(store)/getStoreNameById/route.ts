import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function GET(req: NextRequest, res: NextResponse) {
  // Get the storeId from the query parameter
  const url = new URL(req.nextUrl.href);
  const storeId = url.searchParams.get('storeId');

  if (!storeId) {
    return new Response(JSON.stringify({ error: "Store ID is required" }), {
      status: 400,
    });
  }

  try {
    // Find the store using the provided storeId
    const store = await prismadb.store.findUnique({
      where: { id: storeId }
    });

    // Check if store exists
    if (!store) {
      return new Response(JSON.stringify({ error: "Store not found" }), {
        status: 404,
      });
    }

    // Return the store name
    return new Response(JSON.stringify({ name: store.name }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "An error occurred fetching the store name", errorMessage: error }),
      {
        status: 500,
      }
    );
  }
}
