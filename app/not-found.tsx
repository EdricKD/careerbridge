import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <Card className="max-w-xl p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Compass className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-4xl">Page not found</h1>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          That route is not available in the current workspace. Head back to
          the main platform and continue from there.
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <Link href="/">Return home</Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
