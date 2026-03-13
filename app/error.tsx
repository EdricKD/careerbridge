"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background px-6">
        <Card className="max-w-lg p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-error/10 text-error">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-3xl">Something knocked us off course</h1>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            The platform hit an unexpected error. You can retry the page now,
            and the app will keep all persisted data in place.
          </p>
          <Button className="mt-6" onClick={reset}>
            Try again
          </Button>
        </Card>
      </body>
    </html>
  );
}
