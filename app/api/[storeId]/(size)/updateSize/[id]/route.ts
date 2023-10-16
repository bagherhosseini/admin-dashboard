import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../../lib/prismadb";


//Function to delete a size
export async function PATCH(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const { name, description } = await req.json();
        if (!params.id) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        if (!name) {
            return new Response(
                JSON.stringify({ error: "Name is required" }),
                {
                    status: 400,
                }
            );
        }

        if (!description) {
            return new Response(
                JSON.stringify({ error: "Description is required" }),
                {
                    status: 400,
                }
            );
        }

        const size = await prismadb.size.update({
            where: { id: parseInt(params.id.toString()) },
            data: { name, description }
        });

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