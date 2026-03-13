import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { createStripeClient } from "@/lib/stripe/server";
import { handleStripeWebhookEvent } from "@/lib/stripe/webhooks";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = createStripeClient();
  const signature = headers().get("stripe-signature");

  if (!stripe || !signature || !env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true, mocked: true });
  }

  const payload = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
    const result = await handleStripeWebhookEvent(event);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook failure" },
      { status: 400 },
    );
  }
}
