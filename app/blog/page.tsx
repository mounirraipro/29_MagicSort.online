'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';
import { posts } from '../lib/blogData';

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const sortedPosts = useMemo(() => {
        return [...posts].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }, []);

    const allCategories = useMemo(
        () => ['All', ...Array.from(new Set(posts.map((p) => p.category)))],
        []
    );

    const filteredPosts =
        activeCategory === 'All'
            ? sortedPosts
            : sortedPosts.filter((p) => p.category === activeCategory);

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Magic Sort Guides</h1>
                    <p>Short reads on bottle-sorting strategy, calm play, family use, and what makes a browser puzzle worth returning to.</p>
                </div>
            </div>

            <div
                className="container"
                style={{ maxWidth: '900px', padding: '0 1.5rem 4rem' }}
            >
                <AdSlot type="banner" />

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginTop: '2rem',
                        marginBottom: '1rem',
                    }}
                >
                    {allCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '0.4rem 1rem',
                                borderRadius: 'var(--radius-xl)',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                background:
                                    activeCategory === cat
                                        ? 'var(--primary)'
                                        : 'rgba(47, 107, 69, 0.1)',
                                color:
                                    activeCategory === cat ? '#fff' : 'var(--primary-light)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <p
                    style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem',
                        marginBottom: '1.5rem',
                    }}
                >
                    Showing {filteredPosts.length} article
                    {filteredPosts.length !== 1 ? 's' : ''}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {filteredPosts.map((post, i) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <article
                                className="card animate-in blog-list-card"
                                style={{
                                    animationDelay: `${0.1 + i * 0.05}s`,
                                    cursor: 'pointer',
                                }}
                            >
                                <div
                                    className="blog-list-icon"
                                    style={{
                                        fontSize: '2.5rem',
                                        background: 'linear-gradient(135deg, rgba(47, 107, 69, 0.12), rgba(236, 91, 43, 0.1))',
                                        borderRadius: 'var(--radius-md)',
                                    }}
                                >
                                    {post.icon}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div className="blog-list-meta">
                                        <span
                                            style={{
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: 'var(--radius-xl)',
                                                background: 'rgba(236, 91, 43, 0.14)',
                                                color: 'var(--brand-700)',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {post.category}
                                        </span>
                                        <span>{post.date}</span>
                                        <span>{post.readTime}</span>
                                    </div>

                                    <h2
                                        style={{
                                            fontSize: '1.25rem',
                                            marginBottom: '0.5rem',
                                            color: 'var(--text)',
                                        }}
                                    >
                                        {post.title}
                                    </h2>

                                    <p
                                        style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.95rem',
                                            margin: 0,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {post.excerpt}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                <AdSlot type="banner" />
            </div>
        </>
    );
}
