import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";
import Cors from "micro-cors";

const cors = Cors({
  origin:
    "https://admin-dashboard-kappa-one.vercel.app/api/f47ac10b-58cc-4372-a567-0e02b2c3d479/getProduct",
  credentials: true,
});


export async function GET( req: NextRequest, { params }: { params: { storeId: string } }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const products = await prismadb.product.findMany({ where: { storeId: params.storeId } });
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
