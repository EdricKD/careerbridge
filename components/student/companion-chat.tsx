"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { ChatMessage } from "@/components/ai/chat-message";
import { demoSuggestedPrompts } from "@/lib/demo-data";
import type { ChatMessage as ChatMessageType } from "@/types/app";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type CompanionChatProps = {
  initialMessages: ChatMessageType[];
};

export function CompanionChat({ initialMessages }: CompanionChatProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };

    setMessages((current) => [...current, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const body = await response.json();

      if (response.ok) {
        setMessages((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: body.reply,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <Card className="flex min-h-[70vh] flex-col p-0">
        <div className="border-b border-border p-6">
          <p className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            Persistent career companion
          </p>
          <h1 className="mt-4 text-3xl">Career Companion Chat</h1>
        </div>
        <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto bg-slate-50/60 p-6">
          {messages.map((item) => (
            <ChatMessage key={item.id} message={item} />
          ))}
          {loading ? (
            <div className="max-w-[82%] rounded-[24px] bg-white px-4 py-3 shadow-soft">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
          ) : null}
        </div>
        <div className="border-t border-border p-6">
          <div className="flex gap-3">
            <Input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about your CV, shadowing, interviews, or next steps"
            />
            <Button onClick={() => sendMessage(message)} disabled={loading}>
              Send
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl">Suggested prompts</h2>
        <div className="mt-5 space-y-3">
          {demoSuggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              className="w-full rounded-2xl border border-border bg-white p-4 text-left text-sm text-slate-700 transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              {prompt}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
