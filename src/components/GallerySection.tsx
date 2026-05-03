import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { useInViewAnimation } from '../hooks/useInViewAnimation'

const BASE = 'https://raw.githubusercontent.com/stevenberg92/Villa-huegel/main/Villa%20Berg%20guzmann/Bilder/'
const ROOT = 'https://raw.githubusercontent.com/stevenberg92/Villa-huegel/main/Villa%20Berg%20guzmann/'

const PHOTOS = [
  { src: `${BASE}ChatGPT%20Image%2029.%20Apr.%202026%2C%2019_34_35.png`, label: 'Pool', cat: 'Außen' },
  { src: `${BASE}Au%C3%9Fenansicht.jpg`, label: 'Außenansicht', cat: 'Außen' },
  { src: `${BASE}Au%C3%9Fen%202.jpg`, label: 'Gartenanlage', cat: 'Außen' },
  { src: `${BASE}au%C3%9Fen3.jpg`, label: 'Terrasse', cat: 'Außen' },
  { src: `${BASE}au%C3%9Fen4.jpg`, label: 'Einfahrt', cat: 'Außen' },
  { src: `${BASE}ChatGPT%20Image%2029.%20Apr.%202026%2C%2019_29_12.png`, label: 'Pool & Liegestühle', cat: 'Außen' },
  { src: `${BASE}wohnbereich.jpg`, label: 'Wohnzimmer', cat: 'Innen' },
  { src: `${BASE}wohn%20ess.jpg`, label: 'Wohn-Essbereich', cat: 'Innen' },
  { src: `${BASE}wohn2.jpg`, label: 'Lounge', cat: 'Innen' },
  { src: `${BASE}K%C3%BCche.jpg`, label: 'Küche', cat: 'Innen' },
  { src: `${BASE}k%C3%BCche%202.jpg`, label: 'Küche 2', cat: 'Innen' },
  { src: `${BASE}essen.jpg`, label: 'Essbereich', cat: 'Innen' },
  { src: `${BASE}Schlafzimmer%20poolblick.jpg`, label: 'Suite mit Poolblick', cat: 'Schlafzimmer' },
  { src: `${BASE}Schlafzimmer%202.jpg`, label: 'Schlafzimmer 2', cat: 'Schlafzimmer' },
  { src: `${BASE}Schlafzimmer%203.jpg`, label: 'Schlafzimmer 3', cat: 'Schlafzimmer' },
  { src: `${BASE}Schlafzimmer%20poolhaus%20%2B%20separates%20bad.jpg`, label: 'Poolhaus Suite', cat: 'Schlafzimmer' },
  { src: `${BASE}Bad%202.jpg`, label: 'Badezimmer', cat: 'Innen' },
  { src: `${BASE}view.jpg`, label: 'Bergblick', cat: 'Außen' },
  { src: `${ROOT}Cala%20Advocat.png`, label: 'Cala Advocat', cat: 'Umgebung' },
  { src: `${ROOT}Club%20de%20Golf%20Ifach.png`, label: 'Golf Ifach', cat: 'Umgebung' },
  { src: `${BASE}Moraira%20strand.jpg`, label: 'Moraira Strand', cat: 'Umgebung' },
  { src: `${BASE}moraira%20stadt.jpg`, label: 'Moraira', cat: 'Umgebung' },
]

const CATS = ['Alle', 'Außen', 'Innen', 'Schlafzimmer', 'Umgebung']

export default function GallerySection() {
  const { ref, inView } = useInViewAnimation()
  const [activeCat, setActiveCat] = useState('Alle')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = activeCat === 'Alle' ? PHOTOS : PHOTOS.filter(p => p.cat === activeCat)

  const openLightbox = (idx: number) => { setLightbox(idx); document.body.style.overflow = 'hidden' }
  const closeLightbox = useCallback(() => { setLightbox(null); document.body.style.overflow = '' }, [])
  const prev = useCallback(() => setLightbox(i => i === null ? null : (i - 1 + filtered.length) % filtered.length), [filtered.length])
  const next = useCallback(() => setLightbox(i => i === null ? null : (i + 1) % filtered.length), [filtered.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeLightbox, prev, next])

  // Close if category changes & lightbox open
  useEffect(() => { if (lightbox !== null && lightbox >= filtered.length) closeLightbox() }, [activeCat, filtered.length, lightbox, closeLightbox])

  return (
    <section id="galerie" className="py-20 px-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div ref={ref as React.RefObject<HTMLDivElement>} className={`mb-10 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <p className="text-xs font-mono tracking-[0.22em] text-[#D4A574] uppercase mb-3">Galerie</p>
        <h2 className="text-[32px] md:text-[44px] leading-[1.1] tracking-tight text-[#0D212C]">
          Jeder Raum,<br />ein <span className="font-serif italic">Erlebnis</span>
        </h2>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATS.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-none border ${
              activeCat === cat
                ? 'bg-[#051A24] text-white border-[#051A24]'
                : 'bg-white text-[#051A24] border-[#051A24]/15 hover:border-[#D4A574] hover:text-[#D4A574]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((photo, i) => (
          <div
            key={`${activeCat}-${i}`}
            className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-md cursor-none transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            onClick={() => openLightbox(i)}
            style={{ animationDelay: `${(i % 6) * 0.06}s` }}
          >
            <img
              src={photo.src}
              alt={photo.label}
              loading="lazy"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#051A24]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
              <span className="text-white text-sm font-medium">{photo.label}</span>
              <ZoomIn className="w-5 h-5 text-white/80" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white cursor-none z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-none z-10 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-none z-10 transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-5xl w-full px-4">
            <img
              src={filtered[lightbox]?.src}
              alt={filtered[lightbox]?.label}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="text-center mt-4 text-white/70 text-sm">
              {filtered[lightbox]?.label} &nbsp;·&nbsp; {lightbox + 1} / {filtered.length}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
