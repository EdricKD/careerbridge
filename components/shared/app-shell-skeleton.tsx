import { Skeleton } from "@/components/ui/skeleton";

export function AppShellSkeleton() {
  return (
    <div className="min-h-screen px-6 py-8 sm:px-8">
      <div className="grid min-h-[80vh] gap-6 lg:grid-cols-[280px_1fr]">
        <Skeleton className="hidden rounded-[28px] lg:block" />
        <div className="space-y-6">
          <Skeleton className="h-20 rounded-[28px]" />
          <div className="grid gap-6 xl:grid-cols-3">
            <Skeleton className="h-48 rounded-[28px]" />
            <Skeleton className="h-48 rounded-[28px]" />
            <Skeleton className="h-48 rounded-[28px]" />
          </div>
          <Skeleton className="h-80 rounded-[28px]" />
        </div>
      </div>
    </div>
  );
}
