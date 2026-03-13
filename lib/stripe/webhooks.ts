import Stripe from "stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function handleStripeWebhookEvent(event: Stripe.Event) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return { received: true, mocked: true };
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (userId) {
        await supabase
          .from("users")
          .update({ subscription_status: "active" })
          .eq("id", userId);
      }

      break;
    }
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const userId = invoice.metadata?.userId;

      if (userId) {
        await supabase
          .from("users")
          .update({ subscription_status: "active" })
          .eq("id", userId);
      }

      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (userId) {
        await supabase
          .from("users")
          .update({ subscription_status: "canceled" })
          .eq("id", userId);
      }

      break;
    }
    default:
      break;
  }

  return { received: true };
}
