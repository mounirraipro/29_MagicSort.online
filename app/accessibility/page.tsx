import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Accessibility Statement',
    description: 'Magic Sort is committed to digital accessibility. Learn about our efforts to make our sorting game available to everyone.',
    keywords: ['Magic Sort accessibility', 'accessible browser game', 'web accessibility statement'],
};

export default function AccessibilityPage() {
    return (
        <>
            <div className="page-header"><div className="container"><h1 className="gradient-text">Accessibility Statement</h1><p>Our commitment to making Magic Sort accessible to everyone.</p></div></div>
            <div className="page-content">
                <p>Magic Sort is committed to improving digital accessibility for people with disabilities and to making the site easier to use for everyone.</p>
                <h2>Our Commitment</h2><p>We aim to follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA where reasonably possible.</p>
                <h2>Measures We&apos;ve Taken</h2>
                <ul><li><strong>Semantic HTML:</strong> clear structure for assistive technologies.</li><li><strong>Keyboard Navigation:</strong> interactive site elements can be reached by keyboard.</li><li><strong>Color Contrast:</strong> text and backgrounds are designed for readability.</li><li><strong>Alt Text:</strong> images include descriptive alternatives where appropriate.</li><li><strong>Responsive Design:</strong> the layout adapts across screen sizes and zoom levels.</li><li><strong>Clear Language:</strong> support pages use direct, readable language.</li></ul>
                <h2>Game Accessibility</h2><p>We recognize that the game itself presents additional accessibility challenges because it relies on color recognition, visual planning, and precise interaction.</p>
                <h2>Known Limitations</h2><ul><li>The game requires visual distinction between colored layers.</li><li>Touch or click controls may still be difficult for some users with motor impairments.</li><li>Some third-party content, such as advertisements, may not meet our accessibility standards.</li></ul>
                <h2>Feedback</h2><p>If you encounter accessibility barriers or have suggestions for improvement, please contact us through the <a href="/contact">Contact page</a> or email <strong>contact@magicsort.online</strong>.</p>
                <h2>Continuous Improvement</h2><p>We view accessibility as an ongoing process and will continue reviewing the site for improvements.</p>
            </div>
        </>
    );
}
