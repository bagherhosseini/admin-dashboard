import { NextRequest, NextResponse } from "next/server";
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userId } = auth();
        const { name } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId,
            }
        });

        return new Response(JSON.stringify({ store }), {
            status: 200,
        });

    } catch (error) {
        console.log(error);
        // Handle other errors here if needed
        return new Response(JSON.stringify({ error: "An error occurred", errorMessage: error }), {
            status: 500,
        });
    }
};