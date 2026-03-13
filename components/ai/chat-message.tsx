import { cn, formatRelativeDate } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/types/app";

type ChatMessageProps = {
  message: ChatMessageType;
};

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "max-w-[82%] rounded-[24px] px-4 py-3 text-sm leading-7",
        message.role === "assistant"
          ? "bg-white text-slate-700 shadow-soft"
          : "ml-auto bg-primary text-white",
      )}
    >
      <p>{message.content}</p>
      <p
        className={cn(
          "mt-2 text-[10px] uppercase tracking-[0.18em]",
          message.role === "assistant" ? "text-slate-400" : "text-white/70",
        )}
      >
        {formatRelativeDate(message.createdAt)}
      </p>
    </div>
  );
}
