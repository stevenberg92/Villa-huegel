import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useInViewAnimation } from '../hooks/useInViewAnimation'

const TESTIMONIALS = [
  {
    text: 'Die Villa ist wirklich ein Zufluchtsort. Die Gegend war ruhig, der Pool perfekt und der Service war großartig. Absolut zu empfehlen!',
    name: 'Beth',
    role: 'Airbnb-Gast · September 2025',
    avatar: 'B',
  },
  {
    text: 'Unser Aufenthalt war ausgezeichnet! Das Haus ist sehr angenehm, mit tollem Pool und ruhigem Außenbereich. Wöchentlicher Poolservice inklusive – ein wichtiges Detail!',
    name: 'Ruben',
    role: 'Airbnb-Gast · September 2025',
    avatar: 'R',
  },
  {
    text: 'Die Villa ist wirklich wie beschrieben – schöne Aussicht, gute Kommunikation mit dem Gastgeber. Wir hatten einen fantastischen Urlaub.',
    name: 'Fraser',
    role: 'Airbnb-Gast · August 2025',
    avatar: 'F',
  },
  {
    text: 'Wir fühlten uns sehr wohl. Alle kleinen Wünsche wurden sofort erfüllt. Moskitonetze und Klimaanlage – perfekt durchgedacht.',
    name: 'Blanca Catalina',
    role: 'Airbnb-Gast · Juli 2025',
    avatar: 'BC',
  },
  {
    text: 'Die Fotos sind zutreffend und die Küche ist wirklich vollständig ausgestattet. Ein makelloser Ort für eine Familienwoche in Spanien.',
    name: 'Nathan',
    role: 'Airbnb-Gast · August 2024',
    avatar: 'N',
  },
]

const ALL = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

export default function TestimonialCarousel() {
  const { ref, inView } = useInViewAnimation()
  const [index, setIndex] = useState(TESTIMONIALS.length)
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback((next: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setIndex(next)
    setTimeout(() => setIsAnimating(false), 820)
  }, [isAnimating])

  const advance = useCallback(() => goTo(index + 1), [index, goTo])

  useEffect(() => {
    if (isHovered) return
    timerRef.current = setTimeout(advance, 3500)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [advance, isHovered])

  // Infinite reset without jump
  useEffect(() => {
    if (index >= TESTIMONIALS.length * 2) setIndex(index - TESTIMONIALS.length)
    if (index < TESTIMONIALS.length) setIndex(index + TESTIMONIALS.length)
  }, [index])

  const CARD_W = 427.5
  const GAP = 24

  return (
    <section className="w-full py-20 overflow-hidden">
      {/* Header */}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`px-6 max-w-4xl ml-auto mr-0 flex items-center justify-between mb-10 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      >
        <h2 className="text-[28px] md:text-[36px] leading-[1.1] tracking-tight text-[#0D212C]">
          Was unsere<br /><span className="font-serif italic">Gäste</span> sagen
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#D4A574] text-[#D4A574]" />
            ))}
          </div>
          <span className="text-sm font-medium text-[#051A24]">4,75 / 5</span>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="relative px-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(calc(50vw - ${CARD_W / 2}px - ${index * (CARD_W + GAP)}px))`,
            transition: isAnimating ? 'transform 0.8s cubic-bezier(0.4,0,0.2,1)' : 'none',
            gap: `${GAP}px`,
          }}
        >
          {ALL.map((t, i) => {
            const isActive = i === index
            return (
              <div
                key={i}
                className="flex-shrink-0"
                style={{ width: CARD_W }}
                onClick={() => goTo(i)}
              >
                <div className={`bg-white rounded-[36px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-8 md:px-10 py-8 transition-all duration-500 cursor-none ${isActive ? 'scale-100 opacity-100' : 'scale-[0.95] opacity-50'}`}>
                  {/* Quote mark */}
                  <svg className="w-8 h-8 text-[#D4A574] mb-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.016.66-1.066 1.515-1.867 2.558-2.403L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.346 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003z"/>
                  </svg>
                  <p className="text-base text-[#0D212C] leading-relaxed mb-7">{t.text}</p>
                  <div className="flex items-center gap-3 border-t border-black/6 pt-5">
                    <div className="w-11 h-11 rounded-full bg-[#D4A574]/20 flex items-center justify-center text-[#D4A574] font-semibold text-sm flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#051A24]">{t.name}</p>
                      <p className="text-xs text-[#273C46] mt-0.5">→ {t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex justify-center gap-3 mt-8">
        <button
          onClick={() => goTo(index - 1)}
          className="w-12 h-12 rounded-full border border-[#0D212C]/15 hover:border-[#D4A574] bg-white flex items-center justify-center text-[#051A24] hover:text-[#D4A574] transition-all cursor-none shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => goTo(index + 1)}
          className="w-12 h-12 rounded-full border border-[#0D212C]/15 hover:border-[#D4A574] bg-white flex items-center justify-center text-[#051A24] hover:text-[#D4A574] transition-all cursor-none shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}
