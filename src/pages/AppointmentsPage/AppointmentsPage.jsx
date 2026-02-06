import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AppointmentsPage.css';

export const AppointmentsPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        doctorDepartment: '',
        doctor: '',
        date: '',
        gender: 'male',
        patientType: 'new',
        description: '',
        scheduleId: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation and submission logic
        alert('Appointment request submitted successfully!');
    };

    return (
        <div className="appointments-page">
            {/* Hero Section */}
            <motion.div
                className="appointments-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1>Make Appointment</h1>
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>/</span>
                        <span>Make Appointment</span>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-illustration"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="calendar-illustration">
                        <div className="person person-1">👩‍💼</div>
                        <div className="calendar-grid">
                            <div className="calendar-header">📅</div>
                            <div className="calendar-dates">
                                <div className="date-cell"></div>
                                <div className="date-cell"></div>
                                <div className="date-cell active">✓</div>
                                <div className="date-cell"></div>
                            </div>
                        </div>
                        <div className="person person-2">👨‍💼</div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Appointment Form Section */}
            <motion.div
                className="appointment-form-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="form-container">
                    <div className="form-header">
                        <h2>Make an Appointment</h2>
                        <div className="patient-type-toggle">
                            <label className={formData.patientType === 'new' ? 'active' : ''}>
                                <input
                                    type="radio"
                                    name="patientType"
                                    value="new"
                                    checked={formData.patientType === 'new'}
                                    onChange={handleChange}
                                />
                                <span className="radio-icon"></span>
                                New Patient
                            </label>
                            <label className={formData.patientType === 'old' ? 'active' : ''}>
                                <input
                                    type="radio"
                                    name="patientType"
                                    value="old"
                                    checked={formData.patientType === 'old'}
                                    onChange={handleChange}
                                />
                                <span className="radio-icon"></span>
                                Old Patient
                            </label>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="appointment-form">
                        <div className="form-row">
                            <div className="form-field">
                                <label>First Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter your First Name"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label>Last Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter your Last Name"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label>Gender <span className="required">*</span></label>
                                <div className="gender-options">
                                    <label className={formData.gender === 'male' ? 'active' : ''}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={formData.gender === 'male'}
                                            onChange={handleChange}
                                        />
                                        <span className="radio-icon"></span>
                                        Male
                                    </label>
                                    <label className={formData.gender === 'female' ? 'active' : ''}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={formData.gender === 'female'}
                                            onChange={handleChange}
                                        />
                                        <span className="radio-icon"></span>
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label>Email <span className="required">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label>Password <span className="required">*</span></label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your Password"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label>Confirm Password <span className="required">*</span></label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Enter Confirm Password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label>Doctor Department <span className="required">*</span></label>
                                <select
                                    name="doctorDepartment"
                                    value={formData.doctorDepartment}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Department</option>
                                    <option value="cardiology">Cardiology</option>
                                    <option value="neurology">Neurology</option>
                                    <option value="pediatrics">Pediatrics</option>
                                    <option value="orthopedics">Orthopedics</option>
                                </select>
                            </div>

                            <div className="form-field">
                                <label>Doctor <span className="required">*</span></label>
                                <select
                                    name="doctor"
                                    value={formData.doctor}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Doctor</option>
                                    <option value="dr-harsh">Dr. Harsh Mehta</option>
                                    <option value="dr-patel">Dr. M Patel</option>
                                    <option value="dr-singh">Dr. Anamika Singh</option>
                                </select>
                            </div>

                            <div className="form-field">
                                <label>Date <span className="required">*</span></label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-field full-width">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter Description"
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="form-field full-width">
                            <label>Sched ID</label>
                            <input
                                type="text"
                                name="scheduleId"
                                value={formData.scheduleId}
                                onChange={handleChange}
                                placeholder="Sched ID"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="submit-btn"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Book
                        </motion.button>
                    </form>
                </div>
            </motion.div>

            {/* Contact Info Section */}
            <motion.div
                className="contact-info-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="contact-info-grid">
                    <div className="info-card">
                        <div className="info-icon">📞</div>
                        <h3>+917096336561</h3>
                        <p>Call Now and Get a Free Consulting</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">✉️</div>
                        <h3>hr@epicwebtechno.in</h3>
                        <p>Contact Hospital</p>
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
                                <span>H-65,Epic Web Teachno<br /> B K Tower, Sector 63,<br />Noida,Uttar Pradesh 201003</span>
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
