'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

const logo = '/naturals-logo.png'
const links = [
  ['The Academy', '/the-academy'],
  ['Courses', '/courses'],
  ['Contact', '/contact'],
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  useEffect(() => {
    if (!open) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      menuButtonRef.current?.focus()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <header id="top" className="site-header">
      <div className="nav-shell">
        <Link href="/" className="brand" aria-label="Naturals Beauty Academy home">
          <Image src={logo} alt="Naturals Beauty Academy" width={176} height={62} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/" aria-current={isActive('/') ? 'page' : undefined}>Home</Link>
          {links.map(([label, href]) => <Link key={href} href={href} aria-current={isActive(href) ? 'page' : undefined}>{label}</Link>)}
        </nav>
        <div className="nav-actions">
          <button ref={menuButtonRef} className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-site-navigation">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <nav id="mobile-site-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
        <Link href="/" onClick={() => setOpen(false)} aria-current={isActive('/') ? 'page' : undefined}>Home</Link>
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={isActive(href) ? 'page' : undefined}>{label}</Link>)}
      </nav>
    </header>
  )
}
