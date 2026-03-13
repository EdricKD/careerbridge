import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/env";
import { requireApiRole } from "@/lib/api";
import { createStripeClient } from "@/lib/stripe/server";
import { getIndividualCheckoutAmount, getUniversitySeatPrice } from "@/lib/stripe/client";
import { paymentCheckoutSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const authResult = await requireApiRole();

  if ("error" in authResult) {
    return authResult.error;
  }

  const parsed = paymentCheckoutSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid checkout payload" },
      { status: 400 },
    );
  }

  const stripe = createStripeClient();

  if (!stripe || authResult.preview) {
    return NextResponse.json({
      ok: true,
      url: `${getAppUrl()}${parsed.data.successPath}?checkout=preview`,
    });
  }

  const unitAmount =
    parsed.data.planType === "individual"
      ? getIndividualCheckoutAmount(false)
      : getUniversitySeatPrice(parsed.data.quantity ?? 500);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    success_url: `${getAppUrl()}${parsed.data.successPath}?checkout=success`,
    cancel_url: `${getAppUrl()}${parsed.data.cancelPath}?checkout=cancelled`,
    line_items: [
      {
        quantity: parsed.data.quantity ?? 1,
        price_data: {
          currency: "usd",
          product_data: {
            name:
              parsed.data.planType === "individual"
                ? "CareerBridge Student Premium"
                : "CareerBridge University License",
          },
          recurring: {
            interval: "month",
            interval_count: 6,
          },
          unit_amount: unitAmount * 100,
        },
      },
    ],
    metadata: {
      userId: authResult.auth.user?.id ?? "",
      planType: parsed.data.planType,
      universityId: parsed.data.universityId ?? "",
    },
  });

  return NextResponse.json({ ok: true, url: session.url });
}
