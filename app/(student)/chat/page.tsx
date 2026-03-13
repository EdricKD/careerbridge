import { demoChatMessages } from "@/lib/demo-data";
import { CompanionChat } from "@/components/student/companion-chat";

export default function StudentChatPage() {
  return <CompanionChat initialMessages={demoChatMessages} />;
}
