import { Logo } from "@/components/shared/logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen px-6 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Logo />
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="surface-card overflow-hidden rounded-[32px] border-primary/10 bg-[linear-gradient(160deg,rgba(27,67,50,0.98),rgba(17,24,39,0.96))] p-8 text-white">
            <p className="eyebrow border-white/10 bg-white/5 text-white/70">
              AI career operating system
            </p>
            <h1 className="mt-6 text-5xl text-white">
              Career guidance that feels alive, local, and personal.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/75">
              CareerBridge Ghana connects students, universities, employers,
              and administrators in one intelligent workflow with AI analysis,
              shadowing, mentorship, messaging, and payment-backed licensing.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">{children}</div>
        </div>
      </div>
    </main>
  );
}
