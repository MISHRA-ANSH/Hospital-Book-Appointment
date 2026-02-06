import React from 'react';
import { motion } from 'framer-motion';
import './WorkingHoursPage.css';

export const WorkingHoursPage = () => {
    const schedule = [
        { day: 'Monday - Friday', hours: '08:00 AM - 21:00 PM', icon: '📅' },
        { day: 'Saturday', hours: '09:00 AM - 18:00 PM', icon: '📅' },
        { day: 'Sunday', hours: '10:00 AM - 16:00 PM', icon: '📅' },
        { day: 'Emergency', hours: '24/7 Available', icon: '🚨' }
    ];

    return (
        <div className="feature-page">
            <motion.div
                className="feature-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="hero-content">
                    <h1>Working Hours</h1>
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>/</span>
                        <span>Working Hours</span>
                    </div>
                </div>
                <div className="hero-icon">🕐</div>
            </motion.div>

            <motion.div
                className="feature-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="feature-card">
                    <h2>Our Schedule</h2>
                    <p className="subtitle">We're here when you need us</p>
                    <div className="schedule-grid">
                        {schedule.map((item, index) => (
                            <motion.div
                                key={index}
                                className="schedule-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                <div className="schedule-icon">{item.icon}</div>
                                <div className="schedule-info">
                                    <h3>{item.day}</h3>
                                    <p>{item.hours}</p>
                                </div>
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
