import Stripe from "stripe";
import { env, isStripeConfigured } from "@/lib/env";

let stripeClient: Stripe | null | undefined;

export function createStripeClient() {
  if (!isStripeConfigured) return null;

  if (!stripeClient) {
    stripeClient = new Stripe(env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-06-20",
    });
  }

  return stripeClient;
}
