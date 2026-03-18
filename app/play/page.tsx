import type { Metadata } from 'next';
import AdSlot from '../components/AdSlot';
import GameEmbedActions from '../components/GameEmbedActions';

export const metadata: Metadata = {
    title: 'Play Magic Sort - Free Online Bottle Sorting Puzzle',
    description: 'Play Magic Sort free. Sort mixed liquid colors, free up empty bottles, and clear each level right in the browser.',
    keywords: ['play Magic Sort', 'bottle sorting game online', 'liquid sort puzzle', 'color sort puzzle', 'play puzzle online'],
};

type PlayPageProps = {
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PlayPage({ searchParams }: PlayPageProps) {
    void searchParams;

    return (
        <>
            <div className="play-layout">
                <aside className="play-sidebar">
                    <div className="ad-vertical">
                        <div className="ad-slot ad-slot-vertical">Ad</div>
                    </div>
                </aside>

                <main className="play-main">
                    <div className="play-frame-shell">
                        <div id="play-game-frame" className="play-frame-card">
                            <iframe
                                src="/game/index.html"
                                title="Magic Sort Game"
                                className="play-iframe"
                                allow="autoplay"
                                loading="lazy"
                            />
                        </div>
                        <GameEmbedActions targetId="play-game-frame" shareUrl="/play" />
                    </div>
                </main>
            </div>

            <section className="how-it-works">
                <div className="container">
                    <h2 className="section-title">How Magic Sort Works</h2>
                    <p className="section-subtitle">Three simple steps to start organizing every bottle</p>

                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Pick a Bottle</h3>
                            <p>Tap one bottle to lift it, then look for a clean destination before you commit to the pour.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Pour by the Rules</h3>
                            <p>You can pour into an empty bottle or onto the same top color when there is enough room to receive the liquid.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Clear the Level</h3>
                            <p>Keep sorting until every filled bottle holds a single color from top to bottom.</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container" style={{ padding: '1.5rem' }}>
                <AdSlot type="banner" />
            </div>
        </>
    );
}
