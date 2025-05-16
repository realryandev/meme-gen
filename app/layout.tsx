import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Random Meme Generator",
  description: "Generate random memes from Reddit with a single click",
  metadataBase: new URL("https://meme-generator.vercel.app"),
  openGraph: {
    title: "Random Meme Generator",
    description: "Generate random memes from Reddit with a single click",
    url: "https://meme-generator.vercel.app",
    siteName: "Random Meme Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Meme Generator",
    description: "Generate random memes from Reddit with a single click",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: "https://meme-generator.vercel.app",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="font-sf-pro min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
