import React from 'react';
import { motion } from 'framer-motion';
import './ServicesPage.css';

export const ServicesPage = () => {
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

    const services = [
        {
            icon: "❤️",
            title: "Cardiology",
            description: "Cardiology is medicine specialty that involves diagnosis and treatment of disorders of the heart",
            bgColor: "#fed7aa"
        },
        {
            icon: "💊",
            title: "Medicine",
            description: "Medicine is the science[1] and practice[2] of caring for a patient, managing the diagnosis, prognosis, prevention, treatment...",
            bgColor: "#99f6e4"
        },
        {
            icon: "🩺",
            title: "Neurology",
            description: "Expert neurological care for brain, spine, and nervous system disorders with latest treatments.",
            bgColor: "#c4b5fd"
        }
    ];

    return (
        <div className="services-page">
            {/* Hero Section */}
            <motion.div
                className="services-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="services-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="services-hero-title">Services</h1>
                    <div className="services-breadcrumb">
                        <a href="/">Home</a>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">Services</span>
                    </div>
                </motion.div>

                <motion.div
                    className="services-hero-image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="medical-scan-illustration">
                        <div className="scan-machine"></div>
                        <div className="doctor-figure"></div>
                        <div className="patient-figure"></div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Services Content Section */}
            <motion.div
                className="services-content-section"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <motion.div className="services-header" variants={fadeInUp}>
                    <span className="services-badge">Our Services</span>
                    <h2 className="services-main-title">
                        We Offer Different Services To<br />
                        Improve Your Health
                    </h2>
                </motion.div>

                <motion.div className="services-cards-grid" variants={staggerContainer}>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="service-card-item"
                            variants={fadeInUp}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1
                            }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.div
                                className="service-card-icon"
                                style={{ backgroundColor: service.bgColor }}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1 + 0.2,
                                    type: "spring",
                                    stiffness: 200
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <span>{service.icon}</span>
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                            >
                                {service.title}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.4 }}
                            >
                                {service.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.footer
                className="services-footer"
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
                                <span>H-65, Epic Web Techno<br />B K Tower,<br />Sector 63, Noida 201003</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="footer-bottom">
                    <p>Copyright © 2026 All Rights Reserved by Epic Web</p>
                </div>
            </motion.footer>
        </div>
    );
};
