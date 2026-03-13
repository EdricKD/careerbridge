"use client";

import { useState } from "react";
import type { Mentor } from "@/types/app";
import { MentorCard } from "@/components/student/mentor-card";
import { Card } from "@/components/ui/card";

type MentorshipHubProps = {
  mentors: Mentor[];
};

export function MentorshipHub({ mentors }: MentorshipHubProps) {
  const [message, setMessage] = useState<string | null>(null);

  async function requestMentor(mentorId: string) {
    const response = await fetch("/api/mentorship/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mentorId }),
    });
    const body = await response.json();
    setMessage(
      response.ok
        ? body.message ?? "Mentor request sent."
        : body.error ?? "Unable to request mentor match.",
    );
  }

  return (
    <div className="space-y-6">
      {message ? (
        <Card className="border-success/20 bg-success/5 p-4">
          <p className="text-sm text-success">{message}</p>
        </Card>
      ) : null}
      <div className="grid gap-6 xl:grid-cols-2">
        {mentors.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            onRequest={() => requestMentor(mentor.id)}
          />
        ))}
      </div>
    </div>
  );
}
