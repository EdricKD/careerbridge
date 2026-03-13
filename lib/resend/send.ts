import { Resend } from "resend";
import { env, isResendConfigured } from "@/lib/env";

let resendClient: Resend | null | undefined;

function getResendClient() {
  if (!isResendConfigured) return null;

  if (!resendClient) {
    resendClient = new Resend(env.RESEND_API_KEY!);
  }

  return resendClient;
}

export async function sendTransactionalEmail(input: {
  to: string;
  subject: string;
  html: string;
}) {
  const resend = getResendClient();

  if (!resend) {
    return { mocked: true };
  }

  return resend.emails.send({
    from: "CareerBridge Ghana <noreply@careerbridgeghana.com>",
    to: input.to,
    subject: input.subject,
    html: input.html,
  });
}
