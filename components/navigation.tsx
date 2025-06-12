"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Dumbbell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Hjem" },
    { href: "/team", label: "Vårt Team" },
    { href: "/sessions", label: "Treningsøkter" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Dumbbell className="h-6 w-6 text-primary-600" />
          <span className="text-xl font-bold text-primary-700">Treningsglede AS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                isActive(item.href) ? "text-primary-600" : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Logg inn
            </Button>
          </Link>
          <Link href="/sessions">
            <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
              Book økt
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Åpne meny</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-primary-600 ${
                    isActive(item.href) ? "text-primary-600" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Logg inn
                  </Button>
                </Link>
                <Link href="/sessions" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-primary-600 hover:bg-primary-700">Book økt</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
