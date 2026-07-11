import { teamMembers } from '../data/content'
import './Team.css'

export function Team() {
  const empty = teamMembers.length === 0

  return (
    <div className="team page-enter">
      <div className="page-shell">
        <header className="page-header">
          <p className="section-kicker">The crew</p>
          <h1 className="section-title">Team</h1>
          <p className="page-header__text">
            The drivers behind the Chimera crest. Bios coming soon.
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
            <h2>Roster coming soon</h2>
            <p>Driver and crew bios will live here once the roster is ready to publish.</p>
          </div>
        ) : (
          <ul className="team__list">
            {teamMembers.map((member) => (
              <li key={member.name} className="team__member">
                <div className="team__portrait">
                  {member.image ? (
                    <img src={member.image} alt="" />
                  ) : (
                    <div className="team__portrait-fallback" aria-hidden="true">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                  )}
                </div>
                <div className="team__info">
                  <p className="team__role">{member.role}</p>
                  <h2 className="team__name">{member.name}</h2>
                  {member.bio ? <p className="team__bio">{member.bio}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
