import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const navCols = [
    {
      title: 'Villa',
      links: [
        { label: 'Über die Villa', href: '#villa' },
        { label: 'Galerie', href: '#galerie' },
        { label: 'Ausstattung', href: '#ausstattung' },
        { label: 'Schlafzimmer', href: '#schlafzimmer' },
      ],
    },
    {
      title: 'Aufenthalt',
      links: [
        { label: 'Umgebung', href: '#umgebung' },
        { label: 'Bewertungen', href: '#bewertungen' },
        { label: 'Anfrage', href: '#buchen' },
      ],
    },
    {
      title: 'Kontakt',
      links: [
        { label: 'E-Mail', href: 'mailto:steven.berg92@googlemail.com', external: true },
        { label: 'Airbnb', href: 'https://www.airbnb.de/rooms/16372187', external: true },
      ],
    },
  ]

  const legal = [
    { label: 'Impressum', href: '#impressum' },
    { label: 'Datenschutz', href: '#datenschutz' },
  ]

  return (
    <footer className="w-full bg-[#051A24] text-white pt-20 pb-10 px-6 mt-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Top: brand + tagline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          <div className="md:col-span-5">
            <p className="font-serif italic text-4xl md:text-5xl leading-tight">Villa Berg</p>
            <p className="text-sm text-white/60 mt-3 max-w-xs leading-relaxed">
              Privatvilla mit Pool, Bergblick und mediterranem Charme — Benissa, Costa Blanca, Spanien.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4A574]">Lizenz</span>
              <span className="text-xs text-white/70">AT-442172-A</span>
            </div>
          </div>

          {navCols.map(col => (
            <div key={col.title} className="md:col-span-2">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#D4A574] mb-4">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={(l as any).external ? '_blank' : undefined}
                      rel={(l as any).external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-white/75 hover:text-white transition-colors inline-flex items-center gap-1 cursor-none"
                    >
                      {l.label}
                      {(l as any).external && <ArrowUpRight className="w-3 h-3 opacity-60" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#D4A574] mb-4">Buchen</p>
            <a
              href="#buchen"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#D4A574] hover:text-white transition-colors cursor-none"
            >
              Anfrage senden
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom: legal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Villa Berg · Alle Rechte vorbehalten</p>
          <div className="flex gap-6">
            {legal.map(l => (
              <a key={l.label} href={l.href} className="hover:text-white transition-colors cursor-none">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
