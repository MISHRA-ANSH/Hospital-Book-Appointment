import React from 'react';
import { motion } from 'framer-motion';
import './DoctorsPage.css';

export const DoctorsPage = () => {
    const doctors = [
        {
            name: 'Dr. Anamika Singh',
            specialty: 'Cardiologist',
            image: '../doctor.jpg',
            experience: '10 Years',
            rating: 5,
            patients: '2000+'
        },
        {
            name: 'Dr. Meenakshi Patel',
            specialty: 'Neurologist',
            image: '../f.jpg.jfif',
            experience: '8 Years',
            rating: 5,
            patients: '1500+'
        },
        {
            name: 'Dr. Harsh Mehta',
            specialty: 'Endocrinologist',
            image: '../j.jpg',
            experience: '12 Years',
            rating: 5,
            patients: '2500+'
        },
        {
            name: 'Dr. Anamika Singh',
            specialty: 'Hematologist',
            image: '../im.jfif',
            experience: '9 Years',
            rating: 5,
            patients: '1800+'
        },
        {
            name: 'Dr. Prem Yadav',
            specialty: 'Pediatrician',
            image: '../d.jpg',
            experience: '15 Years',
            rating: 5,
            patients: '3000+'
        },
        {
            name: 'Dr. Mukul Tyagi',
            specialty: 'Surgeon',
            image: '../p.jpg',
            experience: '11 Years',
            rating: 5,
            patients: '2200+'
        },
        {
            name: 'Dr. Rossy',
            specialty: 'General Physician',
            image: '../k.jpg',
            experience: '7 Years',
            rating: 5,
            patients: '1200+'
        },
        {
            name: 'Dr. Siddhi Shukla',
            specialty: 'Dermatologist',
            image: '../171517877408.jpg',
            experience: '6 Years',
            rating: 4,
            patients: '1000+'
        },
        {
            name: 'Dr. Sahil Rathi',
            specialty: 'Orthopedic',
            image: '/q.jpg',
            experience: '13 Years',
            rating: 5,
            patients: '2800+'
        }
    ];

    return (
        <div className="doctors-page">
            {/* Hero Section */}
            <motion.div
                className="doctors-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="hero-content">
                    <h1>Our Doctors</h1>
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>/</span>
                        <span>Doctors</span>
                    </div>
                </div>
                <div className="hero-icon">👨‍⚕️</div>
            </motion.div>

            {/* Doctors Section */}
            <motion.div
                className="doctors-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="doctors-header">
                    <h2>Meet Our Expert Doctors</h2>
                    <p className="subtitle">Experienced healthcare professionals dedicated to your wellbeing</p>
                </div>

                <div className="doctors-grid">
                    {doctors.map((doctor, index) => (
                        <motion.div
                            key={index}
                            className="doctor-card"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="doctor-image-wrapper">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="doctor-image"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%233b82f6"/%3E%3Ctext x="50" y="60" font-size="40" text-anchor="middle" fill="white" font-weight="bold"%3E' + doctor.name.split(' ').map(n => n[0]).join('') + '%3C/text%3E%3C/svg%3E';
                                    }}
                                />
                                <div className="doctor-badge">
                                    <span className="badge-icon">✓</span>
                                    Verified
                                </div>
                            </div>

                            <div className="doctor-info">
                                <h3>{doctor.name}</h3>
                                <p className="specialty">{doctor.specialty}</p>

                                <div className="doctor-stats">
                                    <div className="stat-item">
                                        <span className="stat-icon">⭐</span>
                                        <span className="stat-value">{doctor.rating}/5</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-icon">👥</span>
                                        <span className="stat-value">{doctor.patients}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-icon">📅</span>
                                        <span className="stat-value">{doctor.experience}</span>
                                    </div>
                                </div>

                                <motion.button
                                    className="book-btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.location.href = '/appointments'}
                                >
                                    Book Appointment
                                </motion.button>
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
                                <span>H-65,Epic Web Teachno<br /> B K Tower, ,<br />Surat, Gujarat 394101</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>Copyright © 2026 All Rights Reserved by HMS</p>
                </div>
            </footer>
        </div>
    );
};
