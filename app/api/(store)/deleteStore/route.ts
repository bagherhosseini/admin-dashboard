import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { storeId } = await req.json();

    if (!storeId) {
      return new Response(
        JSON.stringify({ error: "Store ID is required"}),
        {
        status: 400
      }
      );
    }
    await prismadb.store.delete({ where: { id: storeId } });
    
    return new Response(JSON.stringify({ message: "Store deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "An error occurred deleting the store", errorMessage: error }),
      {
        status: 500,
      }
    );
  }
}