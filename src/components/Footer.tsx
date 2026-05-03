import { ArrowUpRight } from 'lucide-react'
import Button from './Button'

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/6 py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
          <div>
            <p className="font-serif text-3xl italic text-[#051A24] mb-2">Villa Berg</p>
            <p className="text-sm text-[#273C46]">Benissa, Costa Blanca, Spanien</p>
          </div>
          <Button href="#buchen" variant="primary">Jetzt anfragen →</Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 pt-8 border-t border-black/6">
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              {[
                { label: 'Villa', href: '#villa' },
                { label: 'Galerie', href: '#galerie' },
                { label: 'Ausstattung', href: '#ausstattung' },
                { label: 'Umgebung', href: '#umgebung' },
              ].map(l => (
                <a key={l.label} href={l.href} className="text-sm text-[#051A24] hover:text-[#D4A574] transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Bewertungen', href: '#bewertungen' },
                { label: 'Buchen', href: '#buchen' },
                { label: 'Airbnb', href: 'https://www.airbnb.de/rooms/16372187', external: true },
                { label: 'Kontakt', href: 'mailto:steven.berg92@googlemail.com', external: true },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noopener noreferrer' : undefined}
                  className="text-sm text-[#051A24] hover:text-[#D4A574] transition-colors flex items-center gap-1"
                >
                  {l.label}
                  {l.external && <ArrowUpRight className="w-3 h-3 opacity-50" />}
                </a>
              ))}
            </div>
          </div>

          <div className="text-sm text-[#273C46]/60 text-right">
            <p>AT-442172-A</p>
            <p className="mt-1">© 2026 Villa Berg</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
