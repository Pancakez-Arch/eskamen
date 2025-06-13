"use client";

import { useState, useEffect } from "react";
import { UserButton, useUser } from '@clerk/nextjs';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navgiation";
import Footer from "@/components/footer";

interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

interface Session {
  id?: string; // Firestore bruker string-ID
  title: string;
  instructor: string;
  instructorRole: string;
  type: "indoor" | "outdoor";
  date: string | FirestoreTimestamp;
  startTime: string | FirestoreTimestamp;
  endTime: string | FirestoreTimestamp;
  location: string;
  lat?: number;
  lon?: number;
  maxParticipants: number;
  currentParticipants: number;
  difficulty: string;
  description: string;
  price: number;
}

const ADMIN_PASSWORD = "admin123"; // Endre dette til ønsket passord

export default function AdminSessionsPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Session>>({});
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [weather, setWeather] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    // Hent vær for alle utendørsøkter
    sessions.forEach(async (session) => {
      if (session.type === "outdoor" && !weather[session.id!] && session.lat && session.lon) {
        const temp = await fetchWeather(session.lat, session.lon);
        setWeather(w => ({ ...w, [session.id!]: temp }));
      }
    });
    // eslint-disable-next-line
  }, [sessions]);

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/sessions");
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    } catch (e) {
      setSessions([]);
    }
  };

  const fetchWeather = async (lat: number, lon: number) => {
    const res = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
      {
        headers: {
          'User-Agent': 'treningsglede-admin/1.0 github.com/dinbruker',
        },
      }
    );
    const data = await res.json();
    const temp = data.properties.timeseries[0].data.instant.details.air_temperature;
    return temp;
  };

  const handleAdd = async () => {
    if (!form.title || !form.instructor || !form.date || !form.startTime || !form.endTime || !form.location || !form.maxParticipants || !form.difficulty || !form.description || !form.price) {
      alert("Fyll ut alle felt!");
      return;
    }
    const newSession = {
      title: form.title,
      instructor: form.instructor,
      instructorRole: form.instructorRole || "Instruktør",
      type: form.type as "indoor" | "outdoor",
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      location: form.location,
      lat: form.lat,
      lon: form.lon,
      maxParticipants: Number(form.maxParticipants),
      currentParticipants: 0,
      difficulty: form.difficulty,
      description: form.description,
      price: Number(form.price),
    };
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSession),
      });
      if (res.ok) {
        fetchSessions();
        setShowForm(false);
        setForm({});
      } else {
        alert("Kunne ikke legge til økt.");
      }
    } catch {
      alert("Kunne ikke legge til økt.");
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (window.confirm("Er du sikker på at du vil slette denne økten?")) {
      try {
        const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchSessions();
        } else {
          let errMsg = "Kunne ikke slette økt.";
          try {
            const err = await res.json();
            errMsg = err.error || res.statusText || errMsg;
          } catch {}
          alert(`Feil ved sletting: ${errMsg}`);
        }
      } catch (e) {
        alert("Kunne ikke slette økt: " + (e instanceof Error ? e.message : e));
      }
    }
  };

  function getWeather(session: Session) {
    if (session.type === "outdoor") {
      const temp = weather[session.id!];
      return temp !== undefined ? `${temp}°C` : "Laster...";
    }
    return "-";
  };

  // Clerk: Sjekk om bruker er admin (f.eks. via publicMetadata eller email)
  const isAdmin = isSignedIn && user && (
    user.publicMetadata?.role === 'admin' ||
    user.emailAddresses?.some(e => e.emailAddress.endsWith('@dinadminmail.no')) // tilpass domenet
  );

  if (!isLoaded) {
    return <div>Laster...</div>;
  }

  if (!isSignedIn) {
    return <div>Du må være innlogget for å se denne siden.</div>;
  }

  if (!isAdmin) {
    return <div>Du har ikke tilgang til denne siden.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Admin: Treningsøkter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-6">
              <Button onClick={() => setShowForm(!showForm)} variant="default">
                {showForm ? "Avbryt" : "Legg til ny økt"}
              </Button>
            </div>
            {showForm && (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-6 rounded-lg border" onSubmit={e => { e.preventDefault(); handleAdd(); }}>
                <div>
                  <Label>Tittel</Label>
                  <Input value={form.title || ""} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                </div>
                <div>
                  <Label>Instruktør</Label>
                  <Input value={form.instructor || ""} onChange={e => setForm(f => ({ ...f, instructor: e.target.value }))} required />
                </div>
                <div>
                  <Label>Rolle</Label>
                  <Input value={form.instructorRole || ""} onChange={e => setForm(f => ({ ...f, instructorRole: e.target.value }))} />
                </div>
                <div>
                  <Label>Type</Label>
                  <select className="w-full rounded-md border px-3 py-2" value={form.type || "indoor"} onChange={e => setForm(f => ({ ...f, type: e.target.value as "indoor" | "outdoor" }))}>
                    <option value="indoor">Innendørs</option>
                    <option value="outdoor">Utendørs</option>
                  </select>
                </div>
                <div>
                  <Label>Dato</Label>
                  <Input type="date" value={typeof form.date === "object" && form.date && 'seconds' in form.date ? new Date(form.date.seconds * 1000).toISOString().slice(0,10) : (form.date || "")} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
                </div>
                <div>
                  <Label>Starttid</Label>
                  <Input type="time" value={typeof form.startTime === "object" && form.startTime && 'seconds' in form.startTime ? new Date(form.startTime.seconds * 1000).toISOString().slice(11,16) : (form.startTime || "")} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} required />
                </div>
                <div>
                  <Label>Sluttid</Label>
                  <Input type="time" value={typeof form.endTime === "object" && form.endTime && 'seconds' in form.endTime ? new Date(form.endTime.seconds * 1000).toISOString().slice(11,16) : (form.endTime || "")} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))} required />
                </div>
                <div>
                  <Label>Sted</Label>
                  <Input value={form.location || ""} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} required />
                </div>
                <div>
                  <Label>Breddegrad (lat)</Label>
                  <Input type="number" step="any" value={form.lat ?? ""} onChange={e => setForm(f => ({ ...f, lat: Number(e.target.value) }))} />
                </div>
                <div>
                  <Label>Lengdegrad (lon)</Label>
                  <Input type="number" step="any" value={form.lon ?? ""} onChange={e => setForm(f => ({ ...f, lon: Number(e.target.value) }))} />
                </div>
                <div>
                  <Label>Maks deltakere</Label>
                  <Input type="number" value={form.maxParticipants ?? ""} onChange={e => setForm(f => ({ ...f, maxParticipants: Number(e.target.value) }))} required />
                </div>
                <div>
                  <Label>Vanskelighetsgrad</Label>
                  <Input value={form.difficulty || ""} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))} required />
                </div>
                <div className="md:col-span-2">
                  <Label>Beskrivelse</Label>
                  <Input value={form.description || ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
                </div>
                <div>
                  <Label>Pris</Label>
                  <Input type="number" value={form.price ?? ""} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} required />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <Button type="submit" className="w-full md:w-auto">Legg til</Button>
                </div>
              </form>
            )}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg border">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="px-4 py-2">Tittel</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Dato</th>
                    <th className="px-4 py-2">Start</th>
                    <th className="px-4 py-2">Slutt</th>
                    <th className="px-4 py-2">Sted</th>
                    <th className="px-4 py-2">Plasser</th>
                    <th className="px-4 py-2">Påmeldte</th>
                    <th className="px-4 py-2">Vanskelighet</th>
                    <th className="px-4 py-2">Vær</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map(session => (
                    <tr key={session.id} className="border-b hover:bg-blue-50">
                      <td className="px-4 py-2">{session.title}</td>
                      <td className="px-4 py-2">{session.type === "outdoor" ? "Utendørs" : "Innendørs"}</td>
                      <td className="px-4 py-2">{typeof session.date === "object" && session.date && 'seconds' in session.date ? new Date(session.date.seconds * 1000).toLocaleDateString("no-NO") : session.date}</td>
                      <td className="px-4 py-2">{typeof session.startTime === "object" && session.startTime && 'seconds' in session.startTime ? new Date(session.startTime.seconds * 1000).toLocaleTimeString("no-NO", { hour: "2-digit", minute: "2-digit" }) : session.startTime}</td>
                      <td className="px-4 py-2">{typeof session.endTime === "object" && session.endTime && 'seconds' in session.endTime ? new Date(session.endTime.seconds * 1000).toLocaleTimeString("no-NO", { hour: "2-digit", minute: "2-digit" }) : session.endTime}</td>
                      <td className="px-4 py-2">{session.location}</td>
                      <td className="px-4 py-2">{session.maxParticipants}</td>
                      <td className="px-4 py-2">{session.currentParticipants}</td>
                      <td className="px-4 py-2">{session.difficulty}</td>
                      <td className="px-4 py-2">{getWeather(session)}</td>
                      <td className="px-4 py-2"><Button variant="destructive" size="sm" onClick={() => handleDelete(session.id)}>Slett</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}