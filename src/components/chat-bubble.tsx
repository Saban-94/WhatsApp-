"use client"

import { Check, CheckCheck } from "lucide-react"

export interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  time: string
  status?: "sent" | "delivered" | "read"
}

interface ChatBubbleProps {
  message: Message
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-1`}>
      <div
        className={`relative max-w-[85%] rounded-lg px-3 py-1.5 sm:max-w-[65%] ${
          isUser
            ? "bg-[var(--wa-outgoing)] text-[var(--wa-outgoing-text)]"
            : "bg-[var(--wa-incoming)] text-[var(--wa-incoming-text)]"
        }`}
      >
        {/* Tail */}
        <div
          className={`absolute top-0 h-3 w-3 ${
            isUser
              ? "-right-1.5 bg-[var(--wa-outgoing)]"
              : "-left-1.5 bg-[var(--wa-incoming)]"
          }`}
          style={{
            clipPath: isUser
              ? "polygon(0 0, 100% 0, 0 100%)"
              : "polygon(100% 0, 0 0, 100% 100%)",
          }}
        />

        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>

        <div className="flex items-center gap-1 mt-0.5 justify-end">
          <span className="text-[10px] text-[var(--wa-time-text)]">{message.time}</span>
          {isUser && message.status && (
            <span className="ml-0.5">
              {message.status === "read" ? (
                <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />
              ) : message.status === "delivered" ? (
                <CheckCheck className="h-3.5 w-3.5 text-[var(--wa-time-text)]" />
              ) : (
                <Check className="h-3.5 w-3.5 text-[var(--wa-time-text)]" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
