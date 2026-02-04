import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactPage.css';

export const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'General Enquiry',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            alert('Message sent successfully! We will get back to you soon.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: 'General Enquiry',
                message: ''
            });
            setIsSubmitting(false);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: '📞',
            title: '+917096336561',
            subtitle: 'Call today',
            color: '#10b981',
            delay: 0.2
        },
        {
            icon: '✉️',
            title: 'hr@epicwebtechno.in',
            subtitle: 'Contact Hospital',
            color: '#3b82f6',
            delay: 0.3
        },
        {
            icon: '🕐',
            title: '08:00 AM to 21:00 PM',
            subtitle: 'Open Hours',
            color: '#8b5cf6',
            delay: 0.4
        },
        {
            icon: '📍',
            title: 'H-65, Epic Web Techno',
            subtitle: 'B K Tower, Sector 63, Noida,Uttar Pradesh 201003',
            description: 'Our Location',
            color: '#ef4444',
            delay: 0.5
        }
    ];

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <motion.div
                className="contact-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="contact-hero-content"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="contact-hero-title">Contact</h1>
                    <div className="contact-breadcrumb">
                        <a href="/">Home</a>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">Contact</span>
                    </div>
                </motion.div>

                <motion.div
                    className="contact-hero-image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="support-illustration">
                        <motion.div
                            className="computer-screen"
                            animate={{
                                y: [0, -10, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <div className="screen-content">
                                <motion.div
                                    className="chat-bubble"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        delay: 1,
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                >
                                    💬
                                </motion.div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="support-person"
                            animate={{
                                y: [0, -5, 0]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                        >
                            <div className="person-avatar">👩‍💼</div>
                        </motion.div>
                        <motion.div
                            className="plant-decoration"
                            animate={{
                                rotate: [0, 5, 0, -5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            🪴
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
                className="contact-info-section"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <div className="contact-info-grid">
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={index}
                            className="contact-info-card"
                            variants={fadeInUp}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: info.delay
                            }}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.div
                                className="info-icon"
                                style={{ backgroundColor: `${info.color}15` }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 360,
                                    transition: { duration: 0.6 }
                                }}
                            >
                                <span style={{ color: info.color }}>{info.icon}</span>
                            </motion.div>
                            <h3>{info.title}</h3>
                            <p className="info-subtitle">{info.subtitle}</p>
                            {info.description && (
                                <p className="info-description">{info.description}</p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Contact Form Section */}
            <motion.div
                className="contact-form-section"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="form-container">
                    <motion.div
                        className="form-image"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="doctor-image">
                            <motion.div
                                className="doctor-avatar"
                                animate={{
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                👨‍⚕️
                            </motion.div>
                            <motion.div
                                className="medical-badge"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: 0.5,
                                    type: "spring",
                                    stiffness: 200
                                }}
                            >
                                <span>✓</span>
                                <div>Professional<br />Care</div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="form-content"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Get In Touch
                        </motion.h2>
                        <motion.p
                            className="form-subtitle"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </motion.p>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <motion.div
                                    className="form-group"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && (
                                        <span className="error-message">{errors.name}</span>
                                    )}
                                </motion.div>

                                <motion.div
                                    className="form-group"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && (
                                        <span className="error-message">{errors.email}</span>
                                    )}
                                </motion.div>
                            </div>

                            <div className="form-row">
                                <motion.div
                                    className="form-group phone-group"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <div className="phone-input">
                                        <span className="country-code">🇮🇳 +91</span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="98234 56789"
                                            className={errors.phone ? 'error' : ''}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <span className="error-message">{errors.phone}</span>
                                    )}
                                </motion.div>

                                <motion.div
                                    className="form-group"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    >
                                        <option>General Enquiry</option>
                                        <option>Appointment Booking</option>
                                        <option>Medical Consultation</option>
                                        <option>Emergency</option>
                                        <option>Feedback</option>
                                    </select>
                                </motion.div>
                            </div>

                            <motion.div
                                className="form-group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8 }}
                            >
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Type your message"
                                    rows="5"
                                    className={errors.message ? 'error' : ''}
                                ></textarea>
                                {errors.message && (
                                    <span className="error-message">{errors.message}</span>
                                )}
                            </motion.div>

                            <motion.button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.9 }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>

            {/* Footer */}
            <motion.footer
                className="contact-footer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="footer-content">
                    <motion.div
                        className="footer-column"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="footer-logo">
                            <div className="logo">🏥</div>
                            <p>Over past 10+ years of experience and skills in various technologies, we built great scalable products</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="footer-column"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3>Useful Link</h3>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/doctors">Doctors</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="footer-column"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
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
                                <span>H-65,Epic Web Techno<br />B K Tower, Sector 63,<br />Noida,Uttar Pradesh 201003</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="footer-bottom">
                    <p>Copyright © 2026 All Rights Reserved by HMS</p>
                </div>
            </motion.footer>
        </div>
    );
};
