"use client"

import { Phone, Video, MoreVertical, Search, Sun, Moon, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface ChatHeaderProps {
  name: string
  status: string
  avatar: string
  onToggleSidebar?: () => void
}

export function ChatHeader({ name, status, avatar, onToggleSidebar }: ChatHeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="flex items-center justify-between bg-[var(--wa-header)] px-3 py-2.5 shrink-0 sm:px-4">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onToggleSidebar}
          className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors p-1 md:hidden"
          aria-label="Toggle sidebar"
          type="button"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--wa-green)] text-[var(--wa-panel)] text-sm font-bold">
          {avatar}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-medium text-[var(--wa-text-primary)] leading-tight">
            {name}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25d366] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25d366]" />
            </span>
            <span className="text-xs text-[#25d366] font-medium">{status}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="hidden text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors sm:block" aria-label="Video call" type="button">
          <Video className="h-5 w-5" />
        </button>
        <button className="hidden text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors sm:block" aria-label="Voice call" type="button">
          <Phone className="h-5 w-5" />
        </button>
        <button className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors" aria-label="Search messages" type="button">
          <Search className="h-5 w-5" />
        </button>

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] hover:bg-[var(--wa-hover)] transition-colors"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            type="button"
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </button>
        )}

        <button className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors" aria-label="Menu" type="button">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
