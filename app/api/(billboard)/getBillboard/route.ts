import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { storeId } = data as {
      storeId: string;
    };

    const billboard = await prismadb.billboard.findMany({ where: { storeId } });
    return new Response(JSON.stringify({ billboard }), {
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
