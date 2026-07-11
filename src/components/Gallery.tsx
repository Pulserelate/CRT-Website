import { useEffect, useState } from 'react'
import type { GalleryItem } from '../data/content'
import './Gallery.css'

const PAGE_SIZE = 24

export function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch(`${import.meta.env.BASE_URL}data/gallery.json`)
      .then((response) => {
        if (!response.ok) throw new Error('Could not load gallery images.')
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
    <div className="gallery page-enter">
      <div className="page-shell">
        <header className="page-header">
          <p className="section-kicker">On track</p>
          <h1 className="section-title">Gallery</h1>
          <p className="page-header__text">
            Moments from practice, race weekends, and everything in between.
          </p>
        </header>

        {loading ? (
          <p className="media-status" role="status">
            Loading gallery…
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
            <h2>No photos yet</h2>
            <p>Race shots from practice and race weekends will appear here soon.</p>
          </div>
        ) : (
          <>
            <ul className="gallery__grid">
              {visibleItems.map((item) => (
                <li key={item.src} className="gallery__item">
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
                  Load more photos
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
