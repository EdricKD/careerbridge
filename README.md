# CareerBridge Ghana

CareerBridge Ghana is a full-stack Next.js 14 platform for AI-guided career development across students, universities, employers, and platform administrators.

## Stack

- Next.js 14 App Router
- TypeScript strict mode
- Tailwind CSS + Framer Motion
- PostgreSQL on Supabase with Row Level Security
- Supabase Auth + Storage
- Anthropic Claude (`claude-sonnet-4-20250514`)
- Stripe for subscriptions and top-ups
- Resend for transactional email and AI nudges
- Recharts for analytics

## Getting Started

1. Install dependencies with `npm install`
2. Copy `.env.example` to `.env.local`
3. Apply the SQL in `supabase/migrations/001_initial_schema.sql`
4. Run `npm run dev`

## Product Areas

- Conversational onboarding for students, employers, and universities
- Student dashboard with AI analysis, chat, marketplace, progress, and mentorship
- University admin analytics, messaging, and license visibility
- Employer listing management, applicants, feedback, and profile tools
- Super admin revenue, moderation, and system health views
- Stripe webhooks, Resend email check-ins, and Supabase realtime notifications
