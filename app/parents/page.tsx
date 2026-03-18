import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Parents & Safety Guide',
    description: 'Learn how Magic Sort approaches family-friendly design, children’s use, ads, and privacy in a browser-based sorting game.',
    keywords: ['Magic Sort for kids', 'safe sorting game', 'children online safety', 'family friendly games'],
    alternates: {
        canonical: '/parents',
    },
};

export default function ParentsPage() {
    return (
        <>
            <div className="page-header"><div className="container"><h1 className="gradient-text">Parents &amp; Safety Guide</h1><p>What families should know about Magic Sort, from gameplay and ads to privacy expectations.</p></div></div>
            <div className="page-content">
                <h2>A Family-Friendly Puzzle Site, Not a Social Platform</h2><p>Magic Sort is designed as a browser-based sorting experience. The site does not include public profiles, chat rooms, or user-generated social spaces.</p>
                <h2>What Children Can Do on the Site</h2><p>Children can play the game and read basic help content. There is no account creation requirement to start playing.</p>
                <h2>What Parents Should Still Know</h2><p>We still encourage parents and guardians to supervise use, especially for younger children. Browser environments can involve ads, links, and general internet access outside the game itself.</p>
                <h2>How Magic Sort Tries to Stay Age-Appropriate</h2><ul><li>The core mechanic is visual and non-violent.</li><li>The site does not require account registration.</li><li>There are no public chat or friend systems.</li><li>The game focuses on observation, patience, and planning.</li></ul>
                <h2>Advertising and Children</h2><p>Magic Sort may display ads from third-party providers such as Google AdSense to support the free site. Parents should review browser privacy settings and use parental controls where needed.</p>
                <h2>Privacy Expectations for Families</h2><p>Children do not need to create accounts to play Magic Sort. Some limited technical data may still be processed by hosting infrastructure or advertising providers, and simple browser storage may be used for local gameplay state.</p>
                <h2>How to Decide If the Game Fits Your Child</h2><p>A short shared session is often the best test. Ask whether the child understood the goal, whether matching bottle colors felt calm or frustrating, and whether the session encouraged thinking rather than impulsive tapping.</p>
                <h2>Helpful Ways to Use Magic Sort With Children</h2><ol><li><strong>Co-play first:</strong> spend a few minutes sorting together.</li><li><strong>Keep sessions short:</strong> calmer, shorter sessions are usually better.</li><li><strong>Talk through strategy:</strong> naming colors, empty bottles, and next steps turns play into guided problem-solving.</li><li><strong>Use the game as one part of a balanced routine:</strong> browser play should complement offline play, reading, and rest.</li></ol>
                <h2>Questions or Concerns?</h2><p>If you have a family-safety, accessibility, or privacy concern, please use the <a href="/contact">Contact page</a>.</p>
            </div>
        </>
    );
}
