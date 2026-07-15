export type PageId = 'home' | 'gallery' | 'posters' | 'results' | 'team'

export const navItems: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'posters', label: 'Posters' },
  { id: 'results', label: 'Results' },
  { id: 'team', label: 'Team' },
]

export const about = {
  founded: '2025',
  tagline: 'Born from myth. Built for the grid.',
  lead:
    'Chimera Racing Team is an online esports racing squad competing across sim platforms with one standard: clean pace, sharp racecraft, and a shared drive to climb every championship ladder we enter.',
  paragraphs: [
    'Named for the legendary creature of lion, goat, and serpent, CRT brings together drivers who refuse a single identity. We adapt to every circuit, every car, and every series — fierce in wheel-to-wheel battles, disciplined in practice, and united under one crest.',
    'Whether we are grinding qualifying laps late into the night or lining up for a multi-hour endurance stint, the goal is the same: represent the Chimera with pride and leave nothing on the table.',
  ],
  pillars: [
    {
      title: 'Racecraft',
      text: 'Fair fights, smart overtakes, and respect for the field — speed without chaos.',
    },
    {
      title: 'Preparation',
      text: 'Setup work, telemetry review, and practice sessions that turn raw pace into results.',
    },
    {
      title: 'Brotherhood',
      text: 'A crew that shares knowledge, lifts each other mid-race, and celebrates every podium together.',
    },
  ],
}

/** Race photos are loaded from /public/data/gallery.json (see scripts/sync-iracing-media.py). */
export type GalleryItem = {
  src: string
  caption: string
  alt: string
}

/** Event posters are loaded from /public/data/posters.json (see scripts/sync-iracing-media.py). */
export type PosterItem = {
  src: string
  caption: string
  alt: string
}

/** Race results live in ./results.ts */
export type { RaceEntry, RaceResult } from './results'
export { raceResults } from './results'

/** Add bios/images later. Example:
 *  { name: 'Driver Name', role: 'Driver', bio: '...', flag: '🇦🇺', image?: '/team/driver.jpg' }
 */
export type TeamMember = {
  name: string
  role: string
  bio?: string
  flag?: string
  platforms?: string[]
  image?: string
}

export type TeamRoster = {
  title: string
  members: TeamMember[]
}

export const teamRosters: TeamRoster[] = [
  {
    title: 'ACC',
    members: [
      { name: 'Callum Blyth', role: 'Driver', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
      { name: 'Lance Simmons', role: 'Driver', flag: '🇱🇻' },
      { name: 'Kris Deximo', role: 'Driver', flag: '🇵🇭' },
      { name: 'Srinjay Das', role: 'Driver', flag: '🇮🇳' },
      { name: 'Mark Kerkhoff', role: 'Driver', flag: '🇳🇱' },
      { name: 'Leila Bell', role: 'Driver', flag: '🇦🇺' },
      { name: 'Tom Morris-Jones', role: 'Driver', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { name: 'Daniel Scicluna', role: 'Driver', flag: '🇦🇺' },
      { name: 'Blake Brenner', role: 'Driver', flag: '🇦🇺' },
    ],
  },
  {
    title: 'rF2',
    members: [
      { name: 'Chris Davis', role: 'Driver', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', platforms: ['rF2', 'iRacing'] },
      { name: 'Riccardo Busani', role: 'Driver', flag: '🇮🇹' },
      { name: 'Rafael Århem', role: 'Driver', flag: '🇸🇪' },
    ],
  },
  {
    title: 'iRacing',
    members: [
      { name: 'Albert Dreijer', role: 'Captain' },
      { name: 'Adam Lawson7', role: 'Driver' },
      { name: 'Gosha Vershinin', role: 'Driver' },
      { name: 'Kyle Hardaway', role: 'Driver' },
      { name: 'Mateusz Kilian', role: 'Driver' },
      { name: 'Ben Gilroy', role: 'Driver' },
      { name: 'Filippo Ingoglia', role: 'Driver' },
      { name: 'Hamilton Six', role: 'Driver' },
      { name: 'Luca Masera', role: 'Driver' },
      { name: 'Luke Titcombe', role: 'Driver' },
      { name: 'Marc Mas2', role: 'Driver' },
      { name: 'Nathan Barratt', role: 'Driver' },
      { name: 'Raihan Chowdhury', role: 'Driver' },
      { name: 'Travis L Austin', role: 'Driver' },
    ],
  },
]

/** @deprecated Use teamRosters — kept for member count checks */
export const teamMembers: TeamMember[] = teamRosters.flatMap((roster) => roster.members)
