import { useEffect, useState } from 'react'
import type { PageId } from '../data/content'
import { navItems } from '../data/content'
import './Nav.css'

type NavProps = {
  page: PageId
  onNavigate: (page: PageId) => void
}

export function Nav({ page, onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [page])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <button
          type="button"
          className="nav__brand"
          onClick={() => onNavigate('home')}
          aria-label="Chimera Racing Team home"
        >
          <img src="/logo.png" alt="" className="nav__logo" width={40} height={40} />
          <span className="nav__brand-text">
            Chimera <span>Racing Team</span>
          </span>
        </button>

        <button
          type="button"
          className={`nav__toggle ${open ? 'nav__toggle--open' : ''}`}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="site-nav" className={`nav__links ${open ? 'nav__links--open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav__link ${page === item.id ? 'nav__link--active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
