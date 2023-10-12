import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";

export async function DELETE(req: NextRequest, { params }: { params: { storeId: string } }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const { id } = await req.json();

    // Perform the deletion using prismadb
    const deletedCategory = await prismadb.category.delete({
      where:{ id, storeId: params.storeId }
    });

    // Check if any rows were deleted
    if (deletedCategory) {
      return new Response(JSON.stringify({ message: "Category deleted successfully" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "No category found to delete" }), {
        status: 404,
      });
    }
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