'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const ORBS = [
    { x: '10%', y: '18%', size: 320, color: 'rgba(176,112,97,0.16)' },
    { x: '84%', y: '20%', size: 360, color: 'rgba(72,132,139,0.14)' },
    { x: '76%', y: '78%', size: 240, color: 'rgba(205,148,114,0.12)' },
    { x: '16%', y: '76%', size: 280, color: 'rgba(176,112,97,0.1)' },
];

const DROPS = [
    { x: '7%', y: '12%', delay: 0, rotate: -14 },
    { x: '92%', y: '14%', delay: 0.35, rotate: 18 },
    { x: '88%', y: '72%', delay: 0.6, rotate: -20 },
    { x: '12%', y: '82%', delay: 0.9, rotate: 12 },
    { x: '64%', y: '8%', delay: 1.15, rotate: -8 },
];

export default function HeroSection() {
    const heroRef = useRef<HTMLElement>(null);
    const dropsRef = useRef<(HTMLDivElement | null)[]>([]);
    const orbsRef = useRef<(HTMLDivElement | null)[]>([]);
    const badgeRef = useRef<HTMLParagraphElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const infoCardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cleanup = () => {};

        const initAnimations = async () => {
            const { default: gsap } = await import('gsap');

            const ctx = gsap.context(() => {
            dropsRef.current.forEach((drop, i) => {
                if (!drop) return;
                const cfg = DROPS[i];

                gsap.fromTo(
                    drop,
                    { opacity: 0, scale: 0.6, rotation: cfg.rotate - 24 },
                    {
                        opacity: 1,
                        scale: 1,
                        rotation: cfg.rotate,
                        duration: 1,
                        delay: 0.2 + cfg.delay,
                        ease: 'power3.out',
                    }
                );

                gsap.to(drop, {
                    y: `+=${18 + Math.random() * 14}`,
                    rotation: `+=${6 + Math.random() * 10}`,
                    duration: 3.2 + Math.random() * 2.4,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: cfg.delay,
                });
            });

            orbsRef.current.forEach((orb, i) => {
                if (!orb) return;
                gsap.fromTo(
                    orb,
                    { opacity: 0, scale: 0.6 },
                    { opacity: 1, scale: 1, duration: 2, delay: 0.5 + i * 0.3, ease: 'power2.out' }
                );
                gsap.to(orb, {
                    scale: 1.15,
                    opacity: 0.7,
                    duration: 4 + Math.random() * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: i * 0.5,
                });
            });

            gsap.fromTo(
                infoCardsRef.current?.children ? Array.from(infoCardsRef.current.children) : [],
                { opacity: 0, y: 24, x: -12 },
                { opacity: 1, y: 0, x: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out', delay: 0.55 }
            );

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                badgeRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 }
            );

            if (headlineRef.current) {
                const text = headlineRef.current.innerText;
                const words = text.split(' ');
                headlineRef.current.innerHTML = words
                    .map((w) => `<span class="hero-word"><span class="hero-word-inner">${w}</span></span>`)
                    .join(' ');

                const wordInners = headlineRef.current.querySelectorAll('.hero-word-inner');
                tl.fromTo(
                    wordInners,
                    { y: '100%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 0.6, stagger: 0.08 },
                    '-=0.3'
                );
            }

            tl.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.2'
            );

            tl.fromTo(
                ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
                { opacity: 0, y: 20, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' },
                '-=0.3'
            );
            }, heroRef);

            const handleMouseMove = (e: MouseEvent) => {
                if (window.innerWidth < 768) return;
                const { clientX, clientY } = e;
                const xPercent = (clientX / window.innerWidth - 0.5) * 2;
                const yPercent = (clientY / window.innerHeight - 0.5) * 2;

                dropsRef.current.forEach((drop, i) => {
                    if (!drop) return;
                    const depth = 0.5 + (i % 3) * 0.3;
                    gsap.to(drop, {
                        x: `+=${xPercent * 12 * depth}`,
                        y: `+=${yPercent * 8 * depth}`,
                        duration: 1,
                        ease: 'power2.out',
                        overwrite: 'auto',
                    });
                });

                orbsRef.current.forEach((orb, i) => {
                    if (!orb) return;
                    gsap.to(orb, {
                        x: `+=${xPercent * 6 * (i + 1) * 0.3}`,
                        y: `+=${yPercent * 4 * (i + 1) * 0.3}`,
                        duration: 1.5,
                        ease: 'power2.out',
                        overwrite: 'auto',
                    });
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            cleanup = () => {
                ctx.revert();
                window.removeEventListener('mousemove', handleMouseMove);
            };
        };

        void initAnimations();

        return () => cleanup();
    }, []);

    return (
        <section className="hero hero-full" ref={heroRef}>
            {ORBS.map((orb, i) => (
                <div
                    key={`orb-${i}`}
                    ref={(el: HTMLDivElement | null) => { orbsRef.current[i] = el; }}
                    className="hero-orb"
                    style={{
                        left: orb.x,
                        top: orb.y,
                        width: orb.size,
                        height: orb.size,
                        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                    }}
                />
            ))}

            {DROPS.map((drop, i) => (
                <div
                    key={`drop-${i}`}
                    ref={(el: HTMLDivElement | null) => { dropsRef.current[i] = el; }}
                    className="hero-drop"
                    style={{
                        left: drop.x,
                        top: drop.y,
                    }}
                />
            ))}

            <div className="hero-grid-overlay" />

            <div className="container hero-content">
                <div className="hero-copy">
                    <p className="hero-badge" ref={badgeRef}>
                        <span className="hero-badge-dot" />
                        Casual bottle sorting puzzle
                    </p>

                    <h1 ref={headlineRef}>
                        Sort the colors. <br />
                        Finish the bottles.
                    </h1>

                    <p className="hero-subtitle" ref={subtitleRef}>
                        Magic Sort turns layered liquid bottles into a bright, satisfying browser puzzle.
                        Read the top colors, protect your empty bottles, and use each smart pour to bring the whole board into order.
                    </p>

                    <div className="hero-cta" ref={ctaRef}>
                        <Link href="/play" className="btn btn-primary btn-hero">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            Start Sorting
                        </Link>
                        <Link href="/how-to-play" className="btn btn-secondary btn-hero">
                            Learn the Rules
                        </Link>
                    </div>

                    <div className="hero-info-cards" ref={infoCardsRef}>
                        <div className="hero-info-card">
                            <span className="hero-info-label">Feel</span>
                            <strong>Bright colors, clean reads</strong>
                        </div>
                        <div className="hero-info-card hero-info-card-accent">
                            <span className="hero-info-label">Focus</span>
                            <strong>30 levels of tidy little wins</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
