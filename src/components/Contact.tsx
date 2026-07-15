import { contact } from '../data/content'
import './Contact.css'

export function Contact() {
  const discordReady = Boolean(contact.discordUrl.trim())

  return (
    <div className="contact page-enter">
      <div className="page-shell">
        <header className="page-header">
          <p className="section-kicker">Get in touch</p>
          <h1 className="section-title">Contact</h1>
          <p className="page-header__text">
            Reach the Chimera crew for race invites, recruitment, or partnership chat.
          </p>
        </header>

        <div className="contact__panel">
          <h2 className="contact__heading">Discord</h2>
          <p className="contact__text">
            The team hangs out on Discord — join the server to race with us or say hello.
          </p>

          {discordReady ? (
            <a
              className="btn btn--primary contact__cta"
              href={contact.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Discord
            </a>
          ) : (
            <div className="empty-state contact__empty" role="status">
              <div className="empty-state__frame" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <h2>Discord link coming soon</h2>
              <p>Invite URL will be added here shortly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
