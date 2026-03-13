import { demoUniversityStudents } from "@/lib/demo-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function UniversityStudentsPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Student management"
        description="Invite by email, upload CSV cohorts, deactivate accounts, and inspect read-only student progress snapshots."
        action={<Button>Export CSV</Button>}
      />
      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <Input placeholder="Invite students by email or upload a CSV file" />
          <Button>Send invites</Button>
        </div>
      </Card>
      <Card className="overflow-x-auto p-0">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-slate-50/80 text-slate-500">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Degree</th>
              <th className="px-6 py-4">Interest</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last active</th>
            </tr>
          </thead>
          <tbody>
            {demoUniversityStudents.map((student) => (
              <tr key={student.id} className="border-b border-border last:border-b-0">
                <td className="px-6 py-4 font-medium text-slate-900">{student.name}</td>
                <td className="px-6 py-4 text-slate-600">{student.email}</td>
                <td className="px-6 py-4 text-slate-600">{student.degree}</td>
                <td className="px-6 py-4 text-slate-600">{student.interest}</td>
                <td className="px-6 py-4 text-slate-600">{student.status}</td>
                <td className="px-6 py-4 text-slate-600">{student.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
