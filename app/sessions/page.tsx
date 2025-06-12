"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/navgiation"
import Footer from "@/components/footer"
import { Star, Users, Calendar } from 'lucide-react'
import SessionCard from "@/components/session-card"

interface Session {
  id: number;
  session_date: string;
  title: string;
  user_id: number;
  token: string;
  expires_at: string;
  created_at: string;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/sessions")
      if (response.ok) {
        const data = await response.json()
        setSessions(data)
      }
    } catch (error) {
      console.error("Error fetching sessions:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container py-20 text-center">
          <p>Laster treningsøkter...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Treningsøkter</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Utforsk vårt varierte utvalg av treningsøkter. Fra rolig yoga til intensiv HIIT - vi har noe for alle
            treningsnivåer og preferanser.
          </p>
          <div className="bg-blue-700/50 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-purple-300 mb-2">✨ Book direkte uten å opprette konto</p>
            <p className="text-sm text-blue-200">Enkelt og raskt - bare fyll ut dine kontaktopplysninger</p>
          </div>
        </div>
      </section>

      {/* Sessions Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Ingen treningsøkter tilgjengelig for øyeblikket.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <SessionCard key={session.id} title={session.title} date={session.session_date} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Booking Informasjon</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Enkel Booking</h3>
                <p className="text-gray-600 text-sm">Ingen konto nødvendig - book direkte med dine kontaktopplysninger</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Bekreftelse</h3>
                <p className="text-gray-600 text-sm">Du får bekreftelse på e-post umiddelbart etter booking</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Fleksibilitet</h3>
                <p className="text-gray-600 text-sm">Kontakt oss for endringer eller avbestillinger</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
