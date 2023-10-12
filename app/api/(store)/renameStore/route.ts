import { NextRequest, NextResponse } from "next/server";
import prismadb from '../../../../lib/prismadb';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { storeId, name } = await req.json();

        if (!storeId || !name) {
            return new NextResponse("Bad Request", { status: 400 });
        }

        const store = await prismadb.store.update({
            where: { id: storeId },
            data: { name }
        });

        if (!store) {
            return new NextResponse("Store not found", { status: 404 });
        }

        return new Response(JSON.stringify({ store }), {
            status: 200,
        });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "An error occurred", errorMessage: error }), {
            status: 500,
        });
    }
};