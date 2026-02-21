"use client"

import { useRef, useEffect } from "react"
import { ChatBubble, type Message } from "./chat-bubble"

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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

      <div ref={bottomRef} />
    </div>
  )
}
