import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google' // שימוש ב-Inter במקום Geist ליתר ביטחון בבילד
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: '#111b21',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Ai-ח.סבן | H. Saban Logistics',
  description: 'AI-Powered logistics assistant',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.className} antialiased overflow-hidden`}>
        <ThemeProvider
          attribute="class"
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
