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
    name: "Ai-\u05D7.\u05E1\u05D1\u05DF",
    lastMessage: "Shipment #4821 is on schedule.",
    time: "10:32 AM",
    unread: 2,
    avatar: "\u05D7",
    role: "AI Assistant",
  },
  {
    id: "shahar",
    name: "Shahar",
    lastMessage: "Route B confirmed for tomorrow",
    time: "9:15 AM",
    unread: 0,
    avatar: "S",
    role: "Fleet Manager",
  },
  {
    id: "rami",
    name: "Rami - Dispatcher",
    lastMessage: "Truck 7 cleared checkpoint",
    time: "8:50 AM",
    unread: 3,
    avatar: "R",
    role: "Dispatcher",
  },
  {
    id: "office",
    name: "Office Orders",
    lastMessage: "3 new orders pending approval",
    time: "Yesterday",
    unread: 5,
    avatar: "O",
    role: "Orders Channel",
  },
]

const initialMessages: Record<string, Message[]> = {
  "ai-saban": [
    {
      id: "1",
      text: "Good morning! Can you give me a status update on today\u2019s shipments?",
      sender: "user",
      time: "10:20 AM",
      status: "read",
    },
    {
      id: "2",
      text: "Good morning! Here\u2019s the overview for today:\n\n\u2022 Shipment #4819 \u2013 Delivered at 08:45\n\u2022 Shipment #4820 \u2013 In transit, ETA 13:00\n\u2022 Shipment #4821 \u2013 Loaded, departing at 11:00\n\u2022 Shipment #4822 \u2013 Awaiting pickup confirmation\n\nAll routes are clear. No delays reported.",
      sender: "ai",
      time: "10:20 AM",
    },
    {
      id: "3",
      text: "Great. What about Truck 12? Rami mentioned an issue yesterday.",
      sender: "user",
      time: "10:25 AM",
      status: "read",
    },
    {
      id: "4",
      text: "Truck 12 had a minor brake inspection flag yesterday. It was serviced overnight and passed all checks this morning. Currently assigned to Shipment #4821 and is road-ready.",
      sender: "ai",
      time: "10:26 AM",
    },
    {
      id: "5",
      text: "Perfect. Can you notify the client for #4821 that we\u2019re on schedule?",
      sender: "user",
      time: "10:30 AM",
      status: "read",
    },
    {
      id: "6",
      text: "Shipment #4821 is on schedule. I\u2019ve sent an automated ETA notification to the client. They\u2019ll receive a delivery window of 14:00\u201315:00. I\u2019ll also send a live tracking link once the truck departs.",
      sender: "ai",
      time: "10:32 AM",
    },
  ],
  shahar: [
    {
      id: "1",
      text: "Shahar, did you finalize the route plan for tomorrow\u2019s Haifa run?",
      sender: "user",
      time: "9:00 AM",
      status: "read",
    },
    {
      id: "2",
      text: "Yes! Route B via Highway 6 is the fastest option. I\u2019ve accounted for the construction near Netanya. ETA should be 2.5 hours.",
      sender: "ai",
      time: "9:05 AM",
    },
    {
      id: "3",
      text: "Good call. Assign Trucks 3 and 8 to that route.",
      sender: "user",
      time: "9:10 AM",
      status: "read",
    },
    {
      id: "4",
      text: "Done. Both trucks are assigned and drivers have been notified. Route B confirmed for tomorrow.",
      sender: "ai",
      time: "9:15 AM",
    },
  ],
  rami: [
    {
      id: "1",
      text: "Rami, where\u2019s Truck 7 right now?",
      sender: "user",
      time: "8:40 AM",
      status: "read",
    },
    {
      id: "2",
      text: "Truck 7 just passed the Ashdod checkpoint. Driver confirmed all cargo is secure. Should arrive at the port terminal in about 20 minutes.",
      sender: "ai",
      time: "8:42 AM",
    },
    {
      id: "3",
      text: "Tell the driver to radio in when he arrives at Gate 4.",
      sender: "user",
      time: "8:45 AM",
      status: "read",
    },
    {
      id: "4",
      text: "Truck 7 cleared checkpoint. Driver confirmed \u2013 will radio at Gate 4 upon arrival.",
      sender: "ai",
      time: "8:50 AM",
    },
  ],
  office: [
    {
      id: "1",
      text: "We received 3 new shipping orders this morning from the Be\u2019er Sheva depot.",
      sender: "ai",
      time: "4:10 PM",
    },
    {
      id: "2",
      text: "What\u2019s the cargo type and priority?",
      sender: "user",
      time: "4:15 PM",
      status: "read",
    },
    {
      id: "3",
      text: "Order #901 \u2013 Electronics, High Priority\nOrder #902 \u2013 Construction materials, Standard\nOrder #903 \u2013 Refrigerated goods, Urgent\n\nAll three are pending your approval for scheduling.",
      sender: "ai",
      time: "4:18 PM",
    },
    {
      id: "4",
      text: "Approve #901 and #903 immediately. Hold #902 for tomorrow\u2019s batch.",
      sender: "user",
      time: "4:20 PM",
      status: "delivered",
    },
    {
      id: "5",
      text: "3 new orders pending approval. #901 and #903 are approved and queued for dispatch. #902 is on hold for tomorrow.",
      sender: "ai",
      time: "4:22 PM",
    },
  ],
}

export default function WhatsAppPage() {
  const [activeChat, setActiveChat] = useState("ai-saban")
  const [allMessages, setAllMessages] = useState(initialMessages)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        const replyMap: Record<string, string[]> = {
          "ai-saban": [
            "I\u2019ve updated the logistics dashboard. All metrics are green.",
            "Checking the fleet tracker now\u2026 I\u2019ll have details in a moment.",
            "Roger that. I\u2019ll coordinate with the dispatch team on this.",
            "The shipment manifest has been updated accordingly.",
            "I\u2019ve flagged this for priority handling. The ops team is notified.",
          ],
          shahar: [
            "Route optimization complete. Fuel cost reduced by 12%.",
            "I\u2019ll update the fleet schedule right away.",
            "Driver availability confirmed for the requested time slot.",
            "Noted. I\u2019ll prepare the route brief for the morning huddle.",
          ],
          rami: [
            "Copy that. Dispatching the update to the driver now.",
            "GPS shows the truck is 15 minutes from destination.",
            "I\u2019ve logged the checkpoint clearance in the system.",
            "All trucks are accounted for. No issues at the moment.",
          ],
          office: [
            "New order logged. Awaiting warehouse confirmation.",
            "I\u2019ve processed the approvals. Dispatch is scheduled.",
            "The inventory check is complete. Stock levels are sufficient.",
            "Order priority has been updated in the system.",
          ],
        }
        const replies = replyMap[activeChat] || replyMap["ai-saban"]
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
      <ChatSidebar
        contacts={contacts}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Chat Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <ChatHeader
          name={currentContact?.name || "Chat"}
          status="Online"
          avatar={currentContact?.avatar || "?"}
          onToggleSidebar={() => setSidebarOpen(true)}
        />
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </main>
  )
}
