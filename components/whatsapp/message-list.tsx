"use client"

import { useRef, useEffect } from "react"
import { ChatBubble, type Message } from "./chat-bubble"

interface MessageListProps {
  messages: Message[]
  isThinking?: boolean
}

export function MessageList({ messages, isThinking = false }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isThinking])

  return (
    <div className="flex-1 overflow-y-auto wa-scrollbar wa-chat-pattern px-4 py-4 sm:px-8 md:px-16">
      {/* Encryption notice */}
      <div className="mb-6 flex justify-center">
        <div className="rounded-lg bg-[var(--wa-encrypt-bg)] px-3 py-1.5 shadow-sm">
          <p className="text-[11px] text-[var(--wa-encrypt-text)] text-center leading-relaxed">
            Messages are end-to-end encrypted. No one outside of this chat,
            not even WhatsApp, can read or listen to them.
          </p>
        </div>
      </div>

      {/* Date divider */}
      <div className="mb-4 flex justify-center">
        <span className="rounded-md bg-[var(--wa-divider-bg)] px-3 py-1 text-xs text-[var(--wa-divider-text)] shadow-sm uppercase tracking-wide">
          Today
        </span>
      </div>

      {/* Messages */}
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}

      {/* Typing indicator */}
      {isThinking && (
        <div className="flex justify-start mb-1">
          <div className="rounded-lg bg-[var(--wa-incoming)] px-4 py-3 relative">
            {/* Tail */}
            <div
              className="absolute top-0 -left-1.5 h-3 w-3 bg-[var(--wa-incoming)]"
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            />
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[var(--wa-text-secondary)] animate-[bounce_1.4s_ease-in-out_infinite]" />
              <span className="h-2 w-2 rounded-full bg-[var(--wa-text-secondary)] animate-[bounce_1.4s_ease-in-out_0.2s_infinite]" />
              <span className="h-2 w-2 rounded-full bg-[var(--wa-text-secondary)] animate-[bounce_1.4s_ease-in-out_0.4s_infinite]" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
