"use client"

import { Search, MessageSquarePlus, MoreVertical, Truck, X } from "lucide-react"

interface Contact {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  avatar: string
  role?: string
}

interface ChatSidebarProps {
  contacts: Contact[]
  activeChat: string
  onSelectChat: (id: string) => void
  isOpen: boolean
  onClose: () => void
}

export function ChatSidebar({ contacts, activeChat, onSelectChat, isOpen, onClose }: ChatSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-full w-[320px] flex-col border-r border-border bg-[var(--wa-panel)] transition-transform duration-200 ease-in-out
          md:relative md:z-auto md:w-[380px] md:translate-x-0 lg:w-[420px]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-[var(--wa-header)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--wa-green)] text-[var(--wa-panel)] font-bold text-sm">
              <Truck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[var(--wa-text-primary)]">{"H. Saban"}</span>
              <span className="text-[11px] text-[var(--wa-text-secondary)]">Logistics</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors" aria-label="New chat" type="button">
              <MessageSquarePlus className="h-5 w-5" />
            </button>
            <button className="hidden text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors md:block" aria-label="More options" type="button">
              <MoreVertical className="h-5 w-5" />
            </button>
            <button className="text-[var(--wa-text-secondary)] hover:text-[var(--wa-text-primary)] transition-colors md:hidden" aria-label="Close sidebar" type="button" onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Search Bar */}
        <div className="px-3 py-2">
          <div className="flex items-center gap-3 rounded-lg bg-[var(--wa-hover)] px-4 py-2">
            <Search className="h-4 w-4 shrink-0 text-[var(--wa-text-secondary)]" />
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
              onClick={() => {
                onSelectChat(contact.id)
                onClose()
              }}
              className={`flex w-full items-center gap-3 px-3 py-3 transition-colors hover:bg-[var(--wa-hover)] ${
                activeChat === contact.id ? "bg-[var(--wa-hover)]" : ""
              }`}
              aria-current={activeChat === contact.id ? "true" : undefined}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--wa-text-secondary)] text-[var(--wa-panel)] text-base font-semibold">
                {contact.avatar}
              </div>
              <div className="flex flex-1 flex-col items-start min-w-0 border-b border-[var(--border)]/30 pb-3">
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col items-start min-w-0">
                    <span className="text-[var(--wa-text-primary)] text-[15px] font-normal truncate">
                      {contact.name}
                    </span>
                    {contact.role && (
                      <span className="text-[11px] text-[var(--wa-green)] font-medium leading-tight">
                        {contact.role}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs shrink-0 ml-2 self-start mt-0.5 ${
                    contact.unread > 0 ? "text-[var(--wa-green)]" : "text-[var(--wa-text-secondary)]"
                  }`}>
                    {contact.time}
                  </span>
                </div>
                <div className="flex w-full items-center justify-between mt-0.5">
                  <p className="text-[13px] text-[var(--wa-text-secondary)] truncate pr-2">
                    {contact.lastMessage}
                  </p>
                  {contact.unread > 0 && (
                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[var(--wa-green)] px-1 text-[10px] font-bold text-[var(--wa-panel)]">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}
