import { useEffect, useState } from 'react'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Home } from './components/Home'
import { Liveries } from './components/Liveries'
import { Nav } from './components/Nav'
import { Posters } from './components/Posters'
import { Results } from './components/Results'
import { Team } from './components/Team'
import { navItems, type PageId } from './data/content'

const validPages = new Set<string>(navItems.map((item) => item.id))

function parseHash(): PageId {
  const hash = window.location.hash.replace(/^#/, '').toLowerCase()
  if (validPages.has(hash)) return hash as PageId
  return 'home'
}

function syncHash(next: PageId) {
  const nextHash = next === 'home' ? '' : `#${next}`
  if (window.location.hash === nextHash) return

  if (next === 'home') {
    const { pathname, search } = window.location
    history.pushState(null, '', `${pathname}${search}`)
    return
  }

  window.location.hash = next
}

export default function App() {
  const [page, setPage] = useState<PageId>(() =>
    typeof window !== 'undefined' ? parseHash() : 'home',
  )

  useEffect(() => {
    const syncFromLocation = () => setPage(parseHash())
    window.addEventListener('hashchange', syncFromLocation)
    window.addEventListener('popstate', syncFromLocation)
    return () => {
      window.removeEventListener('hashchange', syncFromLocation)
      window.removeEventListener('popstate', syncFromLocation)
    }
  }, [])

  const navigate = (next: PageId) => {
    setPage(next)
    syncHash(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Nav page={page} onNavigate={navigate} />
      <main>
        {page === 'home' && <Home onNavigate={navigate} />}
        {page === 'gallery' && <Gallery />}
        {page === 'liveries' && <Liveries />}
        {page === 'posters' && <Posters />}
        {page === 'results' && <Results />}
        {page === 'team' && <Team />}
        {page === 'contact' && <Contact />}
      </main>
      <Footer />
    </>
  )
}
