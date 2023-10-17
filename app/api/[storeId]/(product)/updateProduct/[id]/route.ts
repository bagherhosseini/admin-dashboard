import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../../lib/prismadb";


//Function to delete a size
export async function PATCH(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const { img, title, description, price, categoryId, sizeId, featured, archived, storeId} = await req.json();
        if (!params.id) {
            return new NextResponse("Id is required", { status: 400 });
        }

        if (!img && !title && !description && !price && !categoryId && !sizeId && !featured && !archived && !storeId) {
            return new Response(
                JSON.stringify({ error: "Data is missing" }),
                {
                    status: 400,
                }
            );
        }

        const size = await prismadb.product.update({
            where: { id: parseInt(params.id.toString()) },
            data: { img, title, description, price, categoryId, sizeId, featured, archived, storeId }
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