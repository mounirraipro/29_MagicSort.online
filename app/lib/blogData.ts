export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  icon: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

export interface BlogSource {
  id: number;
  text: string;
  url?: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'water-sort-strategy',
    title: 'Magic Sort Strategy: 7 Simple Habits That Make Levels Easier',
    excerpt: 'A practical guide to reading bottles, protecting empty space, and making cleaner pours without overthinking every move.',
    icon: '💧',
    date: 'March 12, 2026',
    readTime: '7 min read',
    category: 'Strategy',
    content: `
      <h2>Start With Space, Not Speed</h2>
      <p>The fastest way to get stuck in Magic Sort is to treat every legal move like a good move. The game rewards patience more than momentum. Empty bottles are your flexibility, so your first job is protecting space and using it deliberately.</p>
      <h3>What Actually Helps</h3>
      <ol>
        <li><strong>Save empty bottles for real problems.</strong> They are tools, not decoration.</li>
        <li><strong>Stack clean matches early.</strong> If two top colors already belong together, that is usually useful progress.</li>
        <li><strong>Watch the second layer.</strong> The top color matters, but the hidden layer often decides the next route.</li>
        <li><strong>Finish colors when you can.</strong> A completed cup removes noise from the level.</li>
        <li><strong>Restart sooner.</strong> A quick reset is better than forcing a dead layout.</li>
      </ol>
      <p>The goal is not to make the flashiest move. It is to leave the board cleaner than you found it.</p>
    `,
  },
  {
    slug: 'why-water-sorting-feels-good',
    title: 'Why Liquid Sorting Feels So Satisfying',
    excerpt: 'A look at why clear rules, visible progress, and tiny wins make water sorting games unusually easy to settle into.',
    icon: '✨',
    date: 'March 11, 2026',
    readTime: '6 min read',
    category: 'Science',
    content: `
      <h2>Clean Problems Are Comfortable Problems</h2>
      <p>Water sorting feels good because the goal is instantly readable. You do not need a long tutorial to understand that mixed colors should become clean single-color cups. That clarity lowers friction and lets your attention move straight into problem-solving.</p>
      <h3>Why It Clicks</h3>
      <p>Each good move creates visible order. You free space, complete a stack, or uncover a hidden color. That kind of feedback matters because the brain responds well to small, legible progress. The puzzle stays interesting, but the reward signal arrives often enough to keep the experience light.</p>
      <p>Magic Sort leans into that loop. The rules stay simple, the levels stay readable, and the satisfaction comes from watching chaos slowly turn tidy.</p>
    `,
  },
  {
    slug: 'screen-time-guide',
    title: 'A Parent Guide to Calm Screen Time and Sorting Games',
    excerpt: 'How to think about quality, pacing, and attention when a child spends time with browser-based puzzle games.',
    icon: '📱',
    date: 'March 10, 2026',
    readTime: '8 min read',
    category: 'Family',
    content: `
      <h2>Quality Matters More Than Raw Minutes</h2>
      <p>Not all screen time asks the same thing from a child. A calm sorting game can invite observation, patience, and retrying. A noisy feed often pushes the opposite: speed, distraction, and endless switching.</p>
      <h3>What Parents Can Look For</h3>
      <ul>
        <li>clear goals that make sense quickly,</li>
        <li>time to think without countdown pressure,</li>
        <li>simple rules instead of manipulative reward loops,</li>
        <li>little or no social pressure,</li>
        <li>space for shared play and conversation.</li>
      </ul>
      <p>Magic Sort works best when it stays a short, calm part of a balanced routine rather than a noisy default activity.</p>
    `,
  },
  {
    slug: 'daily-reset-routine',
    title: 'Build a Daily Magic Sort Reset That Actually Sticks',
    excerpt: 'A small routine for turning one or two sorting levels into a reliable focus break instead of another random tab.',
    icon: '🗓️',
    date: 'March 9, 2026',
    readTime: '7 min read',
    category: 'Strategy',
    content: `
      <h2>Keep the Habit Smaller Than Your Ambition</h2>
      <p>The easiest way to make a browser game part of your day is to keep the routine modest. One level after lunch, a short session after work, or ten quiet minutes before evening downtime is enough.</p>
      <h3>A Simple Formula</h3>
      <ol>
        <li>Pick one reliable cue.</li>
        <li>Play one or two levels, not ten.</li>
        <li>Mute distractions before you begin.</li>
        <li>Stop while the session still feels good.</li>
      </ol>
      <p>That is usually how Magic Sort works best: short, repeatable, and easy to revisit tomorrow.</p>
    `,
  },
  {
    slug: 'family-water-sorting-guide',
    title: 'Using Magic Sort as a Light Family Puzzle Activity',
    excerpt: 'How to co-play, talk through moves, and keep a sorting game helpful instead of frustrating for younger players.',
    icon: '👨‍👩‍👧‍👦',
    date: 'March 8, 2026',
    readTime: '7 min read',
    category: 'Family',
    content: `
      <h2>Shared Play Changes the Experience</h2>
      <p>When adults and children solve a level together, the game becomes more than solo screen time. It turns into conversation, patience practice, and collaborative problem-solving.</p>
      <h3>Simple Ways to Co-Play</h3>
      <ul>
        <li>ask what color should move next,</li>
        <li>name why an empty cup matters,</li>
        <li>pause before tapping so the child can think aloud,</li>
        <li>treat restarts as part of learning, not failure.</li>
      </ul>
      <p>The calmer the adult feels, the calmer the session usually becomes.</p>
    `,
  },
  {
    slug: 'color-sort-mistakes',
    title: '5 Common Magic Sort Mistakes New Players Make',
    excerpt: 'The quickest ways to tangle a level, plus what to do instead when the layout starts getting messy.',
    icon: '⚠️',
    date: 'March 7, 2026',
    readTime: '6 min read',
    category: 'Strategy',
    content: `
      <h2>Most Bad Positions Start Small</h2>
      <p>Players rarely lose a Magic Sort level because of one dramatic mistake. More often, they lose it through a series of harmless-looking pours that quietly remove flexibility.</p>
      <h3>The Usual Problems</h3>
      <ul>
        <li>using an empty cup too early,</li>
        <li>burying a color you will need next,</li>
        <li>chasing one stack while ignoring easier progress,</li>
        <li>playing faster after getting stuck,</li>
        <li>refusing to restart a dead layout.</li>
      </ul>
      <p>If you can spot those five habits, your levels usually start feeling clearer immediately.</p>
    `,
  },
  {
    slug: 'how-level-difficulty-feels',
    title: 'How Magic Sort Difficulty Changes the Way You Think',
    excerpt: 'Why easier levels build reading skills, while harder ones test memory, space control, and patience.',
    icon: '📈',
    date: 'March 6, 2026',
    readTime: '8 min read',
    category: 'Science',
    content: `
      <h2>Harder Does Not Always Mean Better</h2>
      <p>Easy levels are useful because they teach recognition and flow. Harder levels matter because they ask you to plan further ahead. Both are valuable, but they train different parts of your play.</p>
      <h3>What Changes as Levels Tighten Up</h3>
      <p>Later Magic Sort layouts ask you to remember buried colors, respect empty space more carefully, and recover from mistakes without panicking. The challenge shifts from "Can I see the next move?" to "Can I protect the next three moves?"</p>
      <p>The best practice is rarely the hardest possible level. It is the level that still teaches you something useful.</p>
    `,
  },
  {
    slug: 'browser-game-quality-checklist',
    title: 'A Simple Checklist for Judging Browser Puzzle Games',
    excerpt: 'What to look for in a browser game if you care about quality, trust, support pages, and a clean ad experience.',
    icon: '✅',
    date: 'March 5, 2026',
    readTime: '8 min read',
    category: 'Reviews',
    content: `
      <h2>Good Browser Games Feel Intentional</h2>
      <p>You can usually tell within ten minutes whether a browser game was built with care. The rules make sense, the controls feel stable, the site explains itself, and the ads do not drown the game.</p>
      <h3>A Quick Review List</h3>
      <ul>
        <li>clear objective,</li>
        <li>reliable touch and click controls,</li>
        <li>fair difficulty,</li>
        <li>visible policy and support pages,</li>
        <li>original copy that explains the game honestly.</li>
      </ul>
      <p>Magic Sort aims to keep those basics clean because trust on the page matters almost as much as the game itself.</p>
    `,
  },
];

