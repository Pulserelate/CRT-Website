import { flagLabel, teamMembers } from '../data/content'
import type { TeamMember } from '../data/content'
import './Team.css'

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <li className="team__member">
      <p className="team__role">{member.role}</p>
      <h3 className="team__name">
        {member.name}
        {member.flag ? (
          <img
            className="team__flag"
            src={`${import.meta.env.BASE_URL}flags/${member.flag}.svg`}
            alt={flagLabel(member.flag)}
            title={flagLabel(member.flag)}
            width={28}
            height={18}
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </h3>
      <p className="team__platforms">{member.platforms.join(' · ')}</p>
      {member.bio ? <p className="team__bio">{member.bio}</p> : null}
    </li>
  )
}

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
              <MemberCard key={member.name} member={member} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
