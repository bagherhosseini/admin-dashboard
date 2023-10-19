import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "../../../../lib/stripe";
import prismadb from "../../../../lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productInfo } = await req.json();

  const productIds = productInfo.map((product: any) => product.id);

  if (!productInfo || productInfo.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    line_items.push({
      quantity: productInfo.find((p: any) => p.id === product.id).quantity,
      price_data: {
        currency: 'SEK',
        product_data: {
          name: product.title,
        },
        unit_amount: product.price.toNumber() * 100
      }
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      status: "notPaid",
      products: productInfo.map((product: any) => (
        { productId: product.id, quantity: product.quantity }
      )),
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: Number(order.id),
    },
  });

  return NextResponse.json({ url: session.url }, {
    headers: corsHeaders
  });
};