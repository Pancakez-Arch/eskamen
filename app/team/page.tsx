import { Card, CardContent } from "@/components/ui/card"
import Footer from "@/components/footer"
import Navigation from "@/components/navgiation"
import { Badge } from "lucide-react"
import Image from "next/image"

const teamMembers = [
	{
		name: "Emma Larsen",
		role: "Daglig Leder & Personlig Trener",
		specialties: ["Styrketrening", "Funksjonell trening", "Kostråd"],
		bio: "Emma har over 8 års erfaring innen fitness og brenner for å hjelpe andre med å nå sine mål. Hun er sertifisert personlig trener og ernæringsveileder.",
		image: "/placeholder.svg?height=300&width=300",
	},
	{
		name: "Marcus Andersen",
		role: "Utendørs Aktivitetsleder",
		specialties: ["Utendørstrening", "Løping", "Teambuilding"],
		bio: "Marcus elsker å kombinere trening med naturopplevelser. Han leder våre utendørs økter og har bakgrunn som friluftsliv-instruktør.",
		image: "/placeholder.svg?height=300&width=300",
	},
	{
		name: "Sofia Johannessen",
		role: "Yoga & Mindfulness Instruktør",
		specialties: ["Yoga", "Meditasjon", "Stressmestring"],
		bio: "Sofia bringer ro og balanse til vårt treningsprogram. Hun er sertifisert yoga-instruktør og mindfulness-coach med fokus på helhetlig velvære.",
		image: "/placeholder.svg?height=300&width=300",
	},
	{
		name: "Oliver Hansen",
		role: "Styrketrening Specialist",
		specialties: ["Styrketrening", "Powerlifting", "Rehabilitering"],
		bio: "Oliver har konkurransebakgrunn innen styrkeløft og spesialiserer seg på å bygge styrke på en trygg og effektiv måte for alle nivåer.",
		image: "/placeholder.svg?height=300&width=300",
	},
	{
		name: "Ingrid Svendsen",
		role: "Gruppe Fitness Instruktør",
		specialties: ["HIIT", "Dans", "Kondisjonstrening"],
		bio: "Ingrid skaper energiske og morsomme gruppeøkter som får alle til å smile. Hun har bakgrunn som danser og fitness-instruktør.",
		image: "/placeholder.svg?height=300&width=300",
	},
	{
		name: "Thomas Berg",
		role: "Ernæringsveileder",
		specialties: ["Kostplan", "Vektregulering", "Sportsernæring"],
		bio: "Thomas hjelper våre medlemmer med å optimalisere kostholdet for å støtte treningsresultatene. Han er utdannet klinisk ernæringsfysiolog.",
		image: "/placeholder.svg?height=300&width=300",
	},
]

export default function TeamPage() {
	return (
		<div className="min-h-screen">
			<Navigation />

			{/* Hero Section */}
			<section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
				<div className="container mx-auto px-4 text-center space-y-6">
					<h1 className="text-4xl md:text-5xl font-bold">Møt Vårt Team</h1>
					<p className="text-xl text-blue-100 max-w-3xl mx-auto">
						Vi er en gruppe lidenskapelige trenere og veiledere som brenner for å hjelpe deg med å nå dine helse- og
						treningsmål. Hver av oss bringer unik kompetanse og erfaring.
					</p>
				</div>
			</section>

			{/* Team Grid */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{teamMembers.map((member, index) => (
							<Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
								<div className="aspect-square overflow-hidden">
									<Image
										src={member.image || "/placeholder.svg"}
										alt={member.name}
										className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
										width={400}
										height={400}
										style={{ objectFit: "cover" }}
									/>
								</div>
								<CardContent className="p-6 space-y-4">
									<div>
										<h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
										<p className="text-blue-600 font-medium">{member.role}</p>
									</div>

									<p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>

									<div className="space-y-2">
										<p className="text-sm font-medium text-gray-900">Spesialiteter:</p>
										<div className="flex flex-wrap gap-2">
											{member.specialties.map((specialty, idx) => (
												<Badge key={idx} className="bg-blue-100 text-blue-700">
													{specialty}
												</Badge>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="py-20 bg-blue-50">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center space-y-12">
						<div className="space-y-4">
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900">Våre Verdier</h2>
							<p className="text-xl text-gray-600">Dette er grunnlaget for alt vi gjør hos Treningsglede</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							<div className="text-center space-y-4">
								<div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
									<span className="text-2xl font-bold text-white">1</span>
								</div>
								<h3 className="text-xl font-semibold text-gray-900">Inkludering</h3>
								<p className="text-gray-600">Alle er velkommen, uansett alder, treningsnivå eller bakgrunn</p>
							</div>

							<div className="text-center space-y-4">
								<div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
									<span className="text-2xl font-bold text-white">2</span>
								</div>
								<h3 className="text-xl font-semibold text-gray-900">Kvalitet</h3>
								<p className="text-gray-600">
									Vi leverer høy kvalitet i alt vi gjør, fra treningsøkter til kundeservice
								</p>
							</div>

							<div className="text-center space-y-4">
								<div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
									<span className="text-2xl font-bold text-white">3</span>
								</div>
								<h3 className="text-xl font-semibold text-gray-900">Fellesskap</h3>
								<p className="text-gray-600">
									Vi bygger sterke relasjoner og støtter hverandre på veien mot bedre helse
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}
