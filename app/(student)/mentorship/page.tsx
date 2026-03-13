import { demoMentors } from "@/lib/demo-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { MentorshipHub } from "@/components/student/mentorship-hub";

export default function MentorshipPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Mentorship"
        description="Browse mentors by industry, request guided matches, and use Calendly or manual requests to turn introductions into sessions."
      />
      <MentorshipHub mentors={demoMentors} />
    </div>
  );
}
