"use client"

import { useState, useEffect } from "react"
import { useAuth, useUser } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge, Calendar, Clock, MapPin } from "lucide-react"
import Footer from "@/components/footer"
import Navigation from "@/components/navgiation"

interface Booking {
  id: number
  session_id: number
  booking_status: string
  booking_date: string
  notes: string
  title: string
  session_date: string
  start_time: string
  end_time: string
  location: string
  instructor_name: string
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const { isSignedIn } = useAuth()
  const { user } = useUser()

  useEffect(() => {
    if (isSignedIn) {
      fetchBookings()
    }
  }, [isSignedIn])

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings")
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5) // Remove seconds from HH:MM:SS
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "waitlist":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Bekreftet"
      case "cancelled":
        return "Avbestilt"
      case "waitlist":
        return "Venteliste"
      default:
        return status
    }
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Mine Bookinger</h1>
          <p className="text-gray-600">Du må være logget inn for å se dine bookinger.</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container py-20 text-center">
          <p>Laster dine bookinger...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mine Bookinger</h1>
              <p className="text-gray-600">Oversikt over dine treningsøkter og bookinger</p>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ingen bookinger ennå</h3>
                <p className="text-gray-600 mb-4">Du har ikke booket noen treningsøkter ennå.</p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <a href="/sessions">Utforsk treningsøkter</a>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{booking.title}</CardTitle>
                          <p className="text-sm text-gray-600">med {booking.instructor_name}</p>
                        </div>
                        <Badge className={getStatusColor(booking.booking_status)}>
                          {getStatusText(booking.booking_status)}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{new Date(booking.session_date).toLocaleDateString("no-NO")}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>
                            {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{booking.location}</span>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-600">
                            <strong>Kommentarer:</strong> {booking.notes}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-gray-500">
                          Booket {new Date(booking.booking_date).toLocaleDateString("no-NO")}
                        </div>
                        {booking.booking_status === "confirmed" && (
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">
                              Endre booking
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              Avbestill
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
