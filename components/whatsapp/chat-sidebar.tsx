"use client"

import { Search, MessageSquarePlus, MoreVertical } from "lucide-react"

interface Contact {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  avatar: string
}

interface ChatSidebarProps {
  contacts: Contact[]
  activeChat: string
  onSelectChat: (id: string) => void
}

export function ChatSidebar({ contacts, activeChat, onSelectChat }: ChatSidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col border-r border-border bg-[var(--wa-panel)]">
      {/* Sidebar Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-[var(--wa-header)]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--wa-green)] text-[var(--wa-panel)] font-semibold text-sm">
            {"Y"}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors" aria-label="New chat">
            <MessageSquarePlus className="h-5 w-5" />
          </button>
          <button className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors" aria-label="Menu">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-3 rounded-lg bg-[var(--wa-hover)] px-4 py-1.5">
          <Search className="h-4 w-4 text-[var(--wa-text-secondary)]" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="flex-1 bg-transparent text-sm text-[var(--wa-text-primary)] placeholder:text-[var(--wa-text-secondary)] outline-none"
          />
        </div>
      </div>

      {/* Contact List */}
      <nav className="flex-1 overflow-y-auto wa-scrollbar" aria-label="Chat list">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onSelectChat(contact.id)}
            className={`flex w-full items-center gap-3 px-3 py-3 transition-colors hover:bg-[var(--wa-hover)] ${
              activeChat === contact.id ? "bg-[var(--wa-hover)]" : ""
            }`}
            aria-current={activeChat === contact.id ? "true" : undefined}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--wa-text-secondary)] text-[var(--wa-panel)] text-base font-semibold">
              {contact.avatar}
            </div>
            <div className="flex flex-1 flex-col items-start min-w-0 border-b border-border/30 pb-3">
              <div className="flex w-full items-center justify-between">
                <span className="text-[var(--wa-text-primary)] text-base font-normal truncate">
                  {contact.name}
                </span>
                <span className={`text-xs shrink-0 ml-2 ${
                  contact.unread > 0 ? "text-[var(--wa-green)]" : "text-[var(--wa-text-secondary)]"
                }`}>
                  {contact.time}
                </span>
              </div>
              <div className="flex w-full items-center justify-between mt-0.5">
                <p className="text-sm text-[var(--wa-text-secondary)] truncate pr-2">
                  {contact.lastMessage}
                </p>
                {contact.unread > 0 && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--wa-green)] text-[10px] font-bold text-[var(--wa-panel)]">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  )
}
