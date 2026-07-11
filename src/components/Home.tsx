import type { PageId } from '../data/content'
import { about } from '../data/content'
import './Home.css'

type HomeProps = {
  onNavigate: (page: PageId) => void
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="home page-enter">
      <section className="hero" aria-label="Chimera Racing Team">
        <div className="poly-bg" aria-hidden="true" />
        <div className="hero__glow" aria-hidden="true" />

        <div className="hero__content">
          <img
            src="/logo.png"
            alt="Chimera Racing Team logo"
            className="hero__logo"
            width={320}
            height={320}
          />
          <h1 className="hero__brand">
            Chimera
            <span>Racing Team</span>
          </h1>
          <p className="hero__tagline">{about.tagline}</p>
          <div className="hero__actions">
            <button type="button" className="btn btn--primary" onClick={() => onNavigate('team')}>
              Meet the team
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => onNavigate('results')}>
              View results
            </button>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll</span>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about__inner">
          <p className="section-kicker">Est. {about.founded}</p>
          <h2 className="section-title">About the team</h2>
          <p className="about__lead">{about.lead}</p>
          <div className="about__copy">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <ul className="pillars">
            {about.pillars.map((pillar, i) => (
              <li key={pillar.title} className="pillar" style={{ animationDelay: `${0.1 * i}s` }}>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
