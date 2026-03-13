import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  GraduationCap,
  LineChart,
  MapPinned,
  Sparkles,
  Users2,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const valueProps = [
  {
    title: "Career clarity for students",
    description:
      "AI-guided discovery, progress tracking, and shadowing pathways that make next steps feel concrete.",
    icon: GraduationCap,
  },
  {
    title: "Employability visibility for universities",
    description:
      "See engagement, student momentum, and partnership activity in one platform built for Ghanaian campuses.",
    icon: LineChart,
  },
  {
    title: "Better talent access for employers",
    description:
      "Publish experiential opportunities and meet motivated students before the traditional hiring funnel begins.",
    icon: BriefcaseBusiness,
  },
];

const audiences = [
  {
    title: "Students",
    description:
      "Discover direction, build proof, and stay accountable with guided next steps.",
    icon: GraduationCap,
  },
  {
    title: "Universities",
    description:
      "Support entire cohorts with analytics, messaging, licensing, and employer relationships.",
    icon: Building2,
  },
  {
    title: "Employers",
    description:
      "Host shadowing, review applicants, and build your student talent pipeline early.",
    icon: Users2,
  },
];

const highlights = [
  "Role-based onboarding for students, universities, and employers",
  "Shadowing marketplace tailored to real opportunity in Ghana",
  "Supabase-backed auth and data foundation for the full platform",
];

const momentumSteps = [
  {
    title: "Sign up by role",
    description:
      "Choose the experience that fits you, whether you are a student, a university team, or an employer.",
  },
  {
    title: "Complete your foundation",
    description:
      "Set your profile, interests, and goals so CareerBridge can personalize the journey from day one.",
  },
  {
    title: "Turn insight into action",
    description:
      "Move from advice to applications, partnerships, and measurable career progress across the ecosystem.",
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[540px] bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(27,67,50,0.16),transparent_34%)]" />

      <section className="px-6 pb-20 pt-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <header className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <Logo />
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="ghost">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/signup">
                  Sign up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </header>

          <div className="grid gap-10 pb-10 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit">
                CareerBridge Ghana
              </Badge>
              <div className="space-y-5">
                <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-slate-950 sm:text-6xl">
                  Bridge the gap between{" "}
                  <span className="gradient-text">classroom potential</span> and
                  career opportunity.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  CareerBridge Ghana helps students discover direction,
                  universities support employability at scale, and employers
                  find emerging talent through a shared, action-oriented
                  platform.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/signup">
                    Create an account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">I already have an account</Link>
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <Card className="border-primary/10 p-5">
                  <p className="font-display text-3xl text-primary">3</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Role-based entry points from day one
                  </p>
                </Card>
                <Card className="border-primary/10 p-5">
                  <p className="font-display text-3xl text-primary">1</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Shared platform for the full career ecosystem
                  </p>
                </Card>
                <Card className="border-primary/10 p-5">
                  <p className="font-display text-3xl text-primary">Now</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Ready for Phase 1 authentication and onboarding
                  </p>
                </Card>
              </div>
            </div>

            <Card className="overflow-hidden border-primary/10 bg-[linear-gradient(160deg,rgba(27,67,50,0.98),rgba(15,36,28,0.95))] p-8 text-white shadow-lift">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <Sparkles className="h-6 w-6 text-[#F59E0B]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
                    Launch foundation
                  </p>
                  <h2 className="mt-2 text-3xl text-white">
                    Built for momentum, not busywork.
                  </h2>
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                {audiences.map((audience) => {
                  const Icon = audience.icon;

                  return (
                    <div
                      key={audience.title}
                      className="rounded-[28px] border border-white/10 bg-white/5 p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-white/10 p-3">
                          <Icon className="h-5 w-5 text-[#F59E0B]" />
                        </div>
                        <div>
                          <h3 className="text-xl text-white">{audience.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-white/75">
                            {audience.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                  <MapPinned className="h-4 w-4 text-[#F59E0B]" />
                  Built with local relevance in mind
                </div>
                <ul className="mt-4 space-y-3">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-sm leading-7 text-white/75"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F59E0B]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge variant="outline" className="w-fit">
                Value props
              </Badge>
              <h2 className="mt-4 text-3xl sm:text-4xl">
                A cleaner path from aspiration to employability.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-500">
              Phase 1 puts the front door in place: a clear landing experience,
              role-aware sign-up, secure login, and the Supabase foundation the
              rest of the platform can grow on.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {valueProps.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="border-white/70 p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-primary/10 bg-white/80 p-8 shadow-soft backdrop-blur md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <Badge variant="secondary" className="w-fit">
                How it starts
              </Badge>
              <h2 className="mt-4 text-3xl sm:text-4xl">
                CareerBridge begins with a strong front door.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
                The platform now guides people into the right account path
                immediately, so later phases can layer onboarding, dashboards,
                analytics, and opportunity workflows on top of a clean base.
              </p>
            </div>

            <div className="grid gap-4">
              {momentumSteps.map((step, index) => (
                <Card
                  key={step.title}
                  className="flex gap-4 border-primary/10 p-5 shadow-none"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 rounded-[28px] border border-dashed border-primary/20 bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
                Ready to start?
              </p>
              <h3 className="mt-2 text-2xl">
                Launch your CareerBridge Ghana account today.
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/signup">Sign up</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
