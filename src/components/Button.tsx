import React from 'react'

type Variant = 'primary' | 'secondary' | 'outline'

interface ButtonProps {
  children: React.ReactNode
  variant?: Variant
  href?: string
  onClick?: () => void
  className?: string
}

export default function Button({ children, variant = 'primary', href, onClick, className = '' }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 font-medium text-sm rounded-full px-7 py-3 transition-all duration-200 cursor-none'

  const styles: Record<Variant, string> = {
    primary: 'bg-[#051A24] text-white shadow-[0_1px_2px_0_rgba(5,26,36,0.10),0_4px_4px_0_rgba(5,26,36,0.09),0_9px_6px_0_rgba(5,26,36,0.05),inset_0_2px_8px_0_rgba(255,255,255,0.12)] hover:bg-[#0D212C] active:scale-[0.98]',
    secondary: 'bg-white text-[#051A24] shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_8px_28px_rgba(0,0,0,0.12)] active:scale-[0.98]',
    outline: 'bg-transparent text-[#051A24] border border-[#051A24]/20 hover:border-[#D4A574] hover:text-[#D4A574] active:scale-[0.98]',
  }

  const cls = `${base} ${styles[variant]} ${className}`

  if (href) {
    return <a href={href} className={cls}>{children}</a>
  }
  return <button onClick={onClick} className={cls}>{children}</button>
}
