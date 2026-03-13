import {
  demoAnalyses,
  demoApplications,
  demoChatMessages,
  demoStudentProfile,
} from "@/lib/demo-data";
import { CareerAnalysisWorkspace } from "@/components/student/career-analysis-workspace";

export default function CareerAnalysisPage() {
  return (
    <CareerAnalysisWorkspace
      profile={demoStudentProfile}
      analyses={demoAnalyses}
      applications={demoApplications}
      history={demoChatMessages}
    />
  );
}
