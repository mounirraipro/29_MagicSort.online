import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Read the Magic Sort Terms of Service. Understand the rules and guidelines for using this free online sorting game site.',
    keywords: ['Magic Sort terms of service', 'terms and conditions', 'usage agreement'],
};

export default function TermsPage() {
    return (
        <>
            <div className="page-header"><div className="container"><h1 className="gradient-text">Terms of Service</h1><p>Last updated: March 18, 2026</p></div></div>
            <div className="page-content">
                <p>Welcome to Magic Sort. By accessing or using this website and the embedded game experience, you agree to be bound by these Terms of Service.</p>
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing Magic Sort at magicsort.online, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our <a href="/privacy-policy">Privacy Policy</a>.</p>
                <h2>2. Description of Service</h2>
                <p>Magic Sort provides access to a free, browser-based liquid sorting game along with help content, blog articles, and related informational resources.</p>
                <h2>3. User Eligibility</h2>
                <p>Magic Sort is available to users of all ages. Users under 13 should use the service only under parental supervision where appropriate in their jurisdiction.</p>
                <h2>4. Intellectual Property</h2>
                <p>The site design, written copy, branding, and original editorial content published on Magic Sort belong to this site or its licensors. The embedded game itself may be subject to separate ownership or licensing rights.</p>
                <h2>5. Acceptable Use</h2>
                <ul><li>Do not use the service for illegal purposes.</li><li>Do not attempt to gain unauthorized access to our systems.</li><li>Do not interfere with site operation.</li><li>Do not scrape or reproduce our content beyond standard search indexing.</li><li>Do not upload harmful code.</li></ul>
                <h2>6. User Feedback</h2>
                <p>If you submit feedback or suggestions, you grant Magic Sort a non-exclusive, royalty-free license to use and incorporate that feedback into the service.</p>
                <h2>7. Advertisements</h2>
                <p>Magic Sort may display advertisements from third-party providers, including Google AdSense, to help keep the site free.</p>
                <h2>8. Disclaimer of Warranties</h2>
                <p>Magic Sort is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind.</p>
                <h2>9. Limitation of Liability</h2>
                <p>To the fullest extent permitted by law, Magic Sort and its operators shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the service.</p>
                <h2>10. External Links</h2>
                <p>Our website may contain links to third-party websites or services. We are not responsible for their content, privacy practices, or availability.</p>
                <h2>11. Modifications</h2>
                <p>We reserve the right to modify these Terms of Service at any time. Changes are effective upon posting to this page.</p>
                <h2>12. Termination</h2>
                <p>We reserve the right to suspend or terminate access to Magic Sort for conduct that violates these terms or is harmful to other users, us, or third parties.</p>
                <h2>13. Governing Law</h2>
                <p>These Terms of Service shall be governed by applicable law. Any disputes will be resolved through appropriate legal channels.</p>
                <h2>14. Contact</h2>
                <p>If you have any questions about these Terms of Service, please reach out through our <a href="/contact">Contact page</a> or email us at <strong>contact@magicsort.online</strong>.</p>
            </div>
        </>
    );
}
