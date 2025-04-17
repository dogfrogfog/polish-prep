import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Polish Exam Prep",
  description: "Prepare for Polish language exams with AI-generated content",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <main className="flex min-h-screen w-full text-lg">{children}</main>
      </body>
    </html>
  )
}
