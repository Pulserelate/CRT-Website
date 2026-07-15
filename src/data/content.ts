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
 *  { name: 'Driver Name', role: 'Driver', platforms: ['ACC'], bio: '...', flag: '🇦🇺', image?: '/team/driver.jpg' }
 */
export type TeamMember = {
  name: string
  role: string
  bio?: string
  flag?: string
  platforms: string[]
  image?: string
}

export const teamMembers: TeamMember[] = [
  { name: 'Albert Dreijer', role: 'Captain', platforms: ['iRacing'] },
  { name: 'Adam Lawson7', role: 'Driver', platforms: ['iRacing'] },
  { name: 'Ben Gilroy', role: 'Driver', platforms: ['iRacing'] },
  { name: 'Blake Brenner', role: 'Driver', platforms: ['ACC'], flag: '🇦🇺' },
  { name: 'Callum Blyth', role: 'Driver', platforms: ['ACC'], flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { name: 'Chris Davis', role: 'Driver', platforms: ['rF2', 'iRacing'], flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'Daniel Scicluna', role: 'Driver', platforms: ['ACC'], flag: '🇦🇺' },
  { name: 'Filippo Ingoglia', role: 'Driver', platforms: ['iRacing'] },
  { name: 'Gosha Vershinin', role: 'Driver', platforms: ['iRacing'] },
  { name: 'Hamilton Six', role: 'Driver', platforms: ['iRacing'] },
  { name: 'Kris Deximo', role: 'Driver', platforms: ['ACC'], flag: '🇵🇭' },
  { name: 'Kyle Hardaway', role: 'Driver', platforms: ['iRacing'] },
  { name: 'Lance Simmons', role: 'Driver', platforms: ['ACC'], flag: '🇱🇻' },
  { name: 'Leila Bell', role: 'Driver', platforms: ['ACC'], flag: '🇦🇺' },
  { name: 'Luca Masera', role: 'Driver', platforms: ['iRacing'] },
  { name: 'Luke Titcombe', role: 'Driver', platforms: ['iRacing'] },
  { name: 'Marc Mas2', role: 'Driver', platforms: ['iRacing'] },
  { name: 'Mark Kerkhoff', role: 'Driver', platforms: ['ACC'], flag: '🇳🇱' },
  { name: 'Mateusz Kilian', role: 'Driver', platforms: ['iRacing'] },
  { name: 'Nathan Barratt', role: 'Driver', platforms: ['iRacing'] },
  { name: 'Rafael Århem', role: 'Driver', platforms: ['rF2'], flag: '🇸🇪' },
  { name: 'Raihan Chowdhury', role: 'Driver', platforms: ['iRacing'] },
  { name: 'Riccardo Busani', role: 'Driver', platforms: ['rF2'], flag: '🇮🇹' },
  { name: 'Srinjay Das', role: 'Driver', platforms: ['ACC'], flag: '🇮🇳' },
  { name: 'Tom Morris-Jones', role: 'Driver', platforms: ['ACC'], flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'Travis L Austin', role: 'Driver', platforms: ['iRacing'] },
]
