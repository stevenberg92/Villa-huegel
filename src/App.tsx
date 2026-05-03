import { useEffect, useRef, useState } from 'react'
import { Star, Wifi, Car, Wind, Flame, Utensils, Tv, Anchor, Shield, BedDouble, Bath, Sun, Waves, Snowflake, ParkingCircle } from 'lucide-react'
import Button from './components/Button'
import Marquee from './components/Marquee'
import GallerySection from './components/GallerySection'
import TestimonialCarousel from './components/TestimonialCarousel'
import BookingSection from './components/BookingSection'
import PartnerSection from './components/PartnerSection'
import Footer from './components/Footer'
import { useInViewAnimation } from './hooks/useInViewAnimation'

const BASE = 'https://raw.githubusercontent.com/stevenberg92/Villa-huegel/main/Villa%20Berg%20guzmann/Bilder/'
const ROOT = 'https://raw.githubusercontent.com/stevenberg92/Villa-huegel/main/Villa%20Berg%20guzmann/'

// ── Cursor ──────────────────────────────────────────────────────────────────
function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px'
        dot.current.style.top = e.clientY + 'px'
      }
    }
    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.13
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.13
      if (ring.current) {
        ring.current.style.left = ringPos.current.x + 'px'
        ring.current.style.top = ringPos.current.y + 'px'
      }
      requestAnimationFrame(animate)
    }
    const onEnter = () => document.body.classList.add('is-hovering')
    const onLeave = () => document.body.classList.remove('is-hovering')
    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    requestAnimationFrame(animate)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={dot} id="cursor-dot" />
      <div ref={ring} id="cursor-ring" />
    </>
  )
}

// ── Scroll Progress ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      if (bar.current) bar.current.style.width = pct + '%'
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return <div ref={bar} id="scroll-progress" />
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { label: 'Villa', href: '#villa' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Ausstattung', href: '#ausstattung' },
    { label: 'Umgebung', href: '#umgebung' },
    { label: 'Bewertungen', href: '#bewertungen' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 transition-all duration-500 ${scrolled ? 'py-4 bg-white/90 backdrop-blur-xl border-b border-black/6 shadow-sm' : 'py-6'}`}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <a href="#" className={`font-serif text-2xl italic font-semibold cursor-none transition-colors ${scrolled ? 'text-[#051A24]' : 'text-white drop-shadow-md'}`}>
          Villa Berg
        </a>
        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} className={`text-xs tracking-[0.12em] uppercase font-medium hover:text-[#D4A574] transition-colors cursor-none ${scrolled ? 'text-[#051A24]' : 'text-white drop-shadow-md'}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <Button href="#buchen" variant="primary" className="py-2.5 px-6 text-xs">Buchen</Button>
        </div>
        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-[5px] cursor-none p-1">
          <span className={`w-6 h-[1.5px] transition-all ${scrolled ? 'bg-[#051A24]' : 'bg-white'} ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`w-6 h-[1.5px] transition-all ${scrolled ? 'bg-[#051A24]' : 'bg-white'} ${open ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-[1.5px] transition-all ${scrolled ? 'bg-[#051A24]' : 'bg-white'} ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute inset-x-0 top-full bg-white border-t border-black/6 px-6 py-6 flex flex-col gap-5">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-[#051A24] text-lg font-medium cursor-none">
              {l.label}
            </a>
          ))}
          <Button href="#buchen" variant="primary" onClick={() => setOpen(false)}>Buchen</Button>
        </div>
      )}
    </nav>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = () => { if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)` }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Parallax bg */}
      <div
        ref={bgRef}
        className="absolute inset-[-10%]"
        style={{
          backgroundImage: `url('${BASE}ChatGPT%20Image%2029.%20Apr.%202026%2C%2019_34_35.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Subtle dark gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

      {/* Content - Glass card */}
      <div className="relative z-10 px-6 max-w-[760px] mx-auto pt-20">
        <div
          className="rounded-[36px] px-8 md:px-14 py-12 md:py-16 text-center"
          style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.35)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.4)',
          }}
        >
          <p className="animate-fade-in-up font-mono text-[10px] md:text-xs tracking-[0.25em] text-white/90 uppercase mb-4" style={{ animationDelay: '0.1s' }}>
            Benissa &nbsp;·&nbsp; Costa Blanca &nbsp;·&nbsp; Spanien
          </p>
          <h1
            className="animate-fade-in-up text-[44px] md:text-[68px] lg:text-[80px] leading-[0.95] tracking-tight text-white mb-5"
            style={{ animationDelay: '0.2s', textShadow: '0 2px 24px rgba(0,0,0,0.25)' }}
          >
            Villa <span className="font-serif italic">Berg</span>
          </h1>
          <p
            className="animate-fade-in-up text-base md:text-lg text-white/90 leading-relaxed mb-8 max-w-md mx-auto"
            style={{ animationDelay: '0.3s', textShadow: '0 1px 12px rgba(0,0,0,0.3)' }}
          >
            Privatvilla mit Pool und Bergblick — 4 Schlafzimmer für 8 Gäste, mitten in der Costa Blanca.
          </p>
          <div
            className="animate-fade-in-up flex flex-col sm:flex-row gap-3 justify-center mb-8"
            style={{ animationDelay: '0.4s' }}
          >
            <Button href="#galerie" variant="primary">Entdecken</Button>
            <Button href="#buchen" variant="secondary">Jetzt anfragen</Button>
          </div>
          <div className="animate-fade-in-up flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/90" style={{ animationDelay: '0.5s' }}>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-[#D4A574] text-[#D4A574]" /> 4,75 · 16 Bewertungen</span>
            <span className="hidden sm:inline w-px h-4 bg-white/30" />
            <span>173 € / Nacht</span>
            <span className="hidden sm:inline w-px h-4 bg-white/30" />
            <span>Bis 8 Gäste</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/80">Scrollen</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#D4A574] to-transparent" />
      </div>
    </section>
  )
}

// ── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const { ref, inView } = useInViewAnimation()
  const stats = [
    { n: 120, unit: 'm²', label: 'Wohnfläche' },
    { n: 4, unit: '', label: 'Schlafzimmer' },
    { n: 8, unit: '', label: 'Gäste' },
    { n: 4.75, unit: '★', label: 'Airbnb-Bewertung' },
  ]

  return (
    <section className="py-16 px-6 bg-[#FAFAF8]">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`bg-white rounded-2xl p-8 text-center shadow-sm border border-black/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <p className="text-[44px] md:text-[56px] font-light text-[#D4A574] leading-none">
              {s.n}{s.unit}
            </p>
            <p className="text-xs tracking-[0.18em] uppercase text-[#273C46] mt-3">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── About ────────────────────────────────────────────────────────────────────
function About() {
  const { ref, inView } = useInViewAnimation()
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return
    const h = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) scale(1.02)`
    }
    const reset = () => { el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)' }
    el.addEventListener('mousemove', h)
    el.addEventListener('mouseleave', reset)
    return () => { el.removeEventListener('mousemove', h); el.removeEventListener('mouseleave', reset) }
  }, [])

  const features = [
    { Icon: Waves, label: 'Privater Pool', sub: 'Ganzjährig geöffnet' },
    { Icon: Snowflake, label: 'Zentralklima', sub: 'In allen Räumen' },
    { Icon: Wifi, label: 'Gratis WLAN', sub: 'Hochgeschwindigkeit' },
    { Icon: ParkingCircle, label: 'Parkplatz', sub: 'Privat & überdacht' },
  ]

  return (
    <section id="villa" className="py-20 px-6 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={inView ? 'animate-fade-in-up' : 'opacity-0'}>
          <p className="text-xs font-mono tracking-[0.22em] text-[#D4A574] uppercase mb-4">Die Villa</p>
          <h2 className="text-[32px] md:text-[44px] leading-[1.1] tracking-tight text-[#0D212C] mb-6">
            Ihr privates<br /><span className="font-serif italic">Paradies</span> in Spanien
          </h2>
          <div className="space-y-4 text-[#273C46] leading-relaxed">
            <p>Die Villa Berg liegt ruhig in einer gepflegten Urbanisation in Benissa, eingebettet zwischen Bergen und Küste der Costa Blanca. Auf 120 m² ebenerdiger Wohnfläche verbindet sie mediterranes Flair mit modernem Komfort.</p>
            <p>Vier Schlafzimmer, zwei Bäder, ein großer Wohn-Essbereich und eine vollausgestattete Küche sorgen für einen rundum erholsamen Aufenthalt – ideal für Familien und Gruppen bis 8 Personen.</p>
            <p>Der private Pool mit Sonnenterrasse, der überdachte Grillbereich und das eingezäunte Grundstück machen die Villa zum perfekten Rückzugsort unter spanischer Sonne.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {features.map(({ Icon, label, sub }) => (
              <div
                key={label}
                className="group relative bg-white rounded-2xl p-5 border border-black/5 hover:border-[#D4A574]/40 hover:shadow-[0_8px_24px_rgba(212,165,116,0.12)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D4A574]/15 to-[#D4A574]/5 border border-[#D4A574]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-[#D4A574]" strokeWidth={1.6} />
                </div>
                <p className="text-sm font-medium text-[#051A24] leading-tight">{label}</p>
                <p className="text-[11px] text-[#273C46]/70 mt-1 tracking-wide">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={imgRef}
          className={`overflow-hidden rounded-3xl shadow-xl transition-transform duration-200 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          <img
            src={`${BASE}Au%C3%9Fenansicht.jpg`}
            alt="Villa Berg Außenansicht"
            className="w-full h-[480px] object-cover"
          />
          <div className="bg-white px-6 py-4 flex justify-between items-center">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-[#D4A574]">Bewertung</p>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#D4A574] text-[#D4A574]" />)}
                <span className="text-sm ml-1 text-[#051A24]">4,75</span>
              </div>
            </div>
            <p className="text-xs text-[#273C46]">16 Bewertungen · Airbnb</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Amenities ─────────────────────────────────────────────────────────────────
function Amenities() {
  const { ref, inView } = useInViewAnimation()
  const items = [
    { Icon: Sun, label: 'Privater Pool', desc: 'Ganzjährig geöffnet' },
    { Icon: Wind, label: 'Klimaanlage', desc: 'Zentral, inkl.' },
    { Icon: Flame, label: 'Heizung', desc: 'Wärmepumpe, inkl.' },
    { Icon: Wifi, label: 'WLAN', desc: 'Hochgeschwindigkeit' },
    { Icon: Car, label: 'Parkplatz', desc: 'Überdacht, inkl.' },
    { Icon: Utensils, label: 'Vollküche', desc: 'Ofen, Spüler, Kaffeemaschine' },
    { Icon: Tv, label: 'Satellitenfernsehen', desc: 'DE/EN/ES/FR' },
    { Icon: Anchor, label: 'Grill', desc: 'Portabler BBQ-Grill' },
    { Icon: BedDouble, label: 'Bettwäsche', desc: 'Frisch für jeden Gast' },
    { Icon: Bath, label: '2 Badezimmer', desc: 'Vollbad + Dusche' },
    { Icon: Shield, label: 'Eingezäunt', desc: 'Privates Grundstück' },
    { Icon: Sun, label: 'Terrasse 40m²', desc: 'Mit Gartenmöbeln' },
  ]

  return (
    <section id="ausstattung" className="py-20 px-6 bg-[#FAFAF8]">
      <div className="max-w-[1200px] mx-auto">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`mb-10 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-xs font-mono tracking-[0.22em] text-[#D4A574] uppercase mb-3">Ausstattung</p>
          <h2 className="text-[32px] md:text-[44px] leading-[1.1] tracking-tight text-[#0D212C]">
            Alles, was Sie für einen<br />perfekten <span className="font-serif italic">Urlaub</span> brauchen
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`group bg-white rounded-2xl p-6 border border-black/5 hover:border-[#D4A574]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${(i % 8) * 0.05}s` }}
            >
              <item.Icon className="w-6 h-6 text-[#D4A574] mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-sm text-[#051A24]">{item.label}</p>
              <p className="text-xs text-[#273C46] mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Bedrooms ──────────────────────────────────────────────────────────────────
function Bedrooms() {
  const { ref, inView } = useInViewAnimation()
  const rooms = [
    { img: `${BASE}Schlafzimmer%20poolblick.jpg`, num: '01', title: 'Suite mit Poolblick', beds: '1 Doppelbett · Poolzugang · Eigenes Bad' },
    { img: `${BASE}Schlafzimmer%202.jpg`, num: '02', title: 'Helles Doppelzimmer', beds: '1 Doppelbett 135 cm' },
    { img: `${BASE}Schlafzimmer%203.jpg`, num: '03', title: 'Twin Zimmer', beds: '2 Einzelbetten' },
    { img: `${BASE}Schlafzimmer%20poolhaus%20%2B%20separates%20bad.jpg`, num: '04', title: 'Poolhaus-Suite', beds: '2 Einzelbetten · Separates Bad' },
  ]

  return (
    <section id="schlafzimmer" className="py-20 px-6 max-w-[1200px] mx-auto">
      <div ref={ref as React.RefObject<HTMLDivElement>} className={`mb-10 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <p className="text-xs font-mono tracking-[0.22em] text-[#D4A574] uppercase mb-3">Schlafzimmer</p>
        <h2 className="text-[32px] md:text-[44px] leading-[1.1] tracking-tight text-[#0D212C]">
          4 Zimmer,<br />4 <span className="font-serif italic">Erlebnisse</span>
        </h2>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin" style={{ scrollbarColor: '#D4A574 #F5F1E8' }}>
        {rooms.map((r, i) => (
          <div
            key={r.num}
            className={`flex-shrink-0 w-72 md:w-80 bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-400 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{
              animationDelay: `${i * 0.1}s`,
              transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease',
            }}
          >
            <div className="overflow-hidden h-52">
              <img src={r.img} alt={r.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
            <div className="p-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#D4A574] font-medium">Schlafzimmer {r.num}</p>
              <p className="font-serif italic text-xl text-[#051A24] mt-1 mb-2">{r.title}</p>
              <p className="text-xs text-[#273C46]">{r.beds}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Surroundings ─────────────────────────────────────────────────────────────
function Surroundings() {
  const { ref, inView } = useInViewAnimation()
  const places = [
    {
      img: `${BASE}Moraira%20strand.jpg`,
      dist: '6 km · 10 Min.',
      name: 'Strand L\'Ampolla de Moraira',
      desc: 'Feiner Sandstrand mit kristallklarem Wasser, ideal für Familien — perfekt für entspannte Tage am Meer.',
    },
    {
      img: `${ROOT}Cala%20Advocat.png`,
      dist: '4 km · 8 Min.',
      name: 'Felsenstrand Cala Advocat',
      desc: 'Versteckte Felsenbucht mit reicher Unterwasserwelt — ein Paradies zum Schnorcheln und Tauchen.',
    },
    {
      img: `${ROOT}Club%20de%20Golf%20Ifach.png`,
      dist: '3 km · 6 Min.',
      name: 'Golf Club de Ifach',
      desc: 'Gepflegter 9-Loch-Golfplatz mit Mittelmeerblick — nur wenige Minuten von der Villa entfernt.',
    },
    {
      img: `${BASE}moraira%20stadt.jpg`,
      dist: '6 km · 12 Min.',
      name: 'Altstadt Moraira',
      desc: 'Charmante Hafenstadt mit Boutiquen, Cafés und Restaurants — mediterranes Flair und kulinarische Höhepunkte.',
    },
    {
      img: `${BASE}Hafen.jpg`,
      dist: '6 km · 12 Min.',
      name: 'Hafen & Promenade',
      desc: 'Yachthafen mit Strandcafés und Eisdielen — der perfekte Ort für laue Sommerabende am Wasser.',
    },
    {
      img: `${ROOT}Naturpark%20Pe%C3%B1%C3%B3n%20de%20Ifach.png`,
      dist: '15 km · 20 Min.',
      name: 'Peñón de Ifach',
      desc: 'Markantes Wahrzeichen der Costa Blanca — der 332 m hohe Felsen ist Naturschutzgebiet mit beeindruckenden Wanderwegen.',
    },
  ]

  return (
    <section id="umgebung" className="py-20 px-6 bg-[#FAFAF8]">
      <div className="max-w-[1200px] mx-auto">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`mb-10 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-xs font-mono tracking-[0.22em] text-[#D4A574] uppercase mb-3">Umgebung</p>
          <h2 className="text-[32px] md:text-[44px] leading-[1.1] tracking-tight text-[#0D212C]">
            Die Costa Blanca<br />zu Ihren <span className="font-serif italic">Füßen</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {places.map((p, i) => (
            <div
              key={p.name}
              className={`group flex flex-col bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-400 cursor-none ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="relative overflow-hidden h-56">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] tracking-[0.15em] uppercase font-semibold text-[#D4A574]">
                  {p.dist}
                </div>
              </div>
              <div className="p-5">
                <p className="font-serif italic text-lg text-[#051A24] leading-tight">{p.name}</p>
                <p className="text-sm text-[#273C46] mt-2 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <About />
      <GallerySection />
      <Amenities />
      <Bedrooms />
      <Surroundings />
      <section id="bewertungen">
        <TestimonialCarousel />
      </section>
      <BookingSection />
      <PartnerSection />
      <Footer />
    </>
  )
}
