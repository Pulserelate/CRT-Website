import { useEffect, useState } from 'react'
import type { PosterItem } from '../data/content'
import './Posters.css'

const PAGE_SIZE = 12

export function Posters() {
  const [items, setItems] = useState<PosterItem[]>([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch(`${import.meta.env.BASE_URL}data/posters.json`)
      .then((response) => {
        if (!response.ok) throw new Error('Could not load posters.')
        return response.json() as Promise<PosterItem[]>
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
    <div className="posters page-enter">
      <div className="page-shell">
        <header className="page-header">
          <p className="section-kicker">Race week art</p>
          <h1 className="section-title">Posters</h1>
          <p className="page-header__text">
            Event graphics and lineup reveals from Chimera race weekends.
          </p>
        </header>

        {loading ? (
          <p className="media-status" role="status">
            Loading posters…
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
            <h2>No posters yet</h2>
            <p>Event posters and promo graphics will appear here.</p>
          </div>
        ) : (
          <>
            <ul className="posters__list">
              {visibleItems.map((item) => (
                <li key={item.src} className="posters__item">
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
                  Load more posters
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
