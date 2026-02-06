import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AboutPage.css';

export const AboutPage = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

    const stats = [
        { number: '199', label: 'Patients Beds', color: '#10b981', delay: 0.2 },
        { number: '246', label: 'Doctors & Nurses', color: '#ec4899', delay: 0.3 },
        { number: '2670', label: 'Happy Patients', color: '#f97316', delay: 0.4 },
        { number: '5', label: 'Years Experience', color: '#3b82f6', delay: 0.5 }
    ];

    const testimonials = [
        {
            name: 'Rossy',
            image: '../k.jpg',
            text: 'I recommend another person to come to this hospital. Everything is hospital is good.',
            rating: 5
        },
        {
            name: 'Siddhi Shukla',
            image: '../171517877408.jpg',
            text: 'Excellent service and professional staff. The doctors are very caring and attentive.',
            rating: 4
        },
        {
            name: 'Sahil Rathi',
            image: '/q.jpg',
            text: 'Best hospital experience I have ever had. Highly recommend to everyone!',
            rating: 5
        }
    ];

    const doctors = [
        {
            name: 'Dr. Anamika Singh',
            specialty: 'Cardiologist',
            image: '../doctor.jpg',
            delay: 0.2
        },
        {
            name: 'Dr. Meenakshi Patel',
            specialty: 'Neurologist',
            image: '../f.jpg.jfif',
            delay: 0.3
        },
        {
            name: 'Dr. Harsh Mehta',
            specialty: 'Endocrinologists',
            image: '../j.jpg',
            delay: 0.4
        },
        {
            name: 'Dr. Anamika Singh',
            specialty: 'Hematologists',
            image: '../im.jfif',
            delay: 0.4
        },
        {
            name: 'Dr. Prem Yadav',
            specialty: 'Pediatrician',
            image: '../d.jpg',
            delay: 0.4
        },
        {
            name: 'Dr. Mukul Tyagi',
            specialty: 'Surgeon',
            image: '../p.jpg',
            delay: 0.5
        }
    ];

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="about-page">
            {/* Hero Section */}
            <motion.div
                className="about-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="about-hero-content"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="about-hero-title">About Us</h1>
                    <div className="about-breadcrumb">
                        <a href="/">Home</a>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">About Us</span>
                    </div>
                </motion.div>

                <motion.div
                    className="about-hero-image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.div
                        className="doctor-hero-img"
                        animate={{
                            y: [0, -15, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <img src="../fa216faf9140c9643bb69250c33a7f0f.jpg" alt="Doctor" onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="doctor-placeholder"></div>';
                        }} />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Stats and About Section */}
            <motion.div
                className="stats-about-section"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <div className="stats-about-container">
                    <motion.div className="stats-grid">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="stat-card"
                                style={{ backgroundColor: `${stat.color}15` }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: stat.delay
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    y: -5,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <motion.h2
                                    style={{ color: stat.color }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: stat.delay + 0.2 }}
                                >
                                    {stat.number}
                                </motion.h2>
                                <p>{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="about-content"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2>About Us</h2>
                        <p>
                            At Home of Compassion Hospital, we are dedicated to providing exceptional and
                            comprehensive care to our patients. Our team of experienced healthcare professionals is
                            committed to using the latest methodologies and techniques to ensure that every patient
                            receives the highest quality of care. We pride ourselves on our commitment to excellence
                            and strive to make a positive difference in the lives of those we serve. Join us in our mission
                            to advance healthcare and improve lives.
                        </p>
                        <motion.button
                            className="about-cta-btn"
                            onClick={() => window.location.href = '/book'}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Book Appointment
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Testimonials Section */}
            <motion.div
                className="testimonials-section"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.span
                    className="section-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    Our testimonials
                </motion.span>

                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    What Our Patients Say About Our<br />
                    Medical Treatments
                </motion.h2>

                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    Our medical clinic provides quality care for the entire family while maintaining a personable
                    atmosphere that services. Our medical.
                </motion.p>

                <div className="testimonial-slider">
                    <motion.div
                        className="testimonial-card"
                        key={currentTestimonial}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="testimonial-content">
                            <motion.div
                                className="testimonial-image"
                                whileHover={{ scale: 1.05 }}
                            >
                                <img
                                    src={testimonials[currentTestimonial].image}
                                    alt={testimonials[currentTestimonial].name}
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23fbbf24"/%3E%3Ccircle cx="50" cy="40" r="15" fill="%23fff"/%3E%3Cpath d="M30 75 Q30 55 50 55 Q70 55 70 75 Z" fill="%23fff"/%3E%3C/svg%3E';
                                    }}
                                />
                                <motion.div
                                    className="quote-icon"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                >
                                    💬
                                </motion.div>
                            </motion.div>

                            <div className="testimonial-text">
                                <h3>{testimonials[currentTestimonial].name}</h3>
                                <div className="testimonial-rating">
                                    {'⭐'.repeat(testimonials[currentTestimonial].rating)}
                                </div>
                                <p>{testimonials[currentTestimonial].text}</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="testimonial-controls">
                        <motion.button
                            className="control-btn prev"
                            onClick={prevTestimonial}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            ←
                        </motion.button>
                        <div className="testimonial-dots">
                            {testimonials.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                                    onClick={() => setCurrentTestimonial(index)}
                                />
                            ))}
                        </div>
                        <motion.button
                            className="control-btn next"
                            onClick={nextTestimonial}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            →
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Doctors Section */}
            <motion.div
                className="doctors-section"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <motion.span
                    className="section-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    Professional Doctors
                </motion.span>

                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    We are Experienced Healthcare<br />
                    Professionals
                </motion.h2>

                <div className="doctors-grid">
                    {doctors.map((doctor, index) => (
                        <motion.div
                            key={index}
                            className="doctor-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: doctor.delay
                            }}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.div
                                className="doctor-image"
                                whileHover={{ scale: 1.05 }}
                            >
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%233b82f6"/%3E%3Ctext x="50" y="60" font-size="40" text-anchor="middle" fill="white" font-weight="bold"%3E' + doctor.name.split(' ').map(n => n[0]).join('') + '%3C/text%3E%3C/svg%3E';
                                    }}
                                />
                            </motion.div>
                            <h3>{doctor.name}</h3>
                            <p className="doctor-specialty">{doctor.specialty}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Footer */}
            <motion.footer
                className="about-footer"
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
                                <span>H-65, Epic Web Techno<br /> B k Tower,Sector 63,<br />Noida,Uttar Pradesh 201003</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="footer-bottom">
                    <p>Copyright © 2026 All Rights Reserved by  Epic Web</p>
                </div>
            </motion.footer>
        </div>
    );
};
