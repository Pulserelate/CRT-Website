import { posterItems } from '../data/content'
import './Posters.css'

export function Posters() {
  const empty = posterItems.length === 0

  return (
    <div className="posters page-enter">
      <div className="page-shell">
        <header className="page-header">
          <p className="section-kicker">Race week art</p>
          <h1 className="section-title">Posters</h1>
          <p className="page-header__text">
            Event graphics, lineup reveals, and promo art from Chimera race weekends.
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
            <h2>No posters yet</h2>
            <p>Event posters and promo graphics will appear here.</p>
          </div>
        ) : (
          <ul className="posters__list">
            {posterItems.map((item) => (
              <li key={item.src} className="posters__item">
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
