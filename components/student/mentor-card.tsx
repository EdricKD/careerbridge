import { Calendar, Mail } from "lucide-react";
import type { Mentor } from "@/types/app";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type MentorCardProps = {
  mentor: Mentor;
  onRequest: () => void;
};

export function MentorCard({ mentor, onRequest }: MentorCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
            {mentor.industry}
          </p>
          <h3 className="mt-2 text-2xl">{mentor.name}</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {mentor.company}
          </p>
        </div>
        {mentor.matched ? <Badge variant="success">Matched</Badge> : null}
      </div>
      <p className="mt-4 text-sm leading-7">{mentor.bio}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {mentor.expertise.map((item) => (
          <Badge key={item} variant="outline">
            {item}
          </Badge>
        ))}
      </div>
      <div className="mt-5 space-y-2 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {mentor.availability}
        </div>
        {mentor.contact ? (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {mentor.contact}
          </div>
        ) : null}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={onRequest}>
          {mentor.matched ? "Request another session" : "Request match"}
        </Button>
        {mentor.calendlyUrl ? (
          <Button asChild variant="outline">
            <a href={mentor.calendlyUrl} target="_blank" rel="noreferrer">
              Open Calendly
            </a>
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
