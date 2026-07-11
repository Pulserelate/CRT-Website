import { galleryItems } from '../data/content'
import './Gallery.css'

export function Gallery() {
  const empty = galleryItems.length === 0

  return (
    <div className="gallery page-enter">
      <div className="page-shell">
        <header className="page-header">
          <p className="section-kicker">On track</p>
          <h1 className="section-title">Gallery</h1>
          <p className="page-header__text">
            Moments from practice, race weekends, and everything in between. Photos will land here as
            the season unfolds.
          </p>
        </header>

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
          <ul className="gallery__grid">
            {galleryItems.map((item) => (
              <li key={item.src} className="gallery__item">
                <figure>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
