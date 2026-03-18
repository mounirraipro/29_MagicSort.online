import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ - Magic Sort',
    description: 'Frequently asked questions about Magic Sort, including gameplay, devices, privacy, ads, and support.',
    keywords: ['Magic Sort FAQ', 'liquid sorting game questions', 'Magic Sort help'],
    alternates: {
        canonical: '/faq',
    },
};

const faqs = [
    {
        q: 'Is Magic Sort really free to play?',
        a: 'Yes. Magic Sort is free to play in the browser. You do not need an account, app install, or paid unlock to access the main game.',
    },
    {
        q: 'Do I need to download anything?',
        a: 'No. Magic Sort runs directly in your browser. If the page loads, you can start sorting without installing an app or extension.',
    },
    {
        q: 'What devices can I play on?',
        a: 'Magic Sort is designed for modern desktop and mobile browsers. The layout adapts for phones, tablets, and larger screens so the bottles stay readable across common device sizes.',
    },
    {
        q: 'How do the pouring rules work?',
        a: 'You can pour into an empty bottle or onto the same top color, as long as the destination has enough room. The goal is to finish with each filled bottle holding one color only.',
    },
    {
        q: 'How many levels are available?',
        a: 'The live site currently includes 30 browser levels, with easier openings and denser late-game setups as the flow tightens up.',
    },
    {
        q: 'Can I save my progress?',
        a: 'The current experience does not use account-based cloud saving. Some lightweight preferences may be stored locally in your browser, but progress is not synced across devices.',
    },
    {
        q: 'Does Magic Sort work offline?',
        a: 'An internet connection is required to load the site and game assets. After the page loads, gameplay itself is lightweight, but the site is not designed as a fully offline product.',
    },
    {
        q: 'Is Magic Sort safe for children?',
        a: 'The game is designed to be family-friendly and does not include chat, public profiles, or account creation. Parents should still supervise use and review our Parents & Safety Guide and Privacy Policy if children will use the site regularly.',
    },
    {
        q: 'Do you collect personal information?',
        a: 'You can browse and play without creating an account. If you contact us by email, your message is handled through your email provider and our inbox. Our Privacy Policy explains the limited data processing involved in running the site and any third-party ad services.',
    },
    {
        q: 'Why are ads shown on some pages?',
        a: 'Ads help support hosting and maintenance so the game can remain free. We aim to keep ads secondary to the main content and not place them in a way that overwhelms gameplay or trust pages.',
    },
    {
        q: 'Can I report a bug or inaccurate page?',
        a: 'Yes. Please use the Contact page and include the page URL, device, browser, and a short description of the issue. Clear reports help us fix problems faster.',
    },
    {
        q: 'Where should I start if I am new?',
        a: 'The best starting points are the Play page, the How to Play guide, and the early levels. Once the pouring rules and space management feel natural, the later levels become much easier to read.',
    },
];

export default function FAQPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Frequently Asked Questions</h1>
                    <p>Clear answers about gameplay, support, privacy, and how the site works.</p>
                </div>
            </div>

            <div className="page-content">
                <p>
                    This page exists to answer the questions players ask most often before or after trying
                    Magic Sort. If you need a step-by-step gameplay guide, visit <a href="/how-to-play">How to Play</a>.
                    If your question is about privacy, ads, or children using the site, the policy pages in the
                    footer give fuller detail.
                </p>

                {faqs.map((faq) => (
                    <section key={faq.q} style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{faq.q}</h2>
                        <p>{faq.a}</p>
                    </section>
                ))}

                <h2>Still Need Help?</h2>
                <p>
                    If your question is not covered here, please use the <a href="/contact">Contact page</a>.
                    The more specific your message is, the easier it is for us to give a useful answer.
                </p>
            </div>
        </>
    );
}
