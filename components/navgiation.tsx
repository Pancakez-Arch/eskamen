"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth, useUser, SignInButton, UserButton } from "@clerk/nextjs"
import { Menu, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { isSignedIn } = useAuth()
  const { user } = useUser()

  const navItems = [
    { href: "/", label: "Hjem" },
    { href: "/team", label: "Vårt Team" },
    { href: "/sessions", label: "Treningsøkter" },
  ]

  // Add "Mine Bookinger" for signed-in users
  const userNavItems = isSignedIn ? [...navItems, { href: "/my-bookings", label: "Mine Bookinger" }] : navItems

  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Dumbbell className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-blue-700">Treningsglede AS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {userNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive(item.href) ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isSignedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Hei, {user?.firstName}!</span>
              <UserButton afterSignOutUrl="/" />
              <Link href="/sessions">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Book økt
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Logg inn
                </Button>
              </SignInButton>
              <Link href="/sessions">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Book økt
                </Button>
              </Link>
            </div>
          )}
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
              {userNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-blue-600 ${
                    isActive(item.href) ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                {isSignedIn ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2">
                      <UserButton afterSignOutUrl="/" />
                      <span className="text-sm">Hei, {user?.firstName}!</span>
                    </div>
                    <Link href="/sessions" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Book økt</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full">
                        Logg inn
                      </Button>
                    </SignInButton>
                    <Link href="/sessions" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Book økt</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
