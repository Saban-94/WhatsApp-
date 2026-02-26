"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { ChatSidebar } from "@/components/whatsapp/chat-sidebar"
import { ChatHeader } from "@/components/whatsapp/chat-header"
import { MessageList } from "@/components/whatsapp/message-list"
import { MessageInput } from "@/components/whatsapp/message-input"
import type { Message } from "@/components/whatsapp/chat-bubble"

const contacts = [
  {
    id: "ai-saban",
    name: "Ai-ח.סבן",
    lastMessage: "מחובר למאגר הנתונים המרכזי",
    time: "10:32 AM",
    unread: 0,
    avatar: "ח",
    role: "עוזר AI",
  },
  {
    id: "shahar",
    name: "שחר",
    lastMessage: "מסלול ב' אושר למחר",
    time: "9:15 AM",
    unread: 0,
    avatar: "S",
    role: "מנהל צי רכב",
  },
  {
    id: "rami",
    name: "רמי - סדרן",
    lastMessage: "משאית 7 עברה את המחסום",
    time: "8:50 AM",
    unread: 0,
    avatar: "R",
    role: "סדרן עבודה",
  },
]

const initialMessages: Record<string, Message[]> = {
  "ai-saban": [
    {
      id: "init-1",
      text: "שלום! אני המוח הלוגיסטי של סבן הנדסה. אני מחובר למערכת המלאי וה-CRM המרכזית. איך אפשר לעזור?",
      sender: "ai",
      time: "10:00 AM",
    },
  ],
}

export default function WhatsAppPage() {
  const [activeChat, setActiveChat] = useState("ai-saban")
  const [allMessages, setAllMessages] = useState(initialMessages)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const hasSentGreeting = useRef(false)

  const currentContact = contacts.find((c) => c.id === activeChat)
  const messages = allMessages[activeChat] || []

  function getTimeStr() {
    return new Date().toLocaleTimeString("he-IL", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    })
  }

  // חיבור למאגר הראשי דרך ה-API המשותף
  async function callAssistantAPI(userText: string, history: any[]): Promise<string> {
    const res = await fetch("/api/chat", { // נתיב ה-API שמחובר ל-Supabase
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        message: userText,
        history: history,
        clientId: "שחר שאול" // או לשלוף דינמית לפי הצ'אט האקטיבי
      }),
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json()
    return data.reply || data.text || "ההודעה התקבלה."
  }

  const handleSendMessage = useCallback(
    async (text: string) => {
      const timeStr = getTimeStr()

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        text,
        sender: "user",
        time: timeStr,
        status: "delivered",
      }

      setAllMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), userMessage],
      }))

      setIsThinking(true)
      try {
        // הכנת היסטוריה קצרה עבור ה-AI
        const chatHistory = messages.slice(-5).map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }))

        const reply = await callAssistantAPI(text, chatHistory)
        
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          text: reply,
          sender: "ai",
          time: getTimeStr(),
        }

        setAllMessages((prev) => ({
          ...prev,
          [activeChat]: [...(prev[activeChat] || []), aiMessage],
        }))

        setAllMessages((prev) => ({
          ...prev,
          [activeChat]: (prev[activeChat] || []).map((m) =>
            m.id === userMessage.id ? { ...m, status: "read" as const } : m
          ),
        }))
      } catch (err) {
        const errorMessage: Message = {
          id: `ai-error-${Date.now()}`,
          text: "**שגיאת חיבור למאגר הראשי.** וודא ששרת Supabase זמין ומפתחות ה-API תקינים.",
          sender: "ai",
          time: getTimeStr(),
        }
        setAllMessages((prev) => ({
          ...prev,
          [activeChat]: [...(prev[activeChat] || []), errorMessage],
        }))
      } finally {
        setIsThinking(false)
      }
    },
    [activeChat, messages]
  )

  return (
    <main className="flex h-dvh w-full bg-[var(--wa-chat-bg)]" dir="rtl">
      <ChatSidebar
        contacts={contacts}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col min-w-0">
        <ChatHeader
          name={currentContact?.name || "צ'אט"}
          status="מחובר למאגר סבן"
          avatar={currentContact?.avatar || "?"}
          onToggleSidebar={() => setSidebarOpen(true)}
        />
        <MessageList messages={messages} isThinking={isThinking} />
        <MessageInput onSendMessage={handleSendMessage} disabled={isThinking} />
      </div>
    </main>
  )
}
