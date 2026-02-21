"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Navigation,
  ExternalLink,
  Search,
  Brain,
  Database,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react"

// --- Address Detection with Waze Link ---
export function AddressDetector() {
  const [address, setAddress] = useState("")
  const [detectedLinks, setDetectedLinks] = useState<
    { address: string; wazeUrl: string; lat: number; lng: number }[]
  >([])
  const [loading, setLoading] = useState(false)

  const detectAndGeocode = async () => {
    if (!address.trim()) return
    setLoading(true)

    // Simulate geocoding lookup. In production this hits Google Maps Geocoding API.
    await new Promise((r) => setTimeout(r, 800))

    // Simple address pattern detection: any Hebrew or Latin text with a number
    const addressText = address.trim()

    // Mock geocode results for known addresses
    const mockGeocode: Record<string, { lat: number; lng: number }> = {
      "\u05D5\u05D9\u05E6\u05DE\u05DF 10 \u05E8\u05E2\u05E0\u05E0\u05D4": { lat: 32.1847, lng: 34.8714 },
      "\u05D3\u05E8\u05DA \u05D4\u05E9\u05DC\u05D5\u05DD 50 \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1": { lat: 32.0853, lng: 34.7818 },
      "\u05D4\u05E8\u05E6\u05DC 1 \u05D7\u05D9\u05E4\u05D4": { lat: 32.7940, lng: 34.9896 },
      "weizman 10 raanana": { lat: 32.1847, lng: 34.8714 },
    }

    // Find a matching address or generate a plausible coordinate
    const normalizedInput = addressText.toLowerCase()
    let coords = mockGeocode[addressText] || mockGeocode[normalizedInput]
    if (!coords) {
      // Default to a Tel Aviv-area coordinate if address is unknown
      coords = {
        lat: 32.0853 + (Math.random() - 0.5) * 0.02,
        lng: 34.7818 + (Math.random() - 0.5) * 0.02,
      }
    }

    const wazeUrl = `https://waze.com/ul?ll=${coords.lat},${coords.lng}&navigate=yes`

    setDetectedLinks((prev) => [
      { address: addressText, wazeUrl, lat: coords.lat, lng: coords.lng },
      ...prev,
    ])
    setAddress("")
    setLoading(false)
  }

  return (
    <div className="crm-card overflow-hidden" dir="rtl">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
          <MapPin className="h-4 w-4 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{"\u05D6\u05D9\u05D4\u05D5\u05D9 \u05DB\u05EA\u05D5\u05D1\u05D5\u05EA"}</h3>
          <p className="text-xs text-muted-foreground">Address Detection + Waze Navigation</p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={"\u05D4\u05DB\u05E0\u05E1 \u05DB\u05EA\u05D5\u05D1\u05EA, \u05DC\u05DE\u05E9\u05DC: \u05D5\u05D9\u05E6\u05DE\u05DF 10, \u05E8\u05E2\u05E0\u05E0\u05D4"}
            className="bg-muted/50 border-border text-sm"
            onKeyDown={(e) => e.key === "Enter" && detectAndGeocode()}
          />
          <Button
            size="sm"
            className="shrink-0 gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={detectAndGeocode}
            disabled={loading || !address.trim()}
          >
            {loading ? (
              <Search className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Navigation className="h-3.5 w-3.5" />
            )}
            {"\u05D0\u05EA\u05E8"}
          </Button>
        </div>

        <AnimatePresence>
          {detectedLinks.map((link, idx) => (
            <motion.div
              key={`${link.address}-${idx}`}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="rounded-lg border border-border bg-muted/30 p-3 overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 min-w-0">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{link.address}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                      {link.lat.toFixed(4)}, {link.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
                <a
                  href={link.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary/10">
                    <ExternalLink className="h-3 w-3" />
                    Waze
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {detectedLinks.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-2">
            {"\u05D4\u05DB\u05E0\u05E1 \u05DB\u05EA\u05D5\u05D1\u05EA \u05DB\u05D3\u05D9 \u05DC\u05D9\u05E6\u05D5\u05E8 \u05E7\u05D9\u05E9\u05D5\u05E8 \u05E0\u05D9\u05D5\u05D5\u05D8 Waze"}
          </p>
        )}
      </div>
    </div>
  )
}

// --- Memory Retrieval Toggle ---
export function MemoryRetrievalToggle() {
  const [memoryEnabled, setMemoryEnabled] = useState(true)
  const [geminiFallback, setGeminiFallback] = useState(true)
  const [testQuery, setTestQuery] = useState("")
  const [testResult, setTestResult] = useState<{
    source: "database" | "gemini" | null
    answer: string
  } | null>(null)
  const [testing, setTesting] = useState(false)

  const handleTest = async () => {
    if (!testQuery.trim()) return
    setTesting(true)
    setTestResult(null)
    await new Promise((r) => setTimeout(r, 1000))

    // Simulate: first check database, then fallback to Gemini
    const dbKnowledge: Record<string, string> = {
      "\u05DE\u05E9\u05DC\u05D5\u05D7 1042": "\u05DE\u05E9\u05DC\u05D5\u05D7 1042 \u05D1\u05DE\u05D7\u05E1\u05DF B2, \u05E6\u05E4\u05D5\u05D9 \u05DC\u05D4\u05D2\u05D9\u05E2 \u05D1-16:00",
      "\u05E0\u05D4\u05D2 \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1": "\u05D3\u05E8\u05DA \u05D4\u05E9\u05DC\u05D5\u05DD 50, \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1 - \u05DE\u05E1\u05DC\u05D5\u05DC \u05DE\u05D5\u05DE\u05DC\u05E5 \u05D3\u05E8\u05DA 4",
    }

    const query = testQuery.trim()
    let found = false
    if (memoryEnabled) {
      for (const [key, value] of Object.entries(dbKnowledge)) {
        if (query.includes(key)) {
          setTestResult({ source: "database", answer: value })
          found = true
          break
        }
      }
    }

    if (!found && geminiFallback) {
      setTestResult({
        source: "gemini",
        answer: `\u05D2\u05F2\u05DE\u05D9\u05E0\u05D9 \u05D7\u05D9\u05E4\u05E9 \u05D5\u05DE\u05E6\u05D0: \u05D4\u05EA\u05E9\u05D5\u05D1\u05D4 \u05DC\u05E9\u05D0\u05D9\u05DC\u05EA\u05DA "\u05D4\u05DE\u05D9\u05D3\u05E2 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0 \u05D1\u05DE\u05D0\u05D2\u05E8 \u05D4\u05DE\u05E7\u05D5\u05DE\u05D9. \u05D4\u05D5\u05E4\u05E0\u05D4 \u05DC\u05DE\u05D5\u05D3\u05DC \u05D4\u05E9\u05E4\u05D4 Gemini \u05DC\u05EA\u05E9\u05D5\u05D1\u05D4 \u05DB\u05DC\u05DC\u05D9\u05EA."`,
      })
    }

    if (!found && !geminiFallback) {
      setTestResult({
        source: null,
        answer: "\u05D4\u05DE\u05D9\u05D3\u05E2 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0. Gemini fallback \u05DB\u05D1\u05D5\u05D9.",
      })
    }

    setTesting(false)
  }

  return (
    <div className="crm-card overflow-hidden" dir="rtl">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
          <Brain className="h-4 w-4 text-purple-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{"\u05DC\u05D5\u05D2\u05D9\u05E7\u05EA \u05D6\u05D9\u05DB\u05E8\u05D5\u05DF"}</h3>
          <p className="text-xs text-muted-foreground">Memory Retrieval Logic</p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Toggle switches */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-medium text-foreground">{"\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D1\u05DE\u05D0\u05D2\u05E8 \u05DE\u05E7\u05D5\u05DE\u05D9"}</span>
          </div>
          <Switch checked={memoryEnabled} onCheckedChange={setMemoryEnabled} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-medium text-foreground">Gemini Fallback</span>
          </div>
          <Switch checked={geminiFallback} onCheckedChange={setGeminiFallback} />
        </div>

        <Separator />

        {/* Flow diagram */}
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground justify-center">
          <Badge variant="outline" className={`text-[10px] ${memoryEnabled ? "border-blue-500/30 text-blue-400" : "opacity-40"}`}>
            DB
          </Badge>
          <ArrowLeft className="h-3 w-3" />
          <span>{"\u05E9\u05D0\u05D9\u05DC\u05D4"}</span>
          <ArrowLeft className="h-3 w-3" />
          <Badge variant="outline" className={`text-[10px] ${geminiFallback ? "border-amber-500/30 text-amber-400" : "opacity-40"}`}>
            Gemini
          </Badge>
        </div>

        <Separator />

        {/* Test area */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">{"\u05D1\u05D3\u05D5\u05E7 \u05E9\u05D0\u05D9\u05DC\u05EA\u05D0"}</label>
          <div className="flex items-center gap-2">
            <Input
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              placeholder={"\u05DC\u05DE\u05E9\u05DC: \u05DE\u05E9\u05DC\u05D5\u05D7 1042"}
              className="bg-muted/50 border-border text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleTest()}
            />
            <Button
              size="sm"
              variant="outline"
              className="shrink-0 gap-1.5 text-xs"
              onClick={handleTest}
              disabled={testing || !testQuery.trim()}
            >
              <Search className="h-3.5 w-3.5" />
              {"\u05D1\u05D3\u05D5\u05E7"}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {testResult && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`rounded-lg border p-3 ${
                testResult.source === "database"
                  ? "border-blue-500/20 bg-blue-500/5"
                  : testResult.source === "gemini"
                    ? "border-amber-500/20 bg-amber-500/5"
                    : "border-destructive/20 bg-destructive/5"
              }`}
            >
              <div className="flex items-start gap-2">
                {testResult.source === "database" && (
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                )}
                {testResult.source === "gemini" && (
                  <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                )}
                {testResult.source === null && (
                  <AlertCircle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
                )}
                <div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] mb-1 ${
                      testResult.source === "database"
                        ? "border-blue-500/30 text-blue-400"
                        : testResult.source === "gemini"
                          ? "border-amber-500/30 text-amber-400"
                          : "border-destructive/30 text-destructive"
                    }`}
                  >
                    {testResult.source === "database"
                      ? "\u05DE\u05D0\u05D2\u05E8 \u05DE\u05E7\u05D5\u05DE\u05D9"
                      : testResult.source === "gemini"
                        ? "Gemini Fallback"
                        : "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0"}
                  </Badge>
                  <p className="text-xs text-foreground leading-relaxed">{testResult.answer}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
