"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (isSignUp) {
      // Signup
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.name, email: form.email, password: form.password })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Konto opprettet! Du kan nå logge inn.");
        setIsSignUp(false);
      } else {
        setError(data.message || "Noe gikk galt");
      }
    } else {
      // Login
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Innlogging vellykket!");
        // TODO: Save userId/token in localStorage or context
      } else {
        setError(data.message || "Feil e-post eller passord");
      }
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
                name="name"
                placeholder="Fullt Navn"
                value={form.name}
                onChange={handleChange}
                required
              />
            )}

            <Input
              type="email"
              name="email"
              placeholder="E-post"
              value={form.email}
              onChange={handleChange}
              required
            />

            <Input
              type="password"
              name="password"
              placeholder="Passord"
              value={form.password}
              onChange={handleChange}
              required
            />

            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center">{success}</div>}

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
