"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartDatum } from "@/types/app";

type EngagementChartProps = {
  data: ChartDatum[];
};

export function EngagementChart({ data }: EngagementChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#1B4332" strokeWidth={3} />
          <Line type="monotone" dataKey="secondary" stroke="#F59E0B" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
