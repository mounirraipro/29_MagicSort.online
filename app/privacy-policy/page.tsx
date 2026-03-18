import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Read the Magic Sort Privacy Policy to understand what data the site processes, how ads and browser storage work, and how to contact us.',
    keywords: ['Magic Sort privacy policy', 'data protection', 'browser game privacy'],
    alternates: {
        canonical: '/privacy-policy',
    },
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <div className="page-header"><div className="container"><h1 className="gradient-text">Privacy Policy</h1><p>Last updated: March 18, 2026</p></div></div>
            <div className="page-content">
                <p>This Privacy Policy explains how Magic Sort processes information when you visit the site, play the browser game, or contact us.</p>
                <h2>1. Scope</h2>
                <p>This policy applies to visitors of <strong>magicsort.online</strong>, including people who browse pages, play the game, read the guides, or contact us by email.</p>
                <h2>2. Information You Choose to Send</h2>
                <p>You can use Magic Sort without creating an account. If you contact us, we may receive your name, email address, subject line, and message content so we can respond.</p>
                <h2>3. Technical Information</h2>
                <p>Like most websites, Magic Sort may rely on hosting, content delivery, and security infrastructure that processes standard request data such as IP address, browser type, device type, timestamps, and requested URLs.</p>
                <h2>4. Browser Storage and Gameplay State</h2>
                <p>The game may store limited information locally in your browser to support gameplay state, options, and simple preferences. This information stays on your device unless you clear it.</p>
                <h2>5. Advertising and Third Parties</h2>
                <p>Magic Sort may display advertisements from third-party providers such as Google AdSense. Those providers may process data through cookies, similar technologies, or device identifiers under their own policies and applicable law.</p>
                <h2>6. How We Use Information</h2>
                <ul><li>To deliver the website and browser game</li><li>To respond to emails and support requests</li><li>To maintain site security, performance, and reliability</li><li>To support ad serving where ads are enabled</li><li>To comply with legal obligations or valid requests</li></ul>
                <h2>7. How We Share Information</h2>
                <p>We do not sell your personal information. We may share limited information with hosting, infrastructure, email, or advertising providers that help operate the site, or when required by law.</p>
                <h2>8. Children&apos;s Privacy</h2>
                <p>Magic Sort is designed to be family-friendly, but parents and guardians should still supervise use. We do not require children to create accounts to play.</p>
                <h2>9. Retention</h2>
                <p>We keep contact emails and related records only as long as reasonably necessary for support, legal, operational, or security purposes.</p>
                <h2>10. Your Choices</h2>
                <ul><li>You can stop using the site at any time.</li><li>You can clear local browser storage through your browser settings.</li><li>You can manage cookies through browser controls and Google ad settings where applicable.</li><li>You can contact us with privacy-related questions.</li></ul>
                <h2>11. International Visitors</h2>
                <p>Magic Sort may be accessed from multiple countries. Depending on where you live, local privacy laws may give you rights regarding access, correction, deletion, restriction, or objection.</p>
                <h2>12. Changes to This Policy</h2>
                <p>We may revise this page when the site, our service providers, or our legal obligations change. When we make material updates, we will change the date shown at the top.</p>
                <h2>13. Contact</h2>
                <p>Privacy questions can be sent through the <a href="/contact">Contact page</a> or directly to <strong>privacy@magicsort.online</strong>.</p>
            </div>
        </>
    );
}
