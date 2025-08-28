import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import Navbar from "@/components/Navbar"
import FooterSection from "@/components/Footer"

// ✅ Use the provider + transition overlay
import { TransitionProvider } from "@/components/TransitionProvider"
import PageTransition from "@/components/PageTransition" // (was SlackIntro)
import { SmoothCursor } from "@/components/ui/smooth-cursor"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "AICHE NITRKL",
  description: "Initiative by Aiche Nit Rourkela Chapter",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TransitionProvider>
          {/* The transition overlay will cover everything rendered inside */}
          <PageTransition  inDuration={700} outDuration={700} >
            <SmoothCursor/>
            <Navbar />
            <main>{children}</main>
            <FooterSection />
          </PageTransition>
        </TransitionProvider>
      </body>
    </html>
  )
}
