import Link from 'next/link';
import { CONTACT_EMAIL } from '../lib/siteData';

const footerLinks = {
    'Play': [
        { href: '/play', label: 'Start Sorting' },
        { href: '/how-to-play', label: 'How to Play' },
        { href: '/faq', label: 'FAQ' },
    ],
    'Read': [
        { href: '/blog', label: 'Magic Sort Guides' },
        { href: '/blog/water-sort-strategy', label: 'Sorting Tips' },
        { href: '/blog/why-water-sorting-feels-good', label: 'Why It Clicks' },
        { href: '/blog/screen-time-guide', label: 'Screen Time Guide' },
        { href: '/blog/daily-reset-routine', label: 'Daily Reset' },
        { href: '/blog/family-water-sorting-guide', label: 'Family Guide' },
    ],
    'Company': [
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
        { href: '/accessibility', label: 'Accessibility' },
    ],
    'Legal': [
        { href: '/privacy-policy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms' },
        { href: '/cookie-policy', label: 'Cookies' },
        { href: '/disclaimer', label: 'Disclaimer' },
    ],
};

export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--border-light)',
            padding: '3rem 0 2rem',
            marginTop: '4rem',
            background: 'linear-gradient(180deg, rgba(255,251,244,0.4), rgba(239,245,233,0.8))',
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '2rem',
                    marginBottom: '2.5rem',
                }}>
                    <div>
                        <Link href="/" style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '1rem',
                            letterSpacing: '-0.03em',
                            color: 'var(--text-primary)',
                        }}>
                            Magic Sort
                        </Link>
                        <p style={{
                            color: 'var(--text-tertiary)',
                            fontSize: '0.88rem',
                            marginTop: '0.5rem',
                            lineHeight: 1.6,
                        }}>
                            Bottle-by-bottle liquid sorting, bright little wins, and smooth browser play at your own pace.
                        </p>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.82rem',
                            marginTop: '0.6rem',
                            lineHeight: 1.6,
                        }}>
                            Contact: {CONTACT_EMAIL}
                        </p>
                    </div>

                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 style={{
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                color: 'var(--text-tertiary)',
                                marginBottom: '0.75rem',
                            }}>
                                {title}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {links.map((link) => (
                                    <li key={link.href} style={{ marginBottom: '0.375rem' }}>
                                        <Link href={link.href} style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.8125rem',
                                        }}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div style={{
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                }}>
                    <p style={{
                        color: 'var(--text-tertiary)',
                        fontSize: '0.75rem',
                    }}>
                        © {new Date().getFullYear()} Magic Sort
                    </p>
                    <Link href="/sitemap-page" style={{
                        color: 'var(--text-tertiary)',
                        fontSize: '0.75rem',
                    }}>
                        Sitemap
                    </Link>
                </div>
            </div>
        </footer>
    );
}
