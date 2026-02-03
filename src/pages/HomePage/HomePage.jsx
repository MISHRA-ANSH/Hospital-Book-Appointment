import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { HospitalContext } from '../../context/HospitalContext';
import { Card } from '../../components/common/UI/Card';
import { formatDate } from '../../utils/dateUtils';
import './HomePage.css';

export const HomePage = () => {
    const { appointments, doctors, patients, queue } = useContext(HospitalContext);

    const today = formatDate(new Date());
    const todayAppointments = appointments.filter(apt => apt.date === today);
    const activeQueue = queue.filter(q => q.status !== 'COMPLETED' && q.status !== 'CANCELLED');
    const availableDoctors = doctors.filter(d => d.isAvailable);

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

    return (
        <div className="home-page">
            {/* Hero Section */}
            <motion.div
                className="hero-section"
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
                    <motion.span
                        className="hero-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        5 Years Experience
                    </motion.span>
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Digital Hospital<br />
                        Management at one<br />
                        place
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        Next-Gen Hospital Solutions: Drive Innovation, Deliver Quality Healthcare
                    </motion.p>
                    <motion.button
                        className="hero-cta"
                        onClick={() => window.location.href = '/book'}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 107, 107, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Sign Up
                    </motion.button>
                </motion.div>

                <motion.div
                    className="hero-image"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.div
                        className="illustration"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="hospital-scene"></div>
                        <motion.div
                            className="floating-element element-1"
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="floating-element element-2"
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Booking Bar */}
            <motion.div
                className="booking-bar-section"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <motion.div
                    className="booking-bar"
                    whileHover={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)" }}
                >
                    <h2 className="booking-title">Book an Appointment</h2>
                    <div className="booking-form">
                        <select className="booking-select">
                            <option>Select Doctor</option>
                            {doctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>
                                    Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                                </option>
                            ))}
                        </select>
                        <input type="date" className="booking-date" placeholder="Select Date" />
                        <motion.button
                            className="booking-btn"
                            onClick={() => window.location.href = '/book'}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Book Now
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Easy Steps Section - Simple 2x2 Grid */}
            <motion.div
                className="easy-steps-section-simple"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <div className="steps-header">
                    <motion.span
                        className="section-badge"
                        variants={fadeInUp}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Easy Solutions
                    </motion.span>
                    <motion.h2
                        className="section-heading"
                        variants={fadeInUp}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        4 Easy Steps to Get the World's<br />Best Treatment
                    </motion.h2>
                    <motion.p
                        className="section-description"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Follow our simple process to receive world-class healthcare services
                    </motion.p>
                </div>

                <motion.div className="steps-grid-simple" variants={staggerContainer}>
                    {[
                        {
                            icon: "👨‍⚕️",
                            title: "Qualified Doctors",
                            desc: "Check expert Doctor profile as per your need and get consultation.",
                            bgColor: "#e8f5e9"
                        },
                        {
                            icon: "🎧",
                            title: "Digital Consultation R...",
                            desc: "Our utmost priority is to ensure safety and well being of our patients. To avoid adverse health conditions later...",
                            bgColor: "#fff3e0"
                        },
                        {
                            icon: "💼",
                            title: "Get Your Consultant",
                            desc: "Our internal medicine consultants provide personalized care and treat patients with a wide range of acute and chro...",
                            bgColor: "#e8eaf6"
                        },
                        {
                            icon: "✅",
                            title: "Get Your Treatment",
                            desc: "We offers expert care from the best doctors. The doctors may direct you to a specialist if needed, in order to hel...",
                            bgColor: "#fce4ec"
                        }
                    ].map((step, index) => (
                        <motion.div
                            key={index}
                            className="step-card-simple"
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
                                className="step-icon-simple"
                                style={{ backgroundColor: step.bgColor }}
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
                                <span>{step.icon}</span>
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                            >
                                {step.title}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.4 }}
                            >
                                {step.desc}
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* About Section */}
            <motion.div
                className="about-section"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div
                    className="about-stats"
                    variants={staggerContainer}
                >
                    {[
                        { number: "199", text: "Patients Beds", class: "green" },
                        { number: "245", text: "Doctors & Nurses", class: "pink" },
                        { number: "2667", text: "Happy Patients", class: "orange" },
                        { number: "5", text: "Years Experience", class: "blue" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className={`stat-box ${stat.class}`}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <motion.div
                                className="stat-number"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {stat.number}
                            </motion.div>
                            <div className="stat-text">{stat.text}</div>
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
                        committed to using the latest technologies and techniques to ensure that every patient
                        receives the highest quality of care. We pride ourselves on our commitment to excellence
                        and strive to make a positive difference in the lives of those we serve. Join us in our mission
                        to advance healthcare and improve lives.
                    </p>
                    <motion.button
                        className="about-cta"
                        onClick={() => window.location.href = '/book'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Book Appointment
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Services Section */}
            <motion.div
                className="services-section"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <motion.h2 className="section-title" variants={fadeInUp}>
                    We Offer Different Services To<br />Improve Your Health
                </motion.h2>

                <motion.div className="services-grid" variants={staggerContainer}>
                    {[
                        { icon: "🩺", title: "Cardiology", desc: "Comprehensive heart care with advanced diagnostic and treatment options for all cardiac conditions.", class: "orange" },
                        { icon: "🧬", title: "Genetics", desc: "Personalized genetic testing and counseling to understand hereditary conditions and health risks.", class: "blue" },
                        { icon: "🧠", title: "Neurology", desc: "Expert neurological care for brain, spine, and nervous system disorders with latest treatments.", class: "purple" }
                    ].map((service, index) => (
                        <motion.div
                            key={index}
                            className="service-card"
                            variants={fadeInUp}
                            whileHover={{ y: -10, boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)" }}
                        >
                            <motion.div
                                className={`service-icon ${service.class}`}
                                whileHover={{ scale: 1.1, rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span>{service.icon}</span>
                            </motion.div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Certified Doctor Section */}
            <motion.div
                className="certified-doctor-section"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div
                    className="certified-content"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Have Certified and High Quality<br />Doctor For You</h2>
                    <p>
                        Our hospital is proud to have a team of highly qualified and certified doctors who are
                        dedicated to providing exceptional medical care. Each doctor brings years of experience
                        and specialized training to ensure you receive the best treatment possible. We maintain
                        the highest standards of medical excellence and patient care.
                    </p>
                    <motion.button
                        className="certified-cta"
                        onClick={() => window.location.href = '/doctors'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View All Doctors
                    </motion.button>
                </motion.div>

                <motion.div
                    className="certified-image"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="doctor-illustration"
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.div
                            className="certification-badge"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                        >
                            <span>✓</span>
                            <div>Internationally<br />Certified</div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Team Section */}
            <motion.div
                className="team-section"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <motion.h2 className="section-title" variants={fadeInUp}>
                    We are Experienced Healthcare<br />Professionals
                </motion.h2>

                <motion.div className="team-grid" variants={staggerContainer}>
                    {[
                        { name: "Dr. Nazrul Islam", role: "Cardiologist", avatar: "NZ", class: "purple" },
                        { name: "Dr. Masud Rana", role: "Neurologist", avatar: null },
                        { name: "Dr. Joshna Akter", role: "Pediatrician", avatar: null },
                        { name: "Dr. Kabir Hasan", role: "Surgeon", avatar: null }
                    ].map((member, index) => (
                        <motion.div
                            key={index}
                            className="team-member"
                            variants={fadeInUp}
                            whileHover={{ y: -10 }}
                        >
                            <motion.div
                                className={`member-avatar ${member.class || ''}`}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {member.avatar ? member.avatar : (
                                    <img src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23${index === 1 ? 'e5e7eb' : index === 2 ? 'dbeafe' : 'fed7aa'}'/%3E%3Ccircle cx='50' cy='40' r='15' fill='%23fff'/%3E%3Cpath d='M30 75 Q30 55 50 55 Q70 55 70 75 Z' fill='%23fff'/%3E%3C/svg%3E`} alt="Doctor" />
                                )}
                            </motion.div>
                            <h3>{member.name}</h3>
                            <p className="member-role">{member.role}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Testimonials Section */}
            <motion.div
                className="testimonials-section"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <motion.h2 className="section-title" variants={fadeInUp}>
                    What Our Patients Say About Our<br />Medical Treatments
                </motion.h2>

                <motion.div className="testimonials-grid" variants={staggerContainer}>
                    {[
                        { name: "Nancy", role: "Patient", text: "The care I received was exceptional. The doctors were attentive, professional, and made me feel comfortable throughout my treatment. Highly recommend this hospital!", color: "fecaca" },
                        { name: "John Smith", role: "Patient", text: "Outstanding medical facility with state-of-the-art equipment. The staff is friendly and the doctors are highly skilled. I'm grateful for the excellent care I received.", color: "bfdbfe" }
                    ].map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="testimonial-card"
                            variants={fadeInUp}
                            whileHover={{ y: -5, boxShadow: "0 15px 40px rgba(0, 0, 0, 0.12)" }}
                        >
                            <div className="testimonial-header">
                                <img src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23${testimonial.color}'/%3E%3Ccircle cx='50' cy='40' r='15' fill='%23fff'/%3E%3Cpath d='M30 75 Q30 55 50 55 Q70 55 70 75 Z' fill='%23fff'/%3E%3C/svg%3E`} alt="Patient" className="testimonial-avatar" />
                                <div>
                                    <h4>{testimonial.name}</h4>
                                    <p className="testimonial-role">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="testimonial-text">{testimonial.text}</p>
                            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.footer
                className="footer"
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
                                <span>H-65, B.K Tower <br />Sector 63 H Block<br />Sector 63 Noida <br />201003</span>
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
