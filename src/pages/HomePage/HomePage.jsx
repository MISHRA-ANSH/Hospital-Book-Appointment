import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HospitalContext } from '../../context/HospitalContext';
import { Card } from '../../components/common/UI/Card';
import { formatDate } from '../../utils/dateUtils';
import { getCurrentUser, registerUser, loginUser } from '../../services/authService';
import { getAvailableSlots, initializeSlotsForDoctors } from '../../services/timeSlotService';
import { bookAppointment } from '../../services/appointmentService';
import authorizedDoctorsData from '../../data/authorizedDoctors.json';
import './HomePage.css';

export const HomePage = () => {
    const { appointments, doctors, patients, queue } = useContext(HospitalContext);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [patientDetails, setPatientDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        gender: 'male'
    });
    const currentUser = getCurrentUser();

    const authorizedDoctors = authorizedDoctorsData.doctors;

    const today = formatDate(new Date());
    const todayAppointments = appointments.filter(apt => apt.date === today);
    const activeQueue = queue.filter(q => q.status !== 'COMPLETED' && q.status !== 'CANCELLED');
    const availableDoctors = doctors.filter(d => d.isAvailable);

    // Initialize slots for all doctors on component mount
    useEffect(() => {
        initializeSlotsForDoctors(authorizedDoctors);
    }, []);

    // Handle doctor selection - check if user is logged in
    const handleDoctorChange = (e) => {
        const doctorId = e.target.value;
        setSelectedDoctor(doctorId);
    };

    // Load available slots when doctor and date are selected
    useEffect(() => {
        if (selectedDoctor && selectedDate) {
            setLoading(true);
            try {
                const slots = getAvailableSlots(selectedDoctor, selectedDate);
                setAvailableSlots(slots);
                setSelectedSlot(null);
            } catch (error) {
                setMessage({ type: 'error', text: 'Error loading slots' });
            } finally {
                setLoading(false);
            }
        } else {
            setAvailableSlots([]);
            setSelectedSlot(null);
        }
    }, [selectedDoctor, selectedDate]);

    const handleBookAppointment = async (e) => {
        e.preventDefault();

        // Check if user is logged in
        if (!currentUser) {
            // Show login modal instead of redirecting
            setShowLoginModal(true);
            return;
        }

        // Check if user is a patient
        if (currentUser.role !== 'patient') {
            setMessage({ type: 'error', text: 'Only patients can book appointments' });
            return;
        }

        if (!selectedSlot) {
            setMessage({ type: 'error', text: 'Please select a time slot' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const doctor = authorizedDoctors.find(d => d.id === selectedDoctor);

            const appointment = bookAppointment({
                patientId: currentUser.id,
                patientName: `${currentUser.firstName} ${currentUser.lastName}`,
                patientEmail: currentUser.email,
                doctorId: doctor.id,
                doctorName: `Dr. ${doctor.firstName} ${doctor.lastName}`,
                doctorEmail: doctor.email,
                department: doctor.department,
                slotId: selectedSlot.id
            });

            setMessage({
                type: 'success',
                text: `Appointment request sent successfully! Queue number: #${appointment.queueNumber}. Waiting for doctor approval.`
            });

            // Reset form
            setTimeout(() => {
                setSelectedDoctor('');
                setSelectedDate('');
                setAvailableSlots([]);
                setSelectedSlot(null);
                setMessage({ type: '', text: '' });
            }, 3000);

        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    // Handle patient registration and booking from modal
    const handleModalSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Register the patient
            const registerResult = registerUser({
                ...patientDetails,
                role: 'patient'
            });

            if (!registerResult.success) {
                setMessage({ type: 'error', text: registerResult.message });
                setLoading(false);
                return;
            }

            // Login the patient
            const loginResult = loginUser(patientDetails.email, patientDetails.password, 'patient');

            if (!loginResult.success) {
                setMessage({ type: 'error', text: 'Registration successful but login failed. Please login manually.' });
                setLoading(false);
                return;
            }

            // Book the appointment
            const doctor = authorizedDoctors.find(d => d.id === selectedDoctor);
            const appointment = bookAppointment({
                patientId: loginResult.user.id,
                patientName: `${loginResult.user.firstName} ${loginResult.user.lastName}`,
                patientEmail: loginResult.user.email,
                doctorId: doctor.id,
                doctorName: `Dr. ${doctor.firstName} ${doctor.lastName}`,
                doctorEmail: doctor.email,
                department: doctor.department,
                slotId: selectedSlot.id
            });

            setMessage({
                type: 'success',
                text: `Account created and appointment booked! Queue number: #${appointment.queueNumber}`
            });

            setShowLoginModal(false);

            // Reload page to update user session
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    // Get minimum date (today)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Get maximum date (30 days from now)
    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        return maxDate.toISOString().split('T')[0];
    };

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

                    {message.text && (
                        <div className={`alert alert-${message.type}`} style={{
                            padding: '1rem',
                            marginBottom: '1rem',
                            borderRadius: '8px',
                            backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                            color: message.type === 'success' ? '#065f46' : '#991b1b',
                            textAlign: 'center'
                        }}>
                            {message.text}
                        </div>
                    )}

                    <form className="booking-form" onSubmit={handleBookAppointment}>
                        <select
                            className="booking-select"
                            value={selectedDoctor}
                            onChange={handleDoctorChange}
                            required
                        >
                            <option value="">Select Doctor</option>
                            {authorizedDoctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>
                                    Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                                </option>
                            ))}
                        </select>

                        <input
                            type="date"
                            className="booking-date"
                            placeholder="Select Date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={getMinDate()}
                            max={getMaxDate()}
                            required
                        />
                        {selectedDoctor && selectedDate && (
                            <select
                                className="booking-select"
                                value={selectedSlot?.id || ''}
                                onChange={(e) => {
                                    const slot = availableSlots.find(s => s.id === e.target.value);
                                    setSelectedSlot(slot);
                                }}
                                required
                            >
                                <option value="">Select Time Slot</option>
                                {loading ? (
                                    <option disabled>Loading slots...</option>
                                ) : availableSlots.length > 0 ? (
                                    availableSlots.map(slot => (
                                        <option
                                            key={slot.id}
                                            value={slot.id}
                                            disabled={!slot.isAvailable}
                                        >
                                            🕐 {slot.time} {!slot.isAvailable ? '(Booked)' : ''}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No slots available</option>
                                )}
                            </select>
                        )}

                        <motion.button
                            type="submit"
                            className="booking-btn"
                            disabled={loading || !selectedSlot}
                            whileHover={{ scale: loading || !selectedSlot ? 1 : 1.05 }}
                            whileTap={{ scale: loading || !selectedSlot ? 1 : 0.95 }}
                            style={{
                                opacity: loading || !selectedSlot ? 0.6 : 1,
                                cursor: loading || !selectedSlot ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Booking...' : 'Book Now'}
                        </motion.button>
                    </form>
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
                        { name: "Dr. Prem Yadav", role: "Cardiologist", avatar: "PY", class: "purple" },
                        { name: "Dr. Anay Gupta", role: "Neurologist", avatar: null },
                        { name: "Dr. Anamika Singh", role: "Pediatrician", avatar: null },
                        { name: "Dr. Siddhi Shukla", role: "Surgeon", avatar: null }
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
                        { name: "Nancy Gaur", role: "Patient", text: "The care I received was exceptional. The doctors were attentive, professional, and made me feel comfortable throughout my treatment. Highly recommend this hospital!", color: "fecaca" },
                        { name: "Sahil Rathi", role: "Patient", text: "Outstanding medical facility with state-of-the-art equipment. The staff is friendly and the doctors are highly skilled. I'm grateful for the excellent care I received.", color: "bfdbfe" }
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
                    <p>Copyright © 2026 All Rights Reserved by Epic Web</p>
                </div>
            </motion.footer>

            {/* Patient Details Modal */}
            {showLoginModal && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowLoginModal(false)}
                >
                    <motion.div
                        className="modal-content"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h2>📋 Patient Details</h2>
                            <button className="modal-close" onClick={() => setShowLoginModal(false)}>✕</button>
                        </div>

                        <form className="modal-form" onSubmit={handleModalSubmit}>
                            <div className="form-row-modal">
                                <div className="form-field-modal">
                                    <label>First Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={patientDetails.firstName}
                                        onChange={(e) => setPatientDetails({ ...patientDetails, firstName: e.target.value })}
                                        placeholder="Enter first name"
                                    />
                                </div>
                                <div className="form-field-modal">
                                    <label>Last Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={patientDetails.lastName}
                                        onChange={(e) => setPatientDetails({ ...patientDetails, lastName: e.target.value })}
                                        placeholder="Enter last name"
                                    />
                                </div>
                            </div>

                            <div className="form-field-modal">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={patientDetails.email}
                                    onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })}
                                    placeholder="Enter email address"
                                />
                            </div>

                            <div className="form-field-modal">
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    required
                                    value={patientDetails.phone}
                                    onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                                    placeholder="Enter phone number"
                                />
                            </div>

                            <div className="form-field-modal">
                                <label>Password *</label>
                                <input
                                    type="password"
                                    required
                                    value={patientDetails.password}
                                    onChange={(e) => setPatientDetails({ ...patientDetails, password: e.target.value })}
                                    placeholder="Create a password"
                                    minLength="6"
                                />
                            </div>

                            <div className="form-field-modal">
                                <label>Gender *</label>
                                <select
                                    required
                                    value={patientDetails.gender}
                                    onChange={(e) => setPatientDetails({ ...patientDetails, gender: e.target.value })}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {message.text && (
                                <div className={`alert alert-${message.type}`} style={{
                                    padding: '0.75rem',
                                    marginTop: '1rem',
                                    borderRadius: '8px',
                                    backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                                    color: message.type === 'success' ? '#065f46' : '#991b1b',
                                    textAlign: 'center',
                                    fontSize: '14px'
                                }}>
                                    {message.text}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="modal-submit-btn"
                                disabled={loading}
                            >
                                {loading ? 'Booking...' : 'Register & Book Appointment'}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};
