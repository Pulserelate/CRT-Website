import { raceResults } from '../data/content'
import type { RaceResult } from '../data/content'
import './Results.css'

function formatDate(value: string) {
  const d = new Date(`${value}T12:00:00`)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function formatDateRange(race: RaceResult) {
  const start = formatDate(race.date)
  if (!race.dateEnd) return start
  return `${start} – ${formatDate(race.dateEnd)}`
}

function yearOf(race: RaceResult) {
  return race.date.slice(0, 4)
}

export function Results() {
  const empty = raceResults.length === 0
  const years = [...new Set(raceResults.map(yearOf))].sort((a, b) => Number(b) - Number(a))

  return (
    <div className="results page-enter">
      <div className="page-shell">
        <header className="page-header">
          <p className="section-kicker">Championship trail</p>
          <h1 className="section-title">Results</h1>
          <p className="page-header__text">
            Chimera race finishes across iRacing, ACC, LMU, and more — car numbers, results, and
            lineups.
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
            <h2>Results coming soon</h2>
            <p>Finishing positions and race notes will be listed here as the season unfolds.</p>
          </div>
        ) : (
          <div className="results__years">
            {years.map((year) => {
              const races = raceResults
                .filter((r) => yearOf(r) === year)
                .slice()
                .sort((a, b) => b.date.localeCompare(a.date))

              return (
                <section key={year} className="results__year">
                  <h2 className="results__year-title">{year}</h2>
                  <ul className="results__list">
                    {races.map((race) => (
                      <li
                        key={`${race.date}-${race.event}-${race.track}-${race.entries.map((e) => e.result).join(',')}`}
                        className="results__race"
                      >
                        <div className="results__race-head">
                          <h3 className="results__event">{race.event}</h3>
                          <p className="results__meta">
                            <span>{formatDateRange(race)}</span>
                            <span aria-hidden="true">·</span>
                            <span>{race.track}</span>
                            <span aria-hidden="true">·</span>
                            <span>{race.length}</span>
                            <span aria-hidden="true">·</span>
                            <span>{race.game}</span>
                          </p>
                        </div>

                        <div className="results__entries-wrap">
                          <table className="results__entries">
                            <thead>
                              <tr>
                                <th scope="col">Car</th>
                                <th scope="col">Result</th>
                                <th scope="col">Drivers</th>
                              </tr>
                            </thead>
                            <tbody>
                              {race.entries.map((entry) => (
                                <tr key={`${entry.car}-${entry.result}-${entry.drivers}`}>
                                  <td className="results__car">{entry.car}</td>
                                  <td className="results__place">{entry.result}</td>
                                  <td>{entry.drivers}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
