"use client"

import { Phone, Video, MoreVertical, Search } from "lucide-react"

interface ChatHeaderProps {
  name: string
  status: string
  avatar: string
}

export function ChatHeader({ name, status, avatar }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between bg-[var(--wa-header)] px-4 py-2.5 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--wa-text-secondary)] text-[var(--wa-panel)] text-sm font-semibold">
          {avatar}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-normal text-[var(--wa-text-primary)]">
            {name}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--wa-green)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--wa-green)]" />
            </span>
            <span className="text-xs text-[var(--wa-green)]">{status}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors" aria-label="Video call">
          <Video className="h-5 w-5" />
        </button>
        <button className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors" aria-label="Voice call">
          <Phone className="h-5 w-5" />
        </button>
        <button className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors" aria-label="Search messages">
          <Search className="h-5 w-5" />
        </button>
        <button className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors" aria-label="Menu">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
