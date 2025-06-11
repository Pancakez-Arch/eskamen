import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Zap, Calendar, ArrowRight, Star} from "lucide-react"
import Footer from "@/components/footer"
import Navigation from "../components/navgiation"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen">

      <Navigation />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Velkommen til <span className="text-blue-200">Treningsglede</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Din reise mot en sunnere og sterkere versjon av deg selv starter her. Vi tilbyr inspirerende treningsøkter
              både innendørs og utendørs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sessions">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-3">
                  Book din første økt
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/team">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-700 text-lg px-8 py-3"
                >
                  Møt vårt team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Vår Treningsfilosofi</h2>
              <p className="text-xl text-gray-600">
                Hos Treningsglede tror vi på at trening skal være gøy, inkluderende og tilgjengelig for alle
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Glede i Bevegelse</h3>
                  <p className="text-gray-600">
                    Vi skaper positive opplevelser som gjør at du gleder deg til hver treningsøkt
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Inkluderende Fellesskap</h3>
                  <p className="text-gray-600">
                    Alle er velkommen, uansett treningsnivå. Vi bygger et støttende miljø sammen
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Personlig Utvikling</h3>
                  <p className="text-gray-600">Vi hjelper deg å nå dine mål gjennom skreddersydde treningsprogrammer</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Hvorfor Velge Treningsglede?</h2>
              <p className="text-xl text-gray-600">Vi tilbyr mer enn bare trening - vi tilbyr en livsstil</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Fleksible Treningsøkter</h3>
                    <p className="text-gray-600">
                      Både innendørs og utendørs alternativer som passer din timeplan og preferanser
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Erfarne Instruktører</h3>
                    <p className="text-gray-600">
                      Vårt team av sertifiserte trenere er her for å guide og motivere deg
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Små Grupper</h3>
                    <p className="text-gray-600">
                      Maksimalt 12 deltakere per økt for personlig oppfølging og trygg atmosfære
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="https://www.3t.no/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Ftttno-prod-assets%2Faktiviteter_header_mobil_3t_olympia_7652c587bf%2Faktiviteter_header_mobil_3t_olympia_7652c587bf.jpg&w=1920&q=75"
                  alt="Treningsgruppe utendørs"
                  className="rounded-lg shadow-xl w-full"
                  width={1920}
                  height={1080}
                  style={{objectFit: 'cover'}}
                  priority
                />
                <div className="absolute inset-0 bg-blue-600/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Klar for å Starte Din Treningsreise?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Bli med i vårt fellesskap og opplev gleden ved å være aktiv. Din første økt er bare et klikk unna!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sessions">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-3">
                Se Ledige Økter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-700 text-lg px-8 py-3"
              >
                Opprett Konto
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
