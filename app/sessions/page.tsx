"use client"

import { useState, useEffect } from "react"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, Users, Star, TreePine, Home } from 'lucide-react'
import Navigation from "@/components/navgiation"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"

interface Session {
  id: number | string;
  title: string;
  instructor: string;
  instructorRole: string;
  type: "indoor" | "outdoor";
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  lat?: number;
  lon?: number;
  maxParticipants: number;
  currentParticipants: number;
  difficulty: string;
  description: string;
  price: number;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [weather, setWeather] = useState<{ [id: string]: number }>({})

  useEffect(() => {
    fetchSessions();
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

  const handleWaitlist = async (session: Session) => {
    const name = prompt("Skriv inn ditt navn for ventelisten:")
    const email = prompt("Skriv inn din e-post:")
    
    if (name && email) {
      alert(`${name} er nå på ventelisten for "${session.title}". Vi sender deg en e-post til ${email} hvis det blir ledig plass.`)
    }
  }

  const submitBooking = async () => {
    if (!selectedSession) return

    // Validering
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      alert("Vennligst fyll ut alle obligatoriske felt")
      return
    }

    // Oppdater antall påmeldte i Firestore
    try {
      const response = await fetch(`/api/sessions/${selectedSession.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment: 1 })
      });
      if (response.ok) {
        alert(`Booking bekreftet for "${selectedSession.title}"!\n\nDetaljer:\nNavn: ${bookingForm.name}\nE-post: ${bookingForm.email}\nTelefon: ${bookingForm.phone}\n\nDu vil motta en bekreftelse på e-post.`)
        fetchSessions(); // Oppdater listen
      } else {
        alert("Kunne ikke oppdatere booking. Prøv igjen senere.");
      }
    } catch (error) {
      alert("Noe gikk galt. Prøv igjen senere.");
    }
    setSelectedSession(null)
    setBookingForm({ name: "", email: "", phone: "", notes: "" })
  }

  const getDifficultyColor = (difficulty: string | undefined) => {
    if (!difficulty) return "bg-blue-100 text-blue-800";
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

  const spotsLeft = (session: Session) => {
    return session.maxParticipants - session.currentParticipants
  }

  const formatTime = (timeString: string | { seconds: number } | undefined) => {
    if (!timeString) return "";
    if (typeof timeString === "object" && 'seconds' in timeString) {
      // Firestore timestamp
      return new Date(timeString.seconds * 1000).toLocaleTimeString("no-NO", { hour: "2-digit", minute: "2-digit" });
    }
    if (typeof timeString === "string") {
      return timeString.slice(0, 5);
    }
    return "";
  }

  // Hjelpefunksjon for å hente vær fra Yr.no (Oslo som eksempel)
  async function fetchWeather(lat: number, lon: number) {
    const res = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
      {
        headers: {
          'User-Agent': 'treningsglede-frontend/1.0 github.com/dinbruker',
        },
      }
    );
    const data = await res.json();
    const temp = data.properties.timeseries[0].data.instant.details.air_temperature;
    return temp;
  }

  useEffect(() => {
    sessions.forEach(async (session) => {
      if (session.type === "outdoor" && !weather[session.id] && session.lat && session.lon) {
        const temp = await fetchWeather(session.lat, session.lon);
        setWeather(w => ({ ...w, [session.id]: temp }));
      }
    });
    // eslint-disable-next-line
  }, [sessions]);

  function getWeather(session: Session) {
    if (session.type === "outdoor") {
      const temp = weather[session.id];
      return temp !== undefined ? `${temp}°C` : "Laster...";
    }
    return null;
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
                        <Badge className={getDifficultyColor(session.difficulty)}>{session.difficulty || "Ukjent"}</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      {session.description}
                      {getWeather(session) && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs">
                          {getWeather(session)}
                        </span>
                      )}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{new Date(session.date).toLocaleDateString("no-NO")}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>
                          {formatTime(session.startTime)} - {formatTime(session.endTime)}
                        </span>
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
                      <span className="text-lg font-bold text-blue-600">{session.price} kr</span>
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
                                  className="bg-blue-600 hover:bg-blue-700"
                                  onClick={() => handleBooking(session)}
                                >
                                  Book nå
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Book {selectedSession?.title}</DialogTitle>
                                  <DialogDescription>
                                    Fyll ut informasjonen under for å booke {selectedSession?.title} den{" "}
                                    {selectedSession && new Date(selectedSession.date).toLocaleDateString("no-NO")}{" "}
                                    kl. {selectedSession && formatTime(selectedSession.startTime)}.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="name">Navn *</Label>
                                    <Input
                                      id="name"
                                      value={bookingForm.name}
                                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                                      placeholder="Ditt fulle navn"
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="email">E-post *</Label>
                                    <Input
                                      id="email"
                                      type="email"
                                      value={bookingForm.email}
                                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                                      placeholder="din@epost.no"
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="phone">Telefon *</Label>
                                    <Input
                                      id="phone"
                                      value={bookingForm.phone}
                                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                                      placeholder="+47 123 45 678"
                                      required
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
                                  <Button
                                    onClick={submitBooking}
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                  >
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
