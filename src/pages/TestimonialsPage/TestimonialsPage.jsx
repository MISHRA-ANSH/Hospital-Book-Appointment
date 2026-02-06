import React from 'react';
import { motion } from 'framer-motion';
import './TestimonialsPage.css';

export const TestimonialsPage = () => {
    const testimonials = [
        { name: 'Pream Yadav', text: 'Excellent service! The doctors are very professional and caring. They took the time to explain everything to me.', rating: 5, role: 'Patient' },
        { name: 'Virat Kohli', text: 'Best hospital experience I have ever had. The staff is friendly and the facilities are top-notch.', rating: 5, role: 'Patient' },
        { name: 'Rohit Sharma', text: 'Highly recommend to everyone! Quick appointments and excellent medical care.', rating: 5, role: 'Patient' }
    ];

    return (
        <div className="feature-page">
            <motion.div
                className="feature-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="hero-content">
                    <h1>Patient Testimonials</h1>
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>/</span>
                        <span>Testimonials</span>
                    </div>
                </div>
                <div className="hero-icon">💬</div>
            </motion.div>

            <motion.div
                className="feature-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="testimonials-header">
                    <h2>What Our Patients Say</h2>
                    <p className="subtitle">Real experiences from real people</p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            className="testimonial-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                        >
                            <div className="quote-icon">"</div>
                            <div className="rating">
                                {[...Array(item.rating)].map((_, i) => (
                                    <span key={i} className="star">⭐</span>
                                ))}
                            </div>
                            <p className="testimonial-text">{item.text}</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">{item.name.charAt(0)}</div>
                                <div className="author-info">
                                    <h4>{item.name}</h4>
                                    <p>{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
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
