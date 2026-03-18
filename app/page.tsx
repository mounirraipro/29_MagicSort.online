import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from './components/AdSlot';
import GameEmbedActions from './components/GameEmbedActions';
import HeroSection from './components/HeroSection';
import { SITE_NAME, TOTAL_LEVELS } from './lib/siteData';

export const metadata: Metadata = {
  title: 'Magic Sort - Free Online Bottle Sorting Puzzle',
  description: `Play ${SITE_NAME} free online. Sort mixed liquid colors into matching bottles across ${TOTAL_LEVELS} relaxing browser puzzle levels.`,
  keywords: [SITE_NAME, 'magic sort', 'bottle sort game', 'liquid sorting puzzle', 'free puzzle game', 'brain games', 'browser game'],
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <section className="home-embed-section">
        <div className="home-embed-shell">
          <div id="home-game-frame" className="home-embed-card">
            <iframe
              src="/game/index.html"
              title="Play Magic Sort Free Online"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
          <GameEmbedActions targetId="home-game-frame" shareUrl="/play" />
        </div>
      </section>

      <HeroSection />

      <section className="home-stat-band">
        <div className="container home-stats-grid">
          {[
            { value: String(TOTAL_LEVELS), label: 'Color Sort Levels' },
            { value: '4', label: 'Layers per Bottle' },
            { value: '8+', label: 'Bottle Layouts' },
            { value: '0', label: 'Downloads Needed' },
          ].map((stat) => (
            <div key={stat.label} className="home-stat-card">
              <div className="home-stat-value">
                {stat.value}
              </div>
              <div className="home-stat-label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdSlot type="banner" />

      <section className="section home-feature-section">
        <div className="container">
          <h2 className="section-title">A bright little logic puzzle built around clean pours</h2>
          <p className="section-subtitle">
            Magic Sort gives you bottles filled with layered colors and just enough empty space to untangle them.
            Each move is about reading the top layer, opening room, and finishing one clean bottle at a time.
          </p>

          <div className="grid-3">
            <article className="card feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h12" /><path d="M8 4v13a4 4 0 0 0 8 0V4" /><path d="M9 11h6" /></svg>
              </div>
              <h3>Easy to Read</h3>
              <p>The top colors stay visible, so you can quickly scan the bottles, spot a useful pour, and plan the next few moves without guesswork.</p>
            </article>

            <article className="card feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2.6 5.26 5.8.85-4.2 4.09.99 5.8L12 16.8 6.81 19l.99-5.8-4.2-4.09 5.8-.85L12 3z" /></svg>
              </div>
              <h3>Small Reward Moments</h3>
              <p>Every matched pour frees up space, uncovers hidden layers, and moves the board one step closer to a fully sorted finish.</p>
            </article>

            <article className="card feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="8" /><path d="M8 3.2 6.2 5" /><path d="M16 3.2 17.8 5" /></svg>
              </div>
              <h3>Quick to Restart</h3>
              <p>If a bottle order gets tangled, you can restart quickly and try a cleaner route instead of grinding through a bad setup.</p>
            </article>

            <article className="card feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10" /><path d="M9 16h6" /><path d="M8 3h8l3 5-7 7-7-7 3-5z" /></svg>
              </div>
              <h3>Progress That Feels Good</h3>
              <p>Later boards ask for better planning, but the pace stays gentle enough that improvement feels satisfying instead of stressful.</p>
            </article>

            <article className="card feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="12" rx="3" /><path d="M8 20h8" /><path d="M12 16v4" /><path d="M6.5 8.5h11" /></svg>
              </div>
              <h3>Comfortable on Any Screen</h3>
              <p>Phone, tablet, or desktop, the bottles stay readable enough for a quick puzzle break whenever you want one.</p>
            </article>

            <article className="card feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12c3-4.5 5.6-6.75 8-6.75S17 7.5 20 12c-3 4.5-5.6 6.75-8 6.75S7 16.5 4 12z" /><circle cx="12" cy="12" r="2.5" /></svg>
              </div>
              <h3>Free and Direct</h3>
              <p>No account wall, no app install, and no extra setup. Open Magic Sort and start sorting right away.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section home-loop-section">
        <div className="container home-loop-inner">
          <div>
            <p className="home-loop-kicker">One smooth rhythm</p>
            <h2 className="home-loop-title">Thirty quick levels, one satisfying bottle-by-bottle loop</h2>
            <p className="home-loop-copy">
              Magic Sort stays simple on purpose. Open a level, read the bottle tops, protect your empty space,
              and keep pouring until every color has a home of its own.
            </p>
          </div>

          <div className="home-loop-points">
            {[
              { title: 'Open fast', desc: 'No extra setup or download step, just straight into the next bottle puzzle.' },
              { title: 'Read cleanly', desc: 'The top liquid layers stay easy to scan, so each decision feels clear.' },
              { title: 'Retry lightly', desc: 'A tangled arrangement is easy to reset, which keeps the flow relaxed.' },
            ].map((item) => (
              <div key={item.title} className="home-loop-point">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSlot type="banner" />

      <section className="section home-design-section">
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 className="section-title">Designed to feel light, playful, and clear</h2>
          <p className="section-subtitle">
            The challenge stays real, but the whole experience leans bright, readable, and easy to settle into.
            It is about making one smart pour after another while the whole board slowly clicks into place.
          </p>

          <div className="home-feel-grid">
            {[
              { title: 'Gentle motion', desc: 'Bottles tilt and settle with just enough bounce to feel lively without making the page noisy.' },
              { title: 'Clear color cues', desc: 'Every level revolves around simple reading: match the top layer, free space, and keep useful bottles open.' },
              { title: 'Cleaner surfaces', desc: 'Soft cards, open spacing, and cool contrast keep the page feeling welcoming around the game.' },
              { title: 'Replayable rhythm', desc: 'The loop is quick to learn, easy to revisit, and satisfying whether you play one level or ten.' },
            ].map((item) => (
              <div key={item.title} className="home-feel-card">
                <h3 style={{ fontSize: '0.95rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-finish-section">
        <div className="container home-finish-inner">
          <div>
            <p className="home-finish-kicker">Free browser play</p>
            <h2 className="home-finish-title">Ready to line up every bottle perfectly?</h2>
            <p className="home-finish-copy">
              No signup, no download, and no extra friction. Just open Magic Sort and enjoy a few bright, tidy little wins.
            </p>
          </div>
          <Link href="/play" className="btn btn-primary home-finish-cta">
            Start Playing
          </Link>
        </div>
      </section>
    </>
  );
}
