import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
}: EmptyStateProps) {
  return (
    <Card className="p-8 text-center">
      <h3 className="text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-500">{description}</p>
      {actionLabel ? (
        <div className="mt-6 flex justify-center">
          <Button>
            {actionLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
