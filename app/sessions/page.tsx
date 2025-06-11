import { SignIn } from "@clerk/nextjs"
import Link from "next/link"
import { Dumbbell, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Header */}
      <div className="container py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Dumbbell className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold text-primary-700">Treningsglede AS</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbake til hjemmeside
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Velkommen tilbake!</h1>
          <p className="text-gray-600">Logg inn for å booke treningsøkter og administrere dine bookinger</p>
        </div>

        {/* Clerk Sign In Component */}
        <div className="flex justify-center">
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-lg border-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700",
                socialButtonsBlockButtonText: "font-medium",
                formButtonPrimary: "bg-primary-600 hover:bg-primary-700 text-white",
                formFieldInput: "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
                footerActionLink: "text-primary-600 hover:text-primary-700",
              },
            }}
          />
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Har du ikke konto ennå?{" "}
            <Link href="/sign-up" className="text-primary-600 hover:text-primary-700 font-medium">
              Opprett konto her
            </Link>
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Fordeler med å være medlem</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Book treningsøkter enkelt online</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Administrer dine bookinger</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Få varsling om ledige plasser</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Tilgang til eksklusive tilbud</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container text-center py-8 mt-12">
        <p className="text-sm text-gray-500">
          Ved å logge inn godtar du våre{" "}
          <Link href="#" className="text-primary-600 hover:text-primary-700">
            vilkår
          </Link>{" "}
          og{" "}
          <Link href="#" className="text-primary-600 hover:text-primary-700">
            personvernregler
          </Link>
        </p>
      </div>
    </div>
  )
}
