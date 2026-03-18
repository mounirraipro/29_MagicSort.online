import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog - Magic Sort Tips, Notes & Guides',
    description: 'Read Magic Sort notes on bottle sorting strategy, calm screen time, puzzle design, family use, and browser game quality.',
    keywords: ['Magic Sort blog', 'bottle sorting tips', 'browser game guides', 'color sort strategy'],
    alternates: {
        canonical: '/blog',
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
