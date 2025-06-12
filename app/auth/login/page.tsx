"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Dumbbell } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login - in real app, this would authenticate with backend
    if (loginForm.email && loginForm.password) {
      alert("Innlogging vellykket! (Demo)")
      router.push("/sessions")
    } else {
      alert("Vennligst fyll ut alle feltene")
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (signupForm.password !== signupForm.confirmPassword) {
      alert("Passordene stemmer ikke overens")
      return
    }
    if (!signupForm.agreeToTerms) {
      alert("Du må godta vilkårene for å opprette konto")
      return
    }
    // Mock signup
    alert("Konto opprettet! (Demo)")
    router.push("/sessions")
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="container max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Dumbbell className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-primary-700">Treningsglede</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Velkommen tilbake!</h1>
            <p className="text-gray-600">Logg inn for å booke treningsøkter</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Logg inn</TabsTrigger>
              <TabsTrigger value="signup">Opprett konto</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Logg inn</CardTitle>
                  <CardDescription>Skriv inn din e-post og passord for å logge inn</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-post</Label>
                      <Input
                        id="email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        placeholder="din@epost.no"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Passord</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          placeholder="Ditt passord"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={loginForm.rememberMe}
                          onCheckedChange={(checked) => setLoginForm({ ...loginForm, rememberMe: checked as boolean })}
                        />
                        <Label htmlFor="remember" className="text-sm">
                          Husk meg
                        </Label>
                      </div>
                      <Link href="#" className="text-sm text-primary-600 hover:underline">
                        Glemt passord?
                      </Link>
                    </div>

                    <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700">
                      Logg inn
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Har du ikke konto?{" "}
                      <button
                        onClick={() => document.querySelector('[value="signup"]')?.click()}
                        className="text-primary-600 hover:underline font-medium"
                      >
                        Opprett konto her
                      </button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Opprett konto</CardTitle>
                  <CardDescription>Fyll ut informasjonen under for å opprette din konto</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Fornavn</Label>
                        <Input
                          id="firstName"
                          value={signupForm.firstName}
                          onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
                          placeholder="Fornavn"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Etternavn</Label>
                        <Input
                          id="lastName"
                          value={signupForm.lastName}
                          onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
                          placeholder="Etternavn"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">E-post</Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        placeholder="din@epost.no"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                        placeholder="+47 123 45 678"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Passord</Label>
                      <Input
                        id="signupPassword"
                        type="password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                        placeholder="Velg et sterkt passord"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Bekreft passord</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                        placeholder="Gjenta passordet"
                        required
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={signupForm.agreeToTerms}
                        onCheckedChange={(checked) =>
                          setSignupForm({ ...signupForm, agreeToTerms: checked as boolean })
                        }
                        required
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        Jeg godtar{" "}
                        <Link href="#" className="text-primary-600 hover:underline">
                          vilkårene
                        </Link>{" "}
                        og{" "}
                        <Link href="#" className="text-primary-600 hover:underline">
                          personvernreglene
                        </Link>
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700">
                      Opprett konto
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Har du allerede konto?{" "}
                      <button
                        onClick={() => document.querySelector('[value="login"]')?.click()}
                        className="text-primary-600 hover:underline font-medium"
                      >
                        Logg inn her
                      </button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Demo Notice */}
          <div className="mt-8 p-4 bg-primary-100 rounded-lg text-center">
            <p className="text-sm text-primary-700">
              <strong>Demo-modus:</strong> Dette er en demonstrasjon. Bruk hvilken som helst e-post og passord for å
              logge inn.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
