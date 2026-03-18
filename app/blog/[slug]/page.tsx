import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdSlot from '../../components/AdSlot';
import AuthorByline from '../../components/AuthorByline';
import RelatedArticles from '../../components/RelatedArticles';
import Sources from '../../components/Sources';
import { postSources, posts } from '../../lib/blogData';

export function generateStaticParams() {
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const post = posts.find((entry) => entry.slug === slug);

    if (!post) {
        return {
            title: 'Article Not Found',
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        keywords: [post.category, 'Magic Sort blog', 'liquid sorting article', post.title],
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `/blog/${post.slug}`,
            type: 'article',
            publishedTime: new Date(post.date).toISOString(),
        },
        twitter: {
            title: post.title,
            description: post.excerpt,
            card: 'summary_large_image',
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = posts.find((entry) => entry.slug === slug);

    if (!post) {
        notFound();
    }

    const relatedArticles = posts
        .filter((entry) => entry.slug !== post.slug)
        .sort((a, b) => {
            if (a.category === post.category && b.category !== post.category) return -1;
            if (a.category !== post.category && b.category === post.category) return 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        .slice(0, 4)
        .map(({ slug: articleSlug, title, excerpt, category, readTime }) => ({
            slug: articleSlug,
            title,
            excerpt,
            category,
            readTime,
        }));
    const sources = postSources[post.slug] ?? [];

    const articleSchema = {
        '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.date).toISOString(),
        author: {
            '@type': 'Organization',
            name: 'Magic Sort Editorial Team',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Magic Sort',
            url: 'https://magicsort.online',
        },
        mainEntityOfPage: 'https://magicsort.online/blog/' + post.slug,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            <div className="page-header">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div
                        style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            marginBottom: '0.75rem',
                        }}
                    >
                        <Link href="/blog" style={{ color: 'var(--brand-600)' }}>
                            Blog
                        </Link>{' '}
                        / {post.category}
                    </div>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: '0.35rem 0.8rem',
                            borderRadius: 'var(--radius-xl)',
                            background: 'rgba(236, 91, 43, 0.12)',
                            color: 'var(--brand-700)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            marginBottom: '1rem',
                        }}
                    >
                        <span>{post.icon}</span>
                        <span>{post.category}</span>
                    </div>
                    <h1 className="gradient-text">{post.title}</h1>
                    <p>{post.excerpt}</p>
                </div>
            </div>

            <div className="page-content">
                <AuthorByline date={post.date} readTime={post.readTime} />

                <AdSlot type="banner" />

                <article
                    style={{ marginTop: '1.5rem' }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div
                    className="card article-cta-card"
                    style={{
                        marginTop: '2.5rem',
                        padding: '1.5rem',
                    }}
                >
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.1rem' }}>Ready for a calm little sorting break?</h2>
                        <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)' }}>
                            Jump back into Magic Sort and try the next level with a cleaner read.
                        </p>
                    </div>
                    <Link href="/play" className="btn btn-primary">
                        Play Now
                    </Link>
                </div>

                <Sources sources={sources} />

                <RelatedArticles articles={relatedArticles} />
            </div>
        </>
    );
}
