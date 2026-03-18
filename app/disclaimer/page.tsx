import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer',
    description: 'Read the Magic Sort disclaimer about gameplay, informational content, third-party links, and advertising.',
    keywords: ['Magic Sort disclaimer', 'website disclaimer', 'browser game disclaimer'],
    alternates: {
        canonical: '/disclaimer',
    },
};

export default function DisclaimerPage() {
    return (
        <>
            <div className="page-header"><div className="container"><h1 className="gradient-text">Disclaimer</h1><p>Last updated: March 16, 2026</p></div></div>
            <div className="page-content">
                <p>This disclaimer explains the limits of the information and services provided on magicsort.online.</p>
                <h2>1. Entertainment Service</h2><p>Magic Sort is a browser-based entertainment and informational website. The game, guides, and blog are provided for general use and reference.</p>
                <h2>2. No Professional Advice</h2><p>Some pages discuss focus, learning, family use, or the broader benefits of puzzle play. That material is for general informational purposes only and is not professional advice.</p>
                <h2>3. Accuracy and Completeness</h2><p>We try to keep the site accurate and current, but we cannot promise that every page will always be complete, current, or free from mistakes.</p>
                <h2>4. Game Performance and Availability</h2><p>The game is provided on an &ldquo;as available&rdquo; basis. Performance may vary depending on device, browser behavior, extensions, and network conditions.</p>
                <h2>5. External Links</h2><p>Some pages may link to third-party websites for references, browser help, ad settings, or related information. We do not control those sites.</p>
                <h2>6. Advertising</h2><p>Magic Sort may display advertising from third-party providers, including Google AdSense. The presence of an ad does not mean we endorse the advertised product or service.</p>
                <h2>7. Family and Child Use</h2><p>The site is intended to be family-friendly, but parents and guardians remain responsible for supervising a child&apos;s use of the web.</p>
                <h2>8. Contact</h2><p>If you believe a page is inaccurate, misleading, broken, or inconsistent with how the site works, please use the <a href="/contact">Contact page</a>.</p>
            </div>
        </>
    );
}