const scienceSources: BlogSource[] = [
  { id: 1, text: 'American Psychological Association: attention', url: 'https://www.apa.org/topics/attention' },
  { id: 2, text: 'Encyclopaedia Britannica: flow', url: 'https://www.britannica.com/science/flow-psychology' },
  { id: 3, text: 'National Institute of Mental Health: caring for your mental health', url: 'https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health' },
];

const strategySources: BlogSource[] = [
  { id: 1, text: 'American Psychological Association: building better habits', url: 'https://www.apa.org/topics/behavioral-health' },
  { id: 2, text: 'Encyclopaedia Britannica: flow', url: 'https://www.britannica.com/science/flow-psychology' },
  { id: 3, text: 'American Psychological Association: attention', url: 'https://www.apa.org/topics/attention' },
];

const familySources: BlogSource[] = [
  { id: 1, text: 'HealthyChildren.org: create your family media plan', url: 'https://www.healthychildren.org/English/media/Pages/default.aspx' },
  { id: 2, text: 'CDC: developmental milestones', url: 'https://www.cdc.gov/ncbddd/actearly/milestones/index.html' },
  { id: 3, text: 'American Academy of Pediatrics: digital media guidance', url: 'https://publications.aap.org/pediatrics/article/138/5/e20162591/60349/Media-and-Young-Minds' },
];

const reviewSources: BlogSource[] = [
  { id: 1, text: 'Google Safety Center: privacy and security tips', url: 'https://safety.google/security/security-tips/' },
  { id: 2, text: 'Mozilla Foundation: privacy not included', url: 'https://foundation.mozilla.org/en/privacynotincluded/' },
  { id: 3, text: 'HealthyChildren.org: digital media use and quality', url: 'https://www.healthychildren.org/English/media/Pages/default.aspx' },
];

export const postSources: Record<string, BlogSource[]> = {
  'water-sort-strategy': strategySources,
  'why-water-sorting-feels-good': scienceSources,
  'screen-time-guide': familySources,
  'daily-reset-routine': strategySources,
  'family-water-sorting-guide': familySources,
  'color-sort-mistakes': strategySources,
  'how-level-difficulty-feels': scienceSources,
  'browser-game-quality-checklist': reviewSources,
};
