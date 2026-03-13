import { format, formatDistanceToNow } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CareerLevel } from "@/types/app";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatShortDate(value: string) {
  return format(new Date(value), "MMM d, yyyy");
}

export function formatRelativeDate(value: string) {
  return formatDistanceToNow(new Date(value), { addSuffix: true });
}

export function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

export function getCareerLevelFromXp(xp: number): CareerLevel {
  if (xp < 200) return "Freshman";
  if (xp < 500) return "Explorer";
  if (xp < 900) return "Pathfinder";
  if (xp < 1400) return "Navigator";
  if (xp < 2100) return "Trailblazer";
  return "Pioneer";
}

export function getNextCareerLevelTarget(level: CareerLevel) {
  const targets: Record<CareerLevel, number> = {
    Freshman: 200,
    Explorer: 500,
    Pathfinder: 900,
    Navigator: 1400,
    Trailblazer: 2100,
    Pioneer: 2800,
  };

  return targets[level];
}

export function safeJsonParse<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function truncate(value: string, length = 140) {
  if (value.length <= length) return value;

  return `${value.slice(0, length - 1)}...`;
}
