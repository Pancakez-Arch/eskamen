"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, Users, Star, TreePine, Home } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"

interface Session {
  id: number
  title: string
  instructor: string
  instructorRole: string
  type: "indoor" | "outdoor"
  date: string
  startTime: string
  endTime: string
  location: string
  maxParticipants: number
  currentParticipants: number
  difficulty: string
  description: string
  price: number
}

export default function SessionsPage() {
  const [selectedSession, setSelectedSession] = useState<(typeof sessions)[0] | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Mock login state
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

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

  const handleBooking = (session: Session) => {
    setSelectedSession(session)
  }

  const handleWaitlist = (session: (typeof sessions)[0]) => {
    if (!isLoggedIn) {
      alert("Vennligst logg inn for å bli med på ventelisten")
      return
    }

    // Simuler booking (i ekte app ville dette sendt til backend)
    alert(`Booking bekreftet for "${selectedSession.title}"!\n\nDetaljer:\nNavn: ${bookingForm.name}\nE-post: ${bookingForm.email}\nTelefon: ${bookingForm.phone}\n\nDu vil motta en bekreftelse på e-post.`)
    
    setSelectedSession(null)
    setBookingForm({ name: "", email: "", phone: "", notes: "" })
    
    // Oppdater deltakerantall lokalt
    setSessions(sessions.map(s => 
      s.id === selectedSession.id 
        ? { ...s, currentParticipants: s.currentParticipants + 1 }
        : s
    ))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const spotsLeft = (session: (typeof sessions)[0]) => {
    return session.maxParticipants - session.currentParticipants
  }

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5)
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
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Treningsøkter</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Utforsk vårt varierte utvalg av treningsøkter. Fra rolig yoga til intensiv HIIT - vi har noe for alle
            treningsnivåer og preferanser.
          </p>
          {!isLoggedIn && (
            <div className="bg-primary-700/50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-primary-100 mb-2">💡 Tips: Logg inn for å booke økter</p>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-700"
                onClick={() => setIsLoggedIn(true)}
              >
                Logg inn (Demo)
              </Button>
            </div>
          )}
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
                <Card key={session.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{session.title}</CardTitle>
                        <p className="text-sm text-gray-600">med {session.instructor}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {session.type === "outdoor" ? (
                          <TreePine className="h-5 w-5 text-green-600" />
                        ) : (
                          <Home className="h-5 w-5 text-blue-600" />
                        )}
                        <Badge className={getDifficultyColor(session.difficulty)}>{session.difficulty}</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{session.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{new Date(session.date).toLocaleDateString("no-NO")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>
                        {session.currentParticipants}/{session.maxParticipants} deltakere
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-lg font-bold text-primary-600">{session.price}</span>
                    <div className="space-x-2">
                      {spotsLeft(session) > 0 ? (
                        <>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {spotsLeft(session)} plasser igjen
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                className="bg-primary-600 hover:bg-primary-700"
                                onClick={() => handleBooking(session)}
                              >
                                Book nå
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Book {selectedSession?.title}</DialogTitle>
                                <DialogDescription>
                                  Fyll ut informasjonen under for å bekrefte din booking.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="name">Navn</Label>
                                  <Input
                                    id="name"
                                    value={bookingForm.name}
                                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                                    placeholder="Ditt fulle navn"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="email">E-post</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={bookingForm.email}
                                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                                    placeholder="din@epost.no"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="phone">Telefon</Label>
                                  <Input
                                    id="phone"
                                    value={bookingForm.phone}
                                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                                    placeholder="+47 123 45 678"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="notes">Kommentarer (valgfritt)</Label>
                                  <Textarea
                                    id="notes"
                                    value={bookingForm.notes}
                                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                                    placeholder="Spesielle behov eller kommentarer..."
                                  />
                                </div>
                                <Button onClick={submitBooking} className="w-full bg-primary-600 hover:bg-primary-700">
                                  Bekreft booking
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </>
                      ) : (
                        <>
                          <Badge variant="outline" className="text-red-600 border-red-600">
                            Fullt
                          </Badge>
                          <Button size="sm" variant="outline" onClick={() => handleWaitlist(session)}>
                            Venteliste
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Booking Informasjon</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Avbestilling</h3>
                <p className="text-gray-600 text-sm">Gratis avbestilling frem til 2 timer før øktstart</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Venteliste</h3>
                <p className="text-gray-600 text-sm">Automatisk varsling hvis det blir ledig plass</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Fleksibilitet</h3>
                <p className="text-gray-600 text-sm">Book enkeltøkter eller kjøp månedskort</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
