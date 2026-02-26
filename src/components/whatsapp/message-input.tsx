"use client"

import { useState, type FormEvent } from "react"
import { Smile, Paperclip, Mic, SendHorizontal } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (text: string) => void
  disabled?: boolean
}

export function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  const [text, setText] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (text.trim() && !disabled) {
      onSendMessage(text.trim())
      setText("")
    }
  }

  return (
    <footer className="flex items-center gap-2 bg-[var(--wa-header)] px-4 py-2.5 shrink-0">
      <button
        className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors p-1"
        aria-label="Emoji"
        type="button"
      >
        <Smile className="h-6 w-6" />
      </button>
      <button
        className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors p-1"
        aria-label="Attach"
        type="button"
      >
        <Paperclip className="h-6 w-6" />
      </button>

      <form onSubmit={handleSubmit} className="flex flex-1 items-center gap-2">
        <div className="flex-1 rounded-lg bg-[var(--wa-hover)] px-4 py-2.5">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={disabled ? "Ai-\u05D7.\u05E1\u05D1\u05DF is typing..." : "Type a message"}
            disabled={disabled}
            className="w-full bg-transparent text-sm text-[var(--wa-text-primary)] placeholder:text-[var(--wa-text-secondary)] outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        {text.trim() ? (
          <button
            type="submit"
            disabled={disabled}
            className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-green)] transition-colors p-1 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <SendHorizontal className="h-6 w-6" />
          </button>
        ) : (
          <button
            type="button"
            className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors p-1"
            aria-label="Voice message"
          >
            <Mic className="h-6 w-6" />
          </button>
        )}
      </form>
    </footer>
  )
}
