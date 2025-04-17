"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"

// Only include monologues in navigation
const navItems = [{ name: "Monologues", href: "/monologues" }]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const NavItems = () => (
    <>
      <div className="px-3 py-2">
        <h2 className="mb-6 px-4 text-2xl font-medium tracking-tight">Polish Prep</h2>
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-xl",
                  pathname.startsWith(item.href) && "bg-green-100 text-black",
                )}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="absolute left-4 top-4">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <NavItems />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden border-r bg-background md:block w-64">
        <div className="space-y-4 py-8">
          <NavItems />
        </div>
      </div>
    </>
  )
}
