import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EmployerProfilePage() {
  return (
    <Card className="p-6">
      <SectionHeading
        title="Company profile"
        description="Edit the company description, industry, location, website, and branding visible across opportunities."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Input placeholder="Company name" />
        <Input placeholder="Industry" />
        <Input placeholder="Location" />
        <Input placeholder="Website" />
        <Textarea
          className="md:col-span-2"
          placeholder="Describe your company, what students can learn, and how you support career development."
        />
      </div>
      <Button className="mt-6">Save company profile</Button>
    </Card>
  );
}
