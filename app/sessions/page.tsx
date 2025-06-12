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

const sessions = [
  {
    id: 1,
    title: "Morgen Yoga",
    instructor: "Sofia Johannessen",
    type: "indoor",
    date: "2024-12-11",
    time: "07:00 - 08:00",
    location: "Studio 1",
    maxParticipants: 12,
    currentParticipants: 8,
    difficulty: "Beginner",
    description: "Start dagen med rolig yoga og mindfulness. Perfekt for alle nivåer.",
    price: "250 kr",
  },
  {
    id: 2,
    title: "HIIT Utendørs",
    instructor: "Marcus Andersen",
    type: "outdoor",
    date: "2024-12-11",
    time: "17:00 - 18:00",
    location: "Frognerparken",
    maxParticipants: 10,
    currentParticipants: 10,
    difficulty: "Intermediate",
    description: "Intensiv utendørs trening med fokus på kondisjon og styrke.",
    price: "300 kr",
  },
  {
    id: 3,
    title: "Styrketrening for Nybegynnere",
    instructor: "Oliver Hansen",
    type: "indoor",
    date: "2024-12-11",
    time: "18:30 - 19:30",
    location: "Treningssalen",
    maxParticipants: 8,
    currentParticipants: 5,
    difficulty: "Beginner",
    description: "Lær grunnleggende styrkeøvelser i et trygt og støttende miljø.",
    price: "350 kr",
  },
  {
    id: 4,
    title: "Dans & Kondisjon",
    instructor: "Ingrid Svendsen",
    type: "indoor",
    date: "2024-12-12",
    time: "19:00 - 20:00",
    location: "Studio 2",
    maxParticipants: 15,
    currentParticipants: 12,
    difficulty: "All levels",
    description: "Morsomme danseøvelser kombinert med kondisjonstrening.",
    price: "280 kr",
  },
  {
    id: 5,
    title: "Naturløp & Mindfulness",
    instructor: "Marcus Andersen",
    type: "outdoor",
    date: "2024-12-12",
    time: "08:00 - 09:30",
    location: "Nordmarka",
    maxParticipants: 12,
    currentParticipants: 7,
    difficulty: "Intermediate",
    description: "Kombinasjon av løping i naturen og mindfulness-øvelser.",
    price: "320 kr",
  },
  {
    id: 6,
    title: "Personlig Trening",
    instructor: "Emma Larsen",
    type: "indoor",
    date: "2024-12-12",
    time: "16:00 - 17:00",
    location: "Privat studio",
    maxParticipants: 1,
    currentParticipants: 0,
    difficulty: "All levels",
    description: "Skreddersydd treningsøkt tilpasset dine individuelle mål.",
    price: "800 kr",
  },
]

export default function SessionsPage() {
  const [selectedSession, setSelectedSession] = useState<(typeof sessions)[0] | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Mock login state
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const handleBooking = (session: (typeof sessions)[0]) => {
    if (!isLoggedIn) {
      alert("Vennligst logg inn for å booke en økt")
      return
    }
    setSelectedSession(session)
  }

  const handleWaitlist = (session: (typeof sessions)[0]) => {
    if (!isLoggedIn) {
      alert("Vennligst logg inn for å bli med på ventelisten")
      return
    }
    alert(`Du er nå på ventelisten for "${session.title}"`)
  }

  const submitBooking = () => {
    alert(`Booking bekreftet for "${selectedSession?.title}"!`)
    setSelectedSession(null)
    setBookingForm({ name: "", email: "", phone: "", notes: "" })
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
        <div className="container">
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
                        <Home className="h-5 w-5 text-primary-600" />
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
