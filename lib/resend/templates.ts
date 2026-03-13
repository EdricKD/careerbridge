import { getAppUrl } from "@/lib/env";

export function renderWeeklyCheckinEmail(input: {
  studentName: string;
  body: string;
}) {
  return `
    <div style="font-family:DM Sans,Arial,sans-serif;background:#FAFAF8;padding:32px;color:#111827;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #E5E7EB;border-radius:20px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.08),0 4px 16px rgba(0,0,0,0.04);">
        <p style="font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:#6B7280;margin:0 0 12px;">CareerBridge Ghana</p>
        <h1 style="font-size:28px;line-height:1.2;margin:0 0 16px;color:#1B4332;">Hi ${input.studentName}, your career momentum is still alive.</h1>
        <p style="font-size:16px;line-height:1.7;color:#374151;margin:0 0 24px;">${input.body}</p>
        <a href="${getAppUrl()}/chat" style="display:inline-block;background:#1B4332;color:#ffffff;text-decoration:none;padding:14px 18px;border-radius:12px;font-weight:600;">Open your Career Companion</a>
      </div>
    </div>
  `.trim();
}
