import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TasksList } from "@/components/tasks-list"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Polish Exam Prep",
  description: "Prepare for Polish language exams with AI-generated content",
}

async function SidebarWithTasks() {
  const { taskItems } = await TasksList()
  return <AppSidebar tasks={taskItems} />
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // @ts-ignore
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SidebarProvider open={true}>
            <div className="flex min-h-screen w-full">
              <Suspense fallback={<AppSidebar tasks={[]} />}>
                {/* @ts-ignore */}
                <SidebarWithTasks />
              </Suspense>
              <main className="flex-1">{children}</main>
            </div>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
