import { teamRosters } from '../data/content'
import type { TeamMember } from '../data/content'
import './Team.css'

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <li className="team__member">
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
        <h3 className="team__name">
          {member.name}
          {member.flag ? (
            <span className="team__flag" aria-hidden="true">
              {member.flag}
            </span>
          ) : null}
        </h3>
        {member.bio ? <p className="team__bio">{member.bio}</p> : null}
      </div>
    </li>
  )
}

export function Team() {
  const empty = teamRosters.every((roster) => roster.members.length === 0)

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
          <div className="team__rosters">
            {teamRosters.map((roster) =>
              roster.members.length === 0 ? null : (
                <section key={roster.title} className="team__roster" aria-labelledby={`roster-${roster.title}`}>
                  <h2 id={`roster-${roster.title}`} className="team__roster-title">
                    {roster.title}
                  </h2>
                  <ul className="team__list">
                    {roster.members.map((member) => (
                      <MemberCard key={`${roster.title}-${member.name}`} member={member} />
                    ))}
                  </ul>
                </section>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}
