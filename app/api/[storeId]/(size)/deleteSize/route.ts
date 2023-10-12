import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";


//Function to delete a size
export async function DELETE(req: NextRequest, { params }: { params: { storeId: string } }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const { sizeId } = await req.json();

    if (!sizeId) {
      return new Response(
        JSON.stringify({ error: "Size ID is required" }),
        {
          status: 400,
        }
      );
    }

    await prismadb.size.delete({ where: { id: sizeId, storeId: params.storeId } });

    return new Response(JSON.stringify({ message: "Successfully deleted" }), {
      status: 200,
    });
    //catches errors
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "An error occurred", errorMessage: error }),
      {
        status: 500,
      }
    );
  }
}