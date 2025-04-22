"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { UserButton } from '@clerk/nextjs'
import type { TaskItem } from "./tasks-list"
import { Button } from "./ui/button"
import { PlusCircle } from "lucide-react"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  tasks: TaskItem[]
}

export function AppSidebar({ tasks, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const sidebar = useSidebar()

  return (
    <div 
    >
      <Sidebar {...props}>
        <SidebarHeader className="px-6 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className={`text-xl font-bold transition-opacity ${!sidebar.open ? 'opacity-0' : 'opacity-100'}`}>
              Polish Prep
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="flex flex-col justify-between h-full">
          <div>
            <SidebarGroup>
              <SidebarGroupLabel>Tasks</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Button variant={'default'} asChild>
                        <Link href="/" className="text-center"><PlusCircle /> New Task</Link>
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {tasks.map((task) => (
                    <SidebarMenuItem key={task.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === task.url}
                      >
                        <Link href={task.url}>{task.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
          <div className="px-6 py-4 mt-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </div>
  )
}
