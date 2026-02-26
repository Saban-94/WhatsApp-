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
    lastMessage: "משלוח #4821 בלוח הזמנים.",
    time: "10:32 AM",
    unread: 2,
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
    unread: 3,
    avatar: "R",
    role: "סדרן עבודה",
  },
  {
    id: "office",
    name: "הזמנות משרד",
    lastMessage: "3 הזמנות חדשות ממתינות לאישור",
    time: "אתמול",
    unread: 5,
    avatar: "O",
    role: "ערוץ הזמנות",
  },
]

const initialMessages: Record<string, Message[]> = {
  "ai-saban": [
    {
      id: "1",
      text: "בוקר טוב! אפשר לקבל עדכון סטטוס על המשלוחים של היום?",
      sender: "user",
      time: "10:20 AM",
      status: "read",
    },
    {
      id: "2",
      text: "בוקר טוב! הנה הסקירה להיום:\n\n• משלוח #4819 – נמסר ב-08:45\n• משלוח #4820 – בדרך, זמן הגעה משוער 13:00\n• משלוח #4821 – הועמס, יוצא ב-11:00\n• משלוח #4822 – ממתין לאישור איסוף\n\nכל המסלולים פנויים. לא דווחו עיכובים.",
      sender: "ai",
      time: "10:20 AM",
    },
    {
      id: "3",
      text: "מעולה. מה לגבי משאית 12? רמי הזכיר בעיה אתמול.",
      sender: "user",
      time: "10:25 AM",
      status: "read",
    },
    {
      id: "4",
      text: "משאית 12 קיבלה התראת בדיקת בלמים אתמול. היא טופלה במהלך הלילה ועברה את כל הבדיקות הבוקר. כרגע משויכת למשלוח #4821 ומוכנה לנסיעה.",
      sender: "ai",
      time: "10:26 AM",
    },
    {
      id: "5",
      text: "מצוין. אפשר להודיע ללקוח של #4821 שאנחנו בלוח הזמנים?",
      sender: "user",
      time: "10:30 AM",
      status: "read",
    },
    {
      id: "6",
      text: "משלוח #4821 בלוח הזמנים. שלחתי הודעת זמן הגעה אוטומטית ללקוח. הם יקבלו חלון מסירה של 14:00–15:00. אשלח גם קישור למעקב חי ברגע שהמשאית תצא.",
      sender: "ai",
      time: "10:32 AM",
    },
  ],
  shahar: [
    {
      id: "1",
      text: "שחר, סגרת את תוכנית המסלול לנסיעה לחיפה מחר?",
      sender: "user",
      time: "9:00 AM",
      status: "read",
    },
    {
      id: "2",
      text: "כן! מסלול ב' דרך כביש 6 הוא האופציה המהירה ביותר. לקחתי בחשבון את העבודות ליד נתניה. זמן הגעה משוער שעתיים וחצי.",
      sender: "ai",
      time: "9:05 AM",
    },
    {
      id: "3",
      text: "החלטה טובה. תשייך את משאיות 3 ו-8 למסלול הזה.",
      sender: "user",
      time: "9:10 AM",
      status: "read",
    },
    {
      id: "4",
      text: "בוצע. שתי המשאיות שויכו והנהגים קיבלו הודעה. מסלול ב' אושר למחר.",
      sender: "ai",
      time: "9:15 AM",
    },
  ],
  rami: [
    {
      id: "1",
      text: "רמי, איפה משאית 7 כרגע?",
      sender: "user",
      time: "8:40 AM",
      status: "read",
    },
    {
      id: "2",
      text: "משאית 7 בדיוק עברה את מחסום אשדוד. הנהג אישר שכל המטען מאובטח. אמור להגיע לטרמינל בנמל בעוד כ-20 דקות.",
      sender: "ai",
      time: "8:42 AM",
    },
    {
      id: "3",
      text: "תגיד לנהג לעלות מולנו בקשר כשהוא מגיע לשער 4.",
      sender: "user",
      time: "8:45 AM",
      status: "read",
    },
    {
      id: "4",
      text: "משאית 7 עברה מחסום. הנהג אישר – יצור קשר בשער 4 עם ההגעה.",
      sender: "ai",
      time: "8:50 AM",
    },
  ],
  office: [
    {
      id: "1",
      text: "קיבלנו הבוקר 3 הזמנות שילוח חדשות ממחסן באר שבע.",
      sender: "ai",
      time: "4:10 PM",
    },
    {
      id: "2",
      text: "מה סוג המטען והעדיפות?",
      sender: "user",
      time: "4:15 PM",
      status: "read",
    },
    {
      id: "3",
      text: "הזמנה #901 – אלקטרוניקה, עדיפות גבוהה\nהזמנה #902 – חומרי בניין, רגיל\nהזמנה #903 – סחורה בקירור, דחוף\n\nשלושתן ממתינות לאישור שלך לתזמון.",
      sender: "ai",
      time: "4:18 PM",
    },
    {
      id: "4",
      text: "תאשר את #901 ו-#903 מיד. את #902 תשמור לסבב של מחר.",
      sender: "user",
      time: "4:20 PM",
      status: "delivered",
    },
    {
      id: "5",
      text: "3 הזמנות ממתינות לאישור. #901 ו-#903 אושרו ונכנסו לתור לשיגור. #902 בהמתנה למחר.",
      sender: "ai",
      time: "4:22 PM",
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

  async function callAssistantAPI(userText: string): Promise<string> {
    const res = await fetch("/shahar/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json()
    return data.reply || data.message || data.text || "ההודעה התקבלה."
  }

  useEffect(() => {
    if (hasSentGreeting.current) return
    hasSentGreeting.current = true

    async function sendGreeting() {
      setIsThinking(true)
      try {
        const reply = await callAssistantAPI("__INIT_GREETING__")
        const greetingMessage: Message = {
          id: `ai-greeting-${Date.now()}`,
          text: reply,
          sender: "ai",
          time: getTimeStr(),
        }
        setAllMessages((prev) => ({
          ...prev,
          "ai-saban": [...(prev["ai-saban"] || []), greetingMessage],
        }))
      } catch {
        const fallback: Message = {
          id: `ai-greeting-fallback-${Date.now()}`,
          text: "ברוכים הבאים ל-ח. סבן לוגיסטיקה. אני עוזר ה-AI שלכם — מוכן לעזור במעקב משלוחים, שיגור, תכנון מסלולים ועוד. איך אוכל לעזור היום?",
          sender: "ai",
          time: getTimeStr(),
        }
        setAllMessages((prev) => ({
          ...prev,
          "ai-saban": [...(prev["ai-saban"] || []), fallback],
        }))
      } finally {
        setIsThinking(false)
      }
    }

    sendGreeting()
  }, [])

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
        const reply = await callAssistantAPI(text)
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
      } catch {
        const errorMessage: Message = {
          id: `ai-error-${Date.now()}`,
          text: "אני מתקשה להתחבר כרגע. אנא נסה שנית בעוד רגע.",
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
    [activeChat]
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
          status="מחובר"
          avatar={currentContact?.avatar || "?"}
          onToggleSidebar={() => setSidebarOpen(true)}
        />
        <MessageList messages={messages} isThinking={isThinking} />
        <MessageInput onSendMessage={handleSendMessage} disabled={isThinking} />
      </div>
    </main>
  )
}
