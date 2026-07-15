import { useEffect, useState } from 'react'
import type { GalleryItem } from '../data/content'
import './Liveries.css'

const PAGE_SIZE = 24

export function Liveries() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch(`${import.meta.env.BASE_URL}data/liveries.json`)
      .then((response) => {
        if (!response.ok) throw new Error('Could not load livery images.')
        return response.json() as Promise<GalleryItem[]>
      })
      .then((data) => {
        if (!cancelled) setItems(data)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const visibleItems = items.slice(0, visibleCount)
  const empty = !loading && !error && items.length === 0
  const hasMore = visibleCount < items.length

  return (
    <div className="liveries page-enter">
      <div className="page-shell">
        <header className="page-header">
          <p className="section-kicker">Paint schemes</p>
          <h1 className="section-title">Liveries</h1>
          <p className="page-header__text">
            Chimera liveries across the cars and series we race.
          </p>
        </header>

        {loading ? (
          <p className="media-status" role="status">
            Loading liveries…
          </p>
        ) : null}

        {error ? (
          <p className="media-status media-status--error" role="alert">
            {error}
          </p>
        ) : null}

        {empty ? (
          <div className="empty-state" role="status">
            <div className="empty-state__frame" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <h2>Liveries coming soon</h2>
            <p>Car liveries and paint schemes will appear here shortly.</p>
          </div>
        ) : (
          <>
            <ul className="liveries__grid">
              {visibleItems.map((item) => (
                <li key={item.src} className="liveries__item">
                  <figure>
                    <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                    {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                  </figure>
                </li>
              ))}
            </ul>

            {hasMore ? (
              <div className="media-more">
                <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                  Load more liveries
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
