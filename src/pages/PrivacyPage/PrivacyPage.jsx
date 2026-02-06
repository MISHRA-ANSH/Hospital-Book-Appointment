import React from 'react';
import { motion } from 'framer-motion';
import './PrivacyPage.css';

export const PrivacyPage = () => {
    const policies = [
        {
            title: '1. Information We Collect',
            content: 'We collect personal information including name, contact details, medical history, and appointment information to provide you with the best healthcare services.'
        },
        {
            title: '2. How We Use Your Information',
            content: 'Your information is used to provide medical services, schedule appointments, maintain medical records, and improve our healthcare delivery.'
        },
        {
            title: '3. Data Security',
            content: 'We implement industry-standard security measures including encryption and secure servers to protect your personal and medical information.'
        },
        {
            title: '4. Information Sharing',
            content: 'We do not sell or share your personal information with third parties except as required by law or for medical treatment purposes.'
        },
        {
            title: '5. Your Rights',
            content: 'You have the right to access, correct, or delete your personal information at any time. Contact us to exercise these rights.'
        },
        {
            title: '6. Contact Us',
            content: 'For privacy concerns or questions, please contact us at hms@firym.in or call +917096336561'
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
                    <h1>Privacy Policy</h1>
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>/</span>
                        <span>Privacy Policy</span>
                    </div>
                </div>
                <div className="hero-icon">🔒</div>
            </motion.div>

            <motion.div
                className="feature-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="feature-card">
                    <h2>Privacy Policy</h2>
                    <p className="subtitle">Your privacy is important to us</p>

                    <div className="privacy-list">
                        {policies.map((policy, index) => (
                            <motion.div
                                key={index}
                                className="privacy-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                <h3>{policy.title}</h3>
                                <p>{policy.content}</p>
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
