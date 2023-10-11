import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {storeId} = await req.json();
    const products = await prismadb.product.findMany({ where: { storeId: storeId } });
    return new Response(JSON.stringify({ products }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "An error occurred", errorMessage: error }),
      {
        status: 500,
      }
    );
  }
}
