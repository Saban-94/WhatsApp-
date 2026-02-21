"use client"

import { useState, useCallback } from "react"
import { ChatSidebar } from "@/components/whatsapp/chat-sidebar"
import { ChatHeader } from "@/components/whatsapp/chat-header"
import { MessageList } from "@/components/whatsapp/message-list"
import { MessageInput } from "@/components/whatsapp/message-input"
import type { Message } from "@/components/whatsapp/chat-bubble"

const contacts = [
  {
    id: "ai-saban",
    name: "Ai-Saban",
    lastMessage: "Sure, I can help you with that!",
    time: "10:32 AM",
    unread: 2,
    avatar: "A",
  },
  {
    id: "shahar",
    name: "Shahar",
    lastMessage: "See you tomorrow at the office",
    time: "9:15 AM",
    unread: 0,
    avatar: "S",
  },
  {
    id: "rami",
    name: "Rami",
    lastMessage: "Thanks for the update!",
    time: "Yesterday",
    unread: 0,
    avatar: "R",
  },
  {
    id: "office",
    name: "Office",
    lastMessage: "Meeting at 3pm confirmed",
    time: "Yesterday",
    unread: 1,
    avatar: "O",
  },
]

const initialMessages: Record<string, Message[]> = {
  "ai-saban": [
    {
      id: "1",
      text: "Hey Ai-Saban! Can you help me with a project?",
      sender: "user",
      time: "10:28 AM",
      status: "read",
    },
    {
      id: "2",
      text: "Of course! I'd be happy to help. What kind of project are you working on?",
      sender: "ai",
      time: "10:28 AM",
    },
    {
      id: "3",
      text: "I need to build a modern web application with a clean dark UI. Something like WhatsApp Web.",
      sender: "user",
      time: "10:30 AM",
      status: "read",
    },
    {
      id: "4",
      text: "That's a great idea! A WhatsApp Web clone is a perfect way to practice building real-time chat interfaces. I can guide you through the whole process - from the layout structure to the messaging functionality. Want to start with the sidebar or the chat area?",
      sender: "ai",
      time: "10:31 AM",
    },
    {
      id: "5",
      text: "Let's start with the full layout and go from there.",
      sender: "user",
      time: "10:32 AM",
      status: "read",
    },
    {
      id: "6",
      text: "Sure, I can help you with that! We'll use a flex layout with a fixed sidebar on the left and the main chat area taking up the remaining space. The dark theme will use deep greys and greens - very authentic WhatsApp vibes.",
      sender: "ai",
      time: "10:32 AM",
    },
  ],
  shahar: [
    {
      id: "1",
      text: "Hey Shahar! Are we still meeting tomorrow?",
      sender: "user",
      time: "9:10 AM",
      status: "read",
    },
    {
      id: "2",
      text: "Yes! I'll be at the office around 10am.",
      sender: "ai",
      time: "9:12 AM",
    },
    {
      id: "3",
      text: "Perfect, see you then!",
      sender: "user",
      time: "9:14 AM",
      status: "read",
    },
    {
      id: "4",
      text: "See you tomorrow at the office",
      sender: "ai",
      time: "9:15 AM",
    },
  ],
  rami: [
    {
      id: "1",
      text: "Rami, I've pushed the latest changes to the repo.",
      sender: "user",
      time: "8:45 AM",
      status: "read",
    },
    {
      id: "2",
      text: "Thanks for the update! I'll review the PR this afternoon.",
      sender: "ai",
      time: "8:50 AM",
    },
  ],
  office: [
    {
      id: "1",
      text: "Team, can we schedule a sync meeting today?",
      sender: "ai",
      time: "2:30 PM",
    },
    {
      id: "2",
      text: "Sure, 3pm works for me.",
      sender: "user",
      time: "2:35 PM",
      status: "read",
    },
    {
      id: "3",
      text: "Meeting at 3pm confirmed",
      sender: "ai",
      time: "2:36 PM",
    },
  ],
}

export default function WhatsAppPage() {
  const [activeChat, setActiveChat] = useState("ai-saban")
  const [allMessages, setAllMessages] = useState(initialMessages)

  const currentContact = contacts.find((c) => c.id === activeChat)
  const messages = allMessages[activeChat] || []

  const handleSendMessage = useCallback(
    (text: string) => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })

      const newMessage: Message = {
        id: `user-${Date.now()}`,
        text,
        sender: "user",
        time: timeStr,
        status: "delivered",
      }

      setAllMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), newMessage],
      }))

      // Simulate AI reply
      setTimeout(() => {
        const replies = [
          "That's interesting! Tell me more about it.",
          "I see what you mean. Let me think about that.",
          "Great point! Here's what I think we should do next...",
          "Got it. I'll work on that right away.",
          "Thanks for sharing! That's really helpful.",
          "Absolutely! I'm on the same page.",
        ]
        const reply: Message = {
          id: `ai-${Date.now()}`,
          text: replies[Math.floor(Math.random() * replies.length)],
          sender: "ai",
          time: timeStr,
        }
        setAllMessages((prev) => ({
          ...prev,
          [activeChat]: [...(prev[activeChat] || []), reply],
        }))
      }, 1200)
    },
    [activeChat]
  )

  return (
    <main className="flex h-dvh w-full bg-[var(--wa-chat-bg)]">
      {/* Sidebar */}
      <div className="hidden w-[420px] shrink-0 md:flex">
        <ChatSidebar
          contacts={contacts}
          activeChat={activeChat}
          onSelectChat={setActiveChat}
        />
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <ChatHeader
          name={currentContact?.name || "Chat"}
          status="Online"
          avatar={currentContact?.avatar || "?"}
        />
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </main>
  )
}
