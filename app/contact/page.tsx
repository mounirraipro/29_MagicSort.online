'use client';

import { useState } from 'react';
import { CONTACT_EMAIL } from '../lib/siteData';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const mailSubject = `[Magic Sort] ${formData.subject || 'General Inquiry'}`;
        const mailBody = [
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            `Topic: ${formData.subject}`,
            '',
            formData.message,
        ].join('\n');

        const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

        window.location.href = mailtoUrl;
        setSubmitted(true);
    };

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Contact Us</h1>
                    <p>Questions, bug reports, privacy concerns, accessibility feedback, or partnership ideas are all welcome here.</p>
                </div>
            </div>

            <div className="page-content">
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h2>How to Reach Us</h2>
                    <p>
                        The fastest way to reach Magic Sort is by email. We keep the contact flow simple on purpose:
                        no account walls, no support portal, and no maze of different inboxes. Everything routes through one address.
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                            gap: '1rem',
                            margin: '2rem 0',
                        }}
                    >
                        {[
                            { label: 'General Questions', desc: 'Gameplay, bugs, feedback, and general site requests.', value: CONTACT_EMAIL },
                            { label: 'Trust & Policy', desc: 'Privacy, legal, and accessibility questions all come here too.', value: CONTACT_EMAIL },
                        ].map((item) => (
                            <div key={item.label} className="card" style={{ padding: '1.25rem' }}>
                                <strong style={{ display: 'block', marginBottom: '0.35rem' }}>{item.label}</strong>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '0.45rem' }}>{item.desc}</p>
                                <span style={{ color: 'var(--brand-700)', fontSize: '0.92rem', fontWeight: 700 }}>{item.value}</span>
                            </div>
                        ))}
                    </div>

                    <h2>What to Include in Your Message</h2>
                    <ul>
                        <li><strong>For bug reports:</strong> page URL, device, browser, and what happened.</li>
                        <li><strong>For privacy questions:</strong> the page involved and the concern you want clarified.</li>
                        <li><strong>For accessibility feedback:</strong> the assistive technology or browser setup you were using.</li>
                        <li><strong>For content issues:</strong> the article or page title and what seems inaccurate or unclear.</li>
                    </ul>

                    <h2>Send Us a Message</h2>

                    {submitted ? (
                        <div
                            className="card"
                            style={{
                                textAlign: 'center',
                                padding: '2.5rem 2rem',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📨</div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Your email app should be opening</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                If it did not, send your message manually to {CONTACT_EMAIL}.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
                                    Your Name
                                </label>
                                <input id="name" type="text" required placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text)', fontSize: '1rem', outline: 'none' }} />
                            </div>
                            <div>
                                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
                                    Email Address
                                </label>
                                <input id="email" type="email" required placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text)', fontSize: '1rem', outline: 'none' }} />
                            </div>
                            <div>
                                <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
                                    Subject
                                </label>
                                <select id="subject" required value={formData.subject} onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))} style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text)', fontSize: '1rem', outline: 'none' }}>
                                    <option value="">Select a topic</option>
                                    <option value="General Feedback">General Feedback</option>
                                    <option value="Bug Report">Bug Report</option>
                                    <option value="Feature Request">Feature Request</option>
                                    <option value="Partnership Inquiry">Partnership Inquiry</option>
                                    <option value="Privacy Concern">Privacy Concern</option>
                                    <option value="Accessibility Feedback">Accessibility Feedback</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
                                    Message
                                </label>
                                <textarea id="message" required rows={7} placeholder="Tell us what you noticed, what page you were on, and how we can help." value={formData.message} onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))} style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text)', fontSize: '1rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Compose Email
                            </button>
                        </form>
                    )}

                    <h2>Before You Email</h2>
                    <p>
                        You may find a quick answer in the <a href="/faq">FAQ</a>, the <a href="/how-to-play">How to Play</a>
                        guide, or one of the policy pages in the footer. We keep those pages updated so players can
                        verify how the site works without guessing.
                    </p>
                </div>
            </div>
        </>
    );
}
