import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { billboardId } = await req.json();

    if (!billboardId) {
      return new Response(
        JSON.stringify({ error: "Billboard ID is required" }),
        {
          status: 400,
        }
      );
    }

    await prismadb.billboard.delete({ where: { id: billboardId } });

    return new Response(JSON.stringify({ message: "Successfully deleted" }), {
      status: 200,
    });
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
