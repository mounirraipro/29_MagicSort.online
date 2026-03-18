import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy',
    description: 'Learn how Magic Sort uses cookies and browser storage, including third-party ad technologies and local gameplay storage.',
    keywords: ['Magic Sort cookies', 'cookie policy', 'browser storage', 'ad cookies'],
    alternates: {
        canonical: '/cookie-policy',
    },
};

export default function CookiePolicyPage() {
    return (
        <>
            <div className="page-header"><div className="container"><h1 className="gradient-text">Cookie Policy</h1><p>Last updated: March 16, 2026</p></div></div>
            <div className="page-content">
                <p>This page explains how Magic Sort uses cookies and similar browser-side technologies, including local browser storage used by the game.</p>
                <h2>1. What Cookies Are</h2><p>Cookies are small text files placed in your browser by websites or third-party services. They may be used for delivery, advertising, measurement, or personalization.</p>
                <h2>2. What Browser Storage Is</h2><p>Browser storage, including localStorage, lets the site remember simple information on your device. Magic Sort may use it for local gameplay state and preferences.</p>
                <h2>3. How Magic Sort Uses These Technologies</h2><p>Magic Sort currently uses or may rely on local gameplay storage, site delivery and security technologies, and advertising technologies where ads are enabled.</p>
                <h2>4. What We Do Not Currently Claim to Use</h2><p>We do not currently state that Magic Sort runs Google Analytics on the site. If analytics tooling is added later, this page and the Privacy Policy will be updated.</p>
                <h2>5. Managing Cookies and Browser Storage</h2>
                <p>You can control cookies and local storage through your browser settings. Blocking or clearing storage may affect saved local preferences or ad settings.</p>
                <ul><li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome cookie settings</a></li><li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox cookie settings</a></li><li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" target="_blank" rel="noopener noreferrer">Apple Safari cookie settings</a></li><li><a href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge cookie settings</a></li></ul>
                <h2>6. Google Ad Controls</h2><p>If Google advertising is active on the site, you can manage certain ad preferences through <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</p>
                <h2>7. Changes to This Policy</h2><p>We may revise this page if the game changes, if we add or remove service providers, or if legal requirements change.</p>
                <h2>8. Contact</h2><p>Questions about cookies or browser storage can be sent through the <a href="/contact">Contact page</a> or to <strong>contact@magicsort.online</strong>.</p>
            </div>
        </>
    );
}
