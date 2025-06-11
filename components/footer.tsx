import Link from "next/link"
import { Dumbbell, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">Treningsglede AS</span>
            </div>
            <p className="text-gray-400">
              Din partner for en aktiv og sunn livsstil. Vi tilbyr treningsøkter både innendørs og utendørs.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigasjon</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors">
                Hjem
              </Link>
              <Link href="/team" className="block text-gray-400 hover:text-white transition-colors">
                Vårt Team
              </Link>
              <Link href="/sessions" className="block text-gray-400 hover:text-white transition-colors">
                Treningsøkter
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontakt</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+47 123 45 678</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>hei@treningsglede.no</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Oslo, Norge</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Åpningstider</h3>
            <div className="space-y-1 text-gray-400">
              <p>Mandag - Fredag: 06:00 - 22:00</p>
              <p>Lørdag: 08:00 - 20:00</p>
              <p>Søndag: 10:00 - 18:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Treningsglede AS. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  )
}
