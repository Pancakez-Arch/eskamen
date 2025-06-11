"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to backend for authentication
    if (isSignUp) {
      console.log("Handle signup")
    } else {
      console.log("Handle signin")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-4">
      <Card className="w-full max-w-md p-8">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
            {isSignUp ? "Opprett Konto" : "Logg Inn"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input
                type="text"
                placeholder="Fullt Navn"
                required
              />
            )}

            <Input
              type="email"
              placeholder="E-post"
              required
            />

            <Input
              type="password"
              placeholder="Passord"
              required
            />

            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
              {isSignUp ? "Opprett Konto" : "Logg Inn"}
            </Button>
          </form>

          <div className="text-center mt-4">
            {isSignUp ? (
              <p>
                Har du allerede en konto?{" "}
                <button onClick={() => setIsSignUp(false)} className="text-blue-600 hover:underline">
                  Logg Inn
                </button>
              </p>
            ) : (
              <p>
                Har du ikke en konto?{" "}
                <button onClick={() => setIsSignUp(true)} className="text-blue-600 hover:underline">
                  Opprett Konto
                </button>
              </p>
            )}
          </div>

          <div className="text-center mt-4">
            <Link href="/">
              <Button variant="outline" className="text-blue-600 hover:bg-blue-100 w-full">
                Tilbake til Hjem
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
