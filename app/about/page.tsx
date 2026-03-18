import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - Magic Sort',
    description: 'Learn what Magic Sort is, what this site offers, and the standards we use for puzzle guides, site quality, and player trust.',
    keywords: ['about Magic Sort', 'bottle sorting game site', 'browser puzzle game', 'Magic Sort mission'],
    alternates: {
        canonical: '/about',
    },
};

export default function AboutPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">About Magic Sort</h1>
                    <p>What this site is, why the puzzle works so well in a browser, and what players can expect when they visit.</p>
                </div>
            </div>

            <div className="page-content">
                <h2>What Magic Sort Is</h2>
                <p>
                    Magic Sort is a free browser puzzle focused on bottle-by-bottle liquid sorting. The core loop is
                    simple to understand: move matching colors together until every bottle holds a single clean stack.
                    Instead of pushing players through an app install, account wall, or overbuilt menu, this site keeps
                    the experience direct: open the page, learn the rules quickly, and start playing.
                </p>
                <p>
                    The game suits people who like calm challenge. Some players enjoy tidy logic and pattern reading.
                    Others simply want a short browser break that feels more intentional than passive scrolling. Our goal
                    is to make that kind of puzzle easy to access and worth revisiting.
                </p>

                <h2>What This Site Tries to Do Well</h2>
                <p>
                    Browser game sites are often either noisy or too thin to be useful. Magic Sort aims for something
                    cleaner: a playable game, clear help pages, practical strategy writing, and trust pages that explain
                    how the site works. The point is not only to host a puzzle, but to make the whole visit feel finished
                    and legitimate.
                </p>
                <p>
                    Liquid sorting works especially well in a browser because the goal is easy to read, the progress is
                    visible, and each level feels like a short reset instead of a loud demand for attention. That makes
                    the format a strong fit for phones, tablets, desktops, and quick repeat play.
                </p>

                <h2>What We Care About</h2>
                <p>
                    <strong>Playability first:</strong> the game itself should stay central. Ads, navigation, and
                    supporting content should never make the sorting harder to understand or enjoy.
                </p>
                <p>
                    <strong>Useful supporting content:</strong> we publish notes, guides, and family-facing resources to
                    help people understand the puzzle, choose calmer browser experiences, and think more clearly about
                    digital play.
                </p>
                <p>
                    <strong>Trust and transparency:</strong> we aim to be clear about what the site does, what data it
                    uses, and what players should expect. If a page covers privacy, children, ads, or legal use, it
                    should match the real behavior of the site.
                </p>

                <h2>How We Approach Content</h2>
                <p>
                    Magic Sort includes editorial content because browser game sites feel more useful when they offer
                    real context around the game. Our articles focus on strategy, family use, attention, and the habits
                    that make a calm puzzle worth returning to.
                </p>
                <p>
                    We do not treat the blog as filler for ads. The goal is to publish pages that answer real player
                    questions: how the game works, why certain levels feel hard, how families can use the site, and
                    what makes a browser game feel trustworthy.
                </p>

                <h2>How the Site Supports Itself</h2>
                <p>
                    Magic Sort is free to access. To help cover hosting and maintenance, the site may display ads from
                    third-party providers such as Google AdSense. We try to keep advertising secondary to the actual
                    experience. Legal, safety, and support pages exist to inform users, not to maximize ad inventory.
                </p>

                <h2>What We Do Not Do</h2>
                <ul>
                    <li>We do not require account creation to play.</li>
                    <li>We do not sell premium access to core gameplay.</li>
                    <li>We do not run chat, public profiles, or social posting features on the site.</li>
                    <li>We do not present the site as medical, educational, or therapeutic advice.</li>
                </ul>

                <h2>Who Magic Sort Is For</h2>
                <p>
                    The site is built for casual players, puzzle fans, families looking for calmer browser content, and
                    anyone who wants short sessions of focused problem-solving. Some people use the game as a break
                    between tasks. Some play with children. Some simply enjoy the tidy logic of sorting colors into place.
                </p>

                <h2>Contact and Feedback</h2>
                <p>
                    We treat feedback as part of improving the site. If you spot a broken page, confusing rule,
                    misleading statement, accessibility issue, or privacy concern, please use the <a href="/contact">Contact page</a>.
                    Clear support paths make a site more useful, and they help us keep Magic Sort aligned with the
                    standards we want to publish under.
                </p>
            </div>
        </>
    );
}
