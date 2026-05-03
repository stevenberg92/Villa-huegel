import Button from './Button'

export default function BottomNav() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-4 bg-white rounded-full px-6 py-2.5"
        style={{ boxShadow: '0 1px 2px rgba(5,26,36,0.08),0 8px 32px rgba(5,26,36,0.12),inset 0 1px 2px rgba(255,255,255,0.9)' }}
      >
        <span className="font-serif text-2xl font-semibold text-[#051A24]" style={{ fontStyle: 'italic' }}>
          VB
        </span>
        <Button href="#buchen" variant="primary" className="py-2 px-5 text-xs">
          Jetzt buchen
        </Button>
      </div>
    </div>
  )
}
