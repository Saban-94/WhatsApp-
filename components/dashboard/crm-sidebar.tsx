"use client"

import { cn } from "@/lib/utils"
import {
  Brain,
  Activity,
  MessageSquare,
  Settings,
  ChevronRight,
  Truck,
} from "lucide-react"
import { motion } from "motion/react"

export type CrmView = "training" | "monitoring"

interface CrmSidebarProps {
  activeView: CrmView
  onViewChange: (view: CrmView) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

const navItems: { id: CrmView; label: string; labelHe: string; icon: React.ElementType; description: string }[] = [
  {
    id: "training",
    label: "AI Training & Script",
    labelHe: "\u05D0\u05D9\u05DE\u05D5\u05DF AI \u05D5\u05E1\u05E7\u05E8\u05D9\u05E4\u05D8",
    icon: Brain,
    description: "The Brain",
  },
  {
    id: "monitoring",
    label: "Real-time Monitoring",
    labelHe: "\u05E0\u05D9\u05D8\u05D5\u05E8 \u05D1\u05D6\u05DE\u05DF \u05D0\u05DE\u05EA",
    icon: Activity,
    description: "The Dashboard",
  },
]

export function CrmSidebar({
  activeView,
  onViewChange,
  collapsed = false,
  onToggleCollapse,
}: CrmSidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 280 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="flex h-full flex-col border-l border-border bg-card overflow-hidden"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Truck className="h-5 w-5 text-primary" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col overflow-hidden"
          >
            <span className="text-sm font-semibold text-foreground truncate">
              Saban Logistics
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {"\u05DE\u05E8\u05DB\u05D6 \u05D1\u05E7\u05E8\u05D4 AI"}
            </span>
          </motion.div>
        )}
        <button
          onClick={onToggleCollapse}
          className="mr-auto flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              !collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = activeView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "relative flex w-full items-center gap-3 rounded-lg px-3 py-3 text-right transition-all duration-150",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="crm-nav-indicator"
                  className="absolute inset-0 rounded-lg bg-primary/10 crm-glow-sm"
                  transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                />
              )}
              <item.icon className={cn("h-5 w-5 shrink-0 relative z-10", isActive && "text-primary")} />
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col overflow-hidden relative z-10"
                >
                  <span className="text-sm font-medium truncate">{item.labelHe}</span>
                  <span className="text-[11px] text-muted-foreground truncate">{item.description}</span>
                </motion.div>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border px-3 py-3 space-y-1">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <MessageSquare className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="text-sm truncate">{"\u05E6\u05F2\u05D8 \u05D7\u05D6\u05E8\u05D4 \u05DC\u05E6\u05F2\u05D8"}</span>}
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <Settings className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="text-sm truncate">{"\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA"}</span>}
        </button>
      </div>
    </motion.aside>
  )
}
