import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/catalog";
import { STORE_NAME } from "@/lib/config";

function stripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

function originFrom(request: NextRequest) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (envUrl) return envUrl;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function GET() {
  return NextResponse.json({
    mode: stripeConfigured() ? "stripe" : "demo",
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    customer?: { name?: string; email?: string };
    items?: { id: string }[];
  };

  const ids = Array.isArray(body.items) ? body.items.map((item) => item.id) : [];
  const products = ids
    .map((id) => getProduct(id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  if (products.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const origin = originFrom(request);

  if (!stripeConfigured()) {
    return NextResponse.json({
      mode: "demo",
      url: "/checkout/success?mode=demo",
    });
  }

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const email = body.customer?.email?.trim();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      customer_email: email || undefined,
      metadata: {
        store: STORE_NAME,
        customer_name: body.customer?.name ?? "",
      },
      line_items: products.map((product) => ({
        quantity: 1,
        price_data: {
          currency: "zar",
          unit_amount: Math.round(product.price_zar * 100),
          product_data: {
            name: `${product.type} ${product.id}`,
            description: "Indicative price — confirm with the gallery",
          },
        },
      })),
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 },
      );
    }

    return NextResponse.json({ mode: "stripe", url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Stripe checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
