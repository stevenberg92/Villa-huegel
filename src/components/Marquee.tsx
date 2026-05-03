const BASE = 'https://raw.githubusercontent.com/stevenberg92/Villa-huegel/main/Villa%20Berg%20guzmann/Bilder/'

const IMAGES = [
  { src: `${BASE}ChatGPT%20Image%2029.%20Apr.%202026%2C%2019_34_35.png`, label: 'Pool' },
  { src: `${BASE}Au%C3%9Fenansicht.jpg`, label: 'Außenansicht' },
  { src: `${BASE}wohnbereich.jpg`, label: 'Wohnbereich' },
  { src: `${BASE}K%C3%BCche.jpg`, label: 'Küche' },
  { src: `${BASE}Schlafzimmer%20poolblick.jpg`, label: 'Poolblick' },
  { src: `${BASE}essen.jpg`, label: 'Essbereich' },
  { src: `${BASE}ChatGPT%20Image%2029.%20Apr.%202026%2C%2019_29_12.png`, label: 'Terrasse' },
  { src: `${BASE}Au%C3%9Fen%202.jpg`, label: 'Garten' },
]

const ALL = [...IMAGES, ...IMAGES]

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden mt-16 md:mt-20 mb-12 select-none">
      <div className="marquee-track">
        {ALL.map((img, i) => (
          <div key={i} className="flex-shrink-0 mx-3">
            <img
              src={img.src}
              alt={img.label}
              className="h-[220px] md:h-[400px] w-auto rounded-2xl object-cover shadow-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
