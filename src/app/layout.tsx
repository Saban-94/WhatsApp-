import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const viewport: Viewport = {
  themeColor: '#111b21',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Ai-ח.סבן | H. Saban Logistics',
  description: 'AI-Powered logistics assistant for H. Saban - Fleet management, dispatch, and shipment tracking',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // תיקון 1: שינוי ל-he והוספת dir="rtl"
    <html lang="he" dir="rtl" suppressHydrationWarning>
      {/* תיקון 2: חיבור הפונטים והגדרת ה-CSS של הווצאפ */}
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          // תיקון 3: לווצאפ עדיף light כברירת מחדל, או שתשאיר dark אם זה הסגנון שלך
          defaultTheme="light" 
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
