import { useState, useEffect, useRef } from 'react'
import { Calendar, Users, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react'
import { useInViewAnimation } from '../hooks/useInViewAnimation'
import Button from './Button'

const RATE = 173

function parseDMY(s: string): Date | null {
  const [d, m, y] = s.split('.').map(Number)
  if (!d || !m || !y) return null
  return new Date(y, m - 1, d)
}

function formatDate(d: Date) {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function nightsBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000)
}

export default function BookingSection() {
  const { ref, inView } = useInViewAnimation()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const fpIn = useRef<HTMLInputElement>(null)
  const fpOut = useRef<HTMLInputElement>(null)

  // Flatpickr lazy load via CDN
  useEffect(() => {
    const loadFlatpickr = async () => {
      // Load via script tag if not already loaded
      if (!(window as any).flatpickr) {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/flatpickr'
        script.onload = () => initDates()
        document.head.appendChild(script)
      } else {
        initDates()
      }
    }

    const initDates = () => {
      const fp = (window as any).flatpickr
      if (!fp) return

      if (fpIn.current) {
        fp(fpIn.current, {
          locale: 'de',
          minDate: 'today',
          dateFormat: 'd.m.Y',
          disableMobile: true,
          onChange: (dates: Date[]) => {
            if (dates[0]) setCheckIn(formatDate(dates[0]))
          },
        })
      }
      if (fpOut.current) {
        fp(fpOut.current, {
          locale: 'de',
          minDate: 'today',
          dateFormat: 'd.m.Y',
          disableMobile: true,
          onChange: (dates: Date[]) => {
            if (dates[0]) setCheckOut(formatDate(dates[0]))
          },
        })
      }
    }

    loadFlatpickr()
  }, [])

  const ciDate = parseDMY(checkIn)
  const coDate = parseDMY(checkOut)
  const nights = ciDate && coDate && coDate > ciDate ? nightsBetween(ciDate, coDate) : 0
  const total = nights * RATE

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Buchungsanfrage Villa Berg – ${checkIn} bis ${checkOut}`)
    const body = encodeURIComponent([
      'Buchungsanfrage – Villa Berg, Benissa',
      '─────────────────────────────────────',
      '',
      `Name:        ${firstName} ${lastName}`,
      `E-Mail:      ${email}`,
      `Telefon:     ${phone || '–'}`,
      '',
      `Check-in:    ${checkIn}`,
      `Check-out:   ${checkOut}`,
      `Nächte:      ${nights}`,
      `Gäste:       ${guests}`,
      '',
      `Preis:       ${nights} × 173 € = ${total.toLocaleString('de-DE')} €`,
      '',
      `Nachricht:\n${message || '–'}`,
      '',
      '─────────────────────────────────────',
    ].join('\n'))
    window.location.href = `mailto:steven.berg92@googlemail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section id="buchen" className="w-full py-20 px-6 bg-[#FAFAF8]">
      <div className="max-w-[1200px] mx-auto">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`mb-12 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-xs font-mono tracking-[0.22em] text-[#D4A574] uppercase mb-3">Buchung</p>
          <h2 className="text-[32px] md:text-[44px] leading-[1.1] tracking-tight text-[#0D212C]">
            Ihr Urlaub beginnt<br />mit einer <span className="font-serif italic">Anfrage</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Info */}
          <div className={`${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <div className="text-[56px] font-light text-[#051A24] leading-none mb-1">
              173 <span className="text-2xl text-[#273C46] font-normal">€ / Nacht</span>
            </div>
            <p className="text-[#273C46] text-sm mt-3 mb-8 leading-relaxed">
              Alle Preise inkl. Klimaanlage, WLAN, Bettwäsche, Handtücher & wöchentlichem Poolservice.
            </p>
            <div className="space-y-4">
              {[
                ['Klimaanlage & Heizung', 'Im Preis inkludiert'],
                ['Bettwäsche & Handtücher', 'Frisch für jeden Gast'],
                ['Wöchentlicher Poolservice', 'Professionelle Reinigung'],
                ['WLAN', 'Hochgeschwindigkeit inklusive'],
                ['Check-in', '17:00 – 19:00 Uhr'],
                ['Check-out', 'Bis 10:00 Uhr'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-3 border-b border-black/6">
                  <span className="text-sm text-[#051A24] font-medium">{k}</span>
                  <span className="text-sm text-[#273C46]">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className={`bg-white rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 md:p-10 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <CheckCircle className="w-16 h-16 text-[#D4A574]" />
                <h3 className="text-2xl font-serif italic text-[#0D212C]">Anfrage gesendet!</h3>
                <p className="text-[#273C46] text-sm max-w-xs">
                  Ihr E-Mail-Programm öffnet sich – bitte senden Sie die vorbereitete E-Mail ab. Wir melden uns innerhalb von 1 Stunde.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>Neue Anfrage</Button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-[#051A24] mb-6">Verfügbarkeit anfragen</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-[#273C46] mb-1.5">Check-in</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A574]" />
                        <input
                          ref={fpIn}
                          readOnly
                          placeholder="Datum"
                          className="w-full pl-9 pr-3 py-3 border border-black/10 rounded-xl text-sm text-[#051A24] placeholder:text-[#273C46]/40 focus:outline-none focus:border-[#D4A574] transition cursor-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-[#273C46] mb-1.5">Check-out</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A574]" />
                        <input
                          ref={fpOut}
                          readOnly
                          placeholder="Datum"
                          className="w-full pl-9 pr-3 py-3 border border-black/10 rounded-xl text-sm text-[#051A24] placeholder:text-[#273C46]/40 focus:outline-none focus:border-[#D4A574] transition cursor-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-[#273C46] mb-1.5">Anzahl Gäste</label>
                    <div className="relative">
                      <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A574]" />
                      <select
                        value={guests}
                        onChange={e => setGuests(e.target.value)}
                        className="w-full pl-9 pr-3 py-3 border border-black/10 rounded-xl text-sm text-[#051A24] focus:outline-none focus:border-[#D4A574] transition appearance-none cursor-none bg-white"
                        required
                      >
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Gast{n > 1 ? 'e' : ''}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-2 gap-3">
                    {([['Vorname', firstName, setFirstName], ['Nachname', lastName, setLastName]] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
                      <div key={label}>
                        <label className="block text-[10px] tracking-[0.18em] uppercase text-[#273C46] mb-1.5">{label}</label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A574]" />
                          <input
                            value={val}
                            onChange={e => setter(e.target.value)}
                            placeholder={label}
                            className="w-full pl-9 pr-3 py-3 border border-black/10 rounded-xl text-sm text-[#051A24] placeholder:text-[#273C46]/40 focus:outline-none focus:border-[#D4A574] transition"
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-[#273C46] mb-1.5">E-Mail</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A574]" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="max@beispiel.de"
                        className="w-full pl-9 pr-3 py-3 border border-black/10 rounded-xl text-sm text-[#051A24] placeholder:text-[#273C46]/40 focus:outline-none focus:border-[#D4A574] transition" required />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-[#273C46] mb-1.5">Telefon</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A574]" />
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+49 123 456789"
                        className="w-full pl-9 pr-3 py-3 border border-black/10 rounded-xl text-sm text-[#051A24] placeholder:text-[#273C46]/40 focus:outline-none focus:border-[#D4A574] transition" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-[#273C46] mb-1.5">Nachricht</label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 absolute left-3 top-3.5 text-[#D4A574]" />
                      <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Besondere Wünsche…"
                        rows={3}
                        className="w-full pl-9 pr-3 py-3 border border-black/10 rounded-xl text-sm text-[#051A24] placeholder:text-[#273C46]/40 focus:outline-none focus:border-[#D4A574] transition resize-none"
                      />
                    </div>
                  </div>

                  {/* Price preview */}
                  {nights > 0 && (
                    <div className="bg-[#FAFAF8] rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-sm text-[#273C46]">
                        <span>{nights} Nacht{nights > 1 ? 'e' : ''} × 173 €</span>
                        <span>{(nights * RATE).toLocaleString('de-DE')} €</span>
                      </div>
                      <div className="flex justify-between font-semibold text-[#051A24] border-t border-black/6 pt-2">
                        <span>Gesamtpreis (ca.)</span>
                        <span className="text-[#D4A574] text-lg font-light">{total.toLocaleString('de-DE')} €</span>
                      </div>
                    </div>
                  )}

                  <Button variant="primary" className="w-full justify-center">
                    Anfrage absenden →
                  </Button>
                  <p className="text-center text-xs text-[#273C46]/60">
                    Direkt an den Gastgeber · Antwort innerhalb von 1 Stunde
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
