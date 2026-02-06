import React from 'react';
import { motion } from 'framer-motion';
import './TermsPage.css';

export const TermsPage = () => {
    const terms = [
        {
            title: '1. Acceptance of Terms',
            content: 'By accessing and using this hospital management system, you accept and agree to be bound by the terms and provision of this agreement.'
        },
        {
            title: '2. Use License',
            content: 'Permission is granted to temporarily use this system for personal, non-commercial transitory viewing only.'
        },
        {
            title: '3. Patient Information',
            content: 'All patient information is confidential and protected under HIPAA regulations.'
        },
        {
            title: '4. Appointment Policy',
            content: 'Appointments must be cancelled at least 24 hours in advance to avoid cancellation fees.'
        },
        {
            title: '5. Medical Advice',
            content: 'Information provided through this system is for informational purposes only and should not replace professional medical advice.'
        }
    ];

    return (
        <div className="feature-page">
            <motion.div
                className="feature-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="hero-content">
                    <h1>Terms of Service</h1>
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>/</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
                <div className="hero-icon">📋</div>
            </motion.div>

            <motion.div
                className="feature-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="feature-card">
                    <h2>Terms & Conditions</h2>
                    <p className="subtitle">Please read our terms and conditions carefully</p>

                    <div className="terms-list">
                        {terms.map((term, index) => (
                            <motion.div
                                key={index}
                                className="term-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                <h3>{term.title}</h3>
                                <p>{term.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Footer */}
            <footer className="appointments-footer">
                <div className="footer-content">
                    <div className="footer-column">
                        <div className="footer-logo">
                            <div className="logo">🏥</div>
                            <p>Over past 10+ years of experience and skills in various technologies, we built great scalable products</p>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h3>Useful Link</h3>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/doctors">Doctors</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Contact Information</h3>
                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-icon">📞</span>
                                <span>+917096336561</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">🕐</span>
                                <span>08:00 AM to 21:00 PM</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📍</span>
                                <span>H-65,Epic Web Teachno<br /> B K Tower, ,<br />Noida, Uttar Pradesh 201003</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>Copyright © 2026 All Rights Reserved by Epic Web</p>
                </div>
            </footer>
        </div>
    );
};
