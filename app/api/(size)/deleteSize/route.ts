import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { storeId, id } = await req.json();
    

    // Perform the deletion using prismadb
    const deletedSize = await prismadb.size.delete({ where: 
        { storeId, id  } });
    
    // Check if any rows were deleted
    if (deletedSize) {
      return new Response(JSON.stringify({ message: "Size deleted successfully" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "No size found to delete" }), {
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
