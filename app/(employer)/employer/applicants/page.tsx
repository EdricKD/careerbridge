import { demoApplicants } from "@/lib/demo-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function EmployerApplicantsPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Applicant management"
        description="Review student profiles, approve or reject applicants, and capture structured feedback after completion."
      />
      <Card className="overflow-x-auto p-0">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-slate-50/80 text-slate-500">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">University</th>
              <th className="px-6 py-4">Degree</th>
              <th className="px-6 py-4">Fit</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demoApplicants.map((applicant) => (
              <tr key={applicant.id} className="border-b border-border last:border-b-0">
                <td className="px-6 py-4 font-medium text-slate-900">{applicant.name}</td>
                <td className="px-6 py-4 text-slate-600">{applicant.university}</td>
                <td className="px-6 py-4 text-slate-600">{applicant.degree}</td>
                <td className="px-6 py-4 text-slate-600">{applicant.fit}</td>
                <td className="px-6 py-4 text-slate-600">{applicant.status}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button size="sm">Approve</Button>
                    <Button size="sm" variant="outline">
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
