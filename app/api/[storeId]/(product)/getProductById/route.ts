import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../../lib/prismadb";
import { z } from "zod";

export async function POST(req: NextRequest, { params }: { params: { storeId: string } }){
    try{
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }
        const data = await req.json();
        const {
            productId
        } = data as {
            productId: number;
        };

        // Define a schema to validate the request body against
        const ProductValidation = z.object({
            productId: z.number().min(1),
        });
    
        // Validate the request body against the schema above
        ProductValidation.parse({
            productId
        });
    
        // extract the inferred type
        type ProductValidation = z.infer<typeof ProductValidation>;

        const products = await prismadb.product.findUnique({
            where: {
                id: productId,
                storeId : params.storeId
            }
        });
        
        return new Response(JSON.stringify({ products }), {
            status: 200,
        });
    }catch(error){
        if (error instanceof z.ZodError) {
            // If it's a ZodError (validation error), extract the messages and return them in the response
            const validationMessages = error.errors.map(
              (validationError) => validationError.message
            );
            return new Response(JSON.stringify({ errors: validationMessages[0] }), {
              status: 400,
            });
        } else {
            // Handle other errors here if needed
            return new Response(JSON.stringify({ error: "An error occurred", errorMessage: error }), {
                status: 500,
            });
        }
    }
}
          
