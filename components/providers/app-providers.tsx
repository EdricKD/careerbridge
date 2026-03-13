"use client";

import { MotionConfig } from "framer-motion";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">{children}</div>
    </MotionConfig>
  );
}
