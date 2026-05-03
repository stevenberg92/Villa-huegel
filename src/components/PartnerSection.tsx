import { useRef, useCallback } from 'react'
import Button from './Button'
import { useInViewAnimation } from '../hooks/useInViewAnimation'

const BASE = 'https://raw.githubusercontent.com/stevenberg92/Villa-huegel/main/Villa%20Berg%20guzmann/Bilder/'
const GIFS = [
  `${BASE}ChatGPT%20Image%2029.%20Apr.%202026%2C%2019_34_35.png`,
  `${BASE}Au%C3%9Fenansicht.jpg`,
  `${BASE}wohnbereich.jpg`,
  `${BASE}K%C3%BCche.jpg`,
  `${BASE}Schlafzimmer%20poolblick.jpg`,
  `${BASE}essen.jpg`,
  `${BASE}ChatGPT%20Image%2029.%20Apr.%202026%2C%2019_29_12.png`,
  `${BASE}au%C3%9Fen3.jpg`,
]

export default function PartnerSection() {
  const { ref, inView } = useInViewAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const lastSpawn = useRef(0)
  const gifIndex = useRef(0)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = Date.now()
    if (now - lastSpawn.current < 90) return
    lastSpawn.current = now

    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const img = document.createElement('img')
    img.src = GIFS[gifIndex.current % GIFS.length]
    gifIndex.current++
    img.style.cssText = `
      position:absolute;left:${x}px;top:${y}px;
      width:120px;height:80px;object-fit:cover;
      border-radius:12px;
      transform:translate(-50%,-50%) rotate(${(Math.random() - 0.5) * 20}deg);
      pointer-events:none;z-index:2;
      transition:opacity 0.8s ease,transform 1s ease;
      box-shadow:0 8px 24px rgba(0,0,0,0.15);
    `
    container.appendChild(img)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        img.style.opacity = '0'
        img.style.transform += ' scale(0.8)'
      })
    })
    setTimeout(() => img.remove(), 1100)
  }, [])

  return (
    <section className="w-full py-12 px-6">
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="relative max-w-7xl mx-auto bg-[#FAFAF8] rounded-[40px] py-40 overflow-hidden select-none cursor-none"
        onMouseMove={handleMouseMove}
        style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.06)' }}
      >
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`relative z-10 flex flex-col items-center text-center px-6 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <p className="text-xs font-mono tracking-[0.22em] text-[#D4A574] uppercase mb-6">Buchen</p>
          <h2
            className="font-serif text-[48px] md:text-[64px] lg:text-[80px] leading-[1] text-[#0D212C] mb-10 tracking-tight"
            style={{ fontStyle: 'italic' }}
          >
            Villa Berg buchen
          </h2>
          <p className="text-[#273C46] text-base max-w-md mb-10 leading-relaxed">
            Bewegen Sie die Maus über diesen Bereich und entdecken Sie die Villa.
            Schreiben Sie uns für Ihren Wunschtermin.
          </p>
          <Button href="#buchen" variant="primary" className="text-base px-9 py-4">
            Jetzt anfragen →
          </Button>
        </div>
      </div>
    </section>
  )
}
