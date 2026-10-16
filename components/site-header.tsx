'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const logo = '/naturals-logo.png'
const links = [
  ['The Academy', '/the-academy'],
  ['Courses', '/courses'],
  ['Contact', '/contact'],
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header id="top" className="site-header">
      <div className="nav-shell">
        <Link href="/" className="brand" aria-label="Naturals Beauty Academy home">
          <img src={logo} alt="Naturals Beauty Academy" />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/" aria-current={isActive('/') ? 'page' : undefined}>Home</Link>
          {links.map(([label, href]) => <Link key={href} href={href} aria-current={isActive(href) ? 'page' : undefined}>{label}</Link>)}
        </nav>
        <div className="nav-actions">
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link href="/" onClick={() => setOpen(false)} aria-current={isActive('/') ? 'page' : undefined}>Home</Link>
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={isActive(href) ? 'page' : undefined}>{label}</Link>)}
        </nav>
      )}
    </header>
  )
}
