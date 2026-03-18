import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Play Magic Sort - Complete Guide',
    description: 'Learn how to play Magic Sort step by step, from the basic bottle-pouring rules to strategy, planning, and common mistakes.',
    keywords: ['how to play Magic Sort', 'Magic Sort guide', 'liquid sorting strategy guide', 'bottle sort instructions'],
    alternates: {
        canonical: '/how-to-play',
    },
};

export default function HowToPlayPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">How to Play</h1>
                    <p>A full beginner-friendly guide to the rules, rhythm, and strategy behind Magic Sort.</p>
                </div>
            </div>

            <div className="page-content">
                <h2>The Core Goal</h2>
                <p>
                    Magic Sort is a browser puzzle where each bottle starts with mixed layers of liquid color.
                    Your goal is to separate those colors until every filled bottle contains only one color.
                    The puzzle looks simple at first, but the real challenge comes from protecting empty space,
                    reading the top layers correctly, and avoiding pours that trap useful colors too early.
                </p>

                <h2>How a Turn Works</h2>
                <p>
                    Tap one bottle to select it, then tap a second bottle to pour. A move only works if the destination
                    bottle is empty or if its top color matches the color you are pouring. The destination also needs
                    enough open space to receive the liquid.
                </p>
                <p>
                    The game pours matching top layers together automatically, so one move can sometimes clear more
                    space than you expect. That is part of the strategy: you are not only moving color, you are
                    shaping the next few decisions at the same time.
                </p>

                <h2>What Makes a Good Early Move</h2>
                <p>
                    Good starts usually do one of three things: create an empty bottle, stack matching colors together,
                    or uncover a buried color you know you will need next. New players often look only at the move in
                    front of them. Better players look at what the move opens.
                </p>

                <h2>A Simple Beginner Strategy</h2>
                <ol>
                    <li><strong>Protect empty bottles.</strong> Space is your flexibility, so do not waste it casually.</li>
                    <li><strong>Build clean stacks early.</strong> If two top colors already match, that is often your easiest progress.</li>
                    <li><strong>Avoid burying useful colors.</strong> A quick move can cost you three slower moves later.</li>
                    <li><strong>Work in small wins.</strong> Clear one color path, then use the new space to unlock the next.</li>
                    <li><strong>Restart without hesitation.</strong> If the layout gets tangled, a clean reset is often smarter than forcing it.</li>
                </ol>

                <h2>How Difficulty Increases</h2>
                <p>
                    Magic Sort becomes harder by adding more colors, more bottles, and tighter layouts where empty
                    space matters more. Early levels let you learn the pouring rhythm. Later levels ask for longer
                    planning and better memory about what is hidden deeper in each bottle.
                </p>
                <p>
                    The best improvement path is gradual. Use the early levels to learn how space behaves, then move
                    into denser setups once the core rules feel natural.
                </p>

                <h2>Common Mistakes New Players Make</h2>
                <ul>
                    <li><strong>Pouring too quickly:</strong> a legal move is not always a helpful move.</li>
                    <li><strong>Using empty cups carelessly:</strong> once space disappears, good options disappear with it.</li>
                    <li><strong>Chasing one color too hard:</strong> sometimes the smarter move is freeing another stack first.</li>
                    <li><strong>Ignoring buried layers:</strong> the top matters, but the next color down often decides the whole route.</li>
                    <li><strong>Forcing a bad position:</strong> restarting early is better than grinding through a messy state.</li>
                </ul>

                <h2>How to Get Better Faster</h2>
                <p>
                    Improvement in Magic Sort comes from planning and pattern reading, not frantic tapping. Slow down
                    enough to notice why a move helped. Did it free space? Did it finish a color? Did it expose the next
                    bottle you needed? Those small observations turn random clears into repeatable skill.
                </p>
                <p>
                    It also helps to change your focus from session to session. One day, aim for fewer moves. Another,
                    aim for steadier reading and fewer restarts. Different goals sharpen different parts of your play.
                </p>

                <h2>When to Use the Blog</h2>
                <p>
                    Once the basic rules feel easy, the blog becomes more useful. The articles are there to help with
                    strategy, focus, family use, and the habits that make a calm browser game feel worth returning to.
                </p>

                <h2>Ready to Start?</h2>
                <p>
                    If you understand how pouring, matching, and empty space work, you already know enough to play.
                    The rest comes from staying patient and letting the pattern open up.
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                    <Link href="/play" className="btn btn-primary">
                        {'Play Now ->'}
                    </Link>
                </p>
            </div>
        </>
    );
}
