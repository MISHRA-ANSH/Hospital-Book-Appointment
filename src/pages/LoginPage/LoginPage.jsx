import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import authorizedDoctorsData from '../../data/authorizedDoctors.json';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'patient'
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Special handling for doctor login
        if (formData.role === 'doctor') {
            // Check if doctor is authorized
            const authorizedDoctor = authorizedDoctorsData.doctors.find(doc =>
                doc.email.toLowerCase() === formData.email.toLowerCase() &&
                doc.password === formData.password &&
                doc.isActive
            );

            if (authorizedDoctor) {
                // Store current doctor session with full details
                localStorage.setItem('currentUser', JSON.stringify({
                    id: authorizedDoctor.id,
                    email: authorizedDoctor.email,
                    firstName: authorizedDoctor.firstName,
                    lastName: authorizedDoctor.lastName,
                    phone: authorizedDoctor.phone,
                    specialty: authorizedDoctor.specialty,
                    department: authorizedDoctor.department,
                    experience: authorizedDoctor.experience,
                    role: 'doctor'
                }));

                // Show success message
                alert(`Welcome back, Dr. ${authorizedDoctor.firstName}!`);

                // Redirect to doctor dashboard
                navigate('/doctor-dashboard');
            } else {
                // Doctor not authorized
                setErrors({
                    submit: 'Invalid details. Contact admin.'
                });
            }
            return;
        }

        // For patient and admin roles, check localStorage
        const users = JSON.parse(localStorage.getItem('hospitalUsers') || '[]');

        // Find user with matching email, password, and role
        const user = users.find(u =>
            u.email.toLowerCase() === formData.email.toLowerCase() &&
            u.password === formData.password &&
            u.role === formData.role
        );

        if (user) {
            // Store current user session
            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                gender: user.gender,
                role: user.role
            }));

            // Show success message
            alert(`Welcome back, ${user.firstName}!`);

            // Redirect based on role
            if (user.role === 'patient') {
                navigate('/patient-dashboard');
            } else if (user.role === 'admin') {
                navigate('/'); // Will create admin dashboard later
            } else {
                navigate('/');
            }
        } else {
            setErrors({
                submit: 'Invalid email, password, or role selection'
            });
        }
    };

    return (
        <div className="auth-page">
            <motion.div
                className="auth-container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    className="auth-icon"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.2
                    }}
                >
                    <div className="shield-icon">
                        <span>🏥</span>
                    </div>
                </motion.div>

                <motion.h1
                    className="auth-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Hospital Login Page
                </motion.h1>

                <motion.p
                    className="auth-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Welcome back! Please login to your account
                </motion.p>

                {/* Role Selection */}
                <motion.div
                    className="role-selector"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                >
                    <motion.button
                        type="button"
                        className={`role-btn ${formData.role === 'patient' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, role: 'patient' }))}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="role-icon">🏥</span>
                        <span className="role-text">Patient</span>
                    </motion.button>

                    <motion.button
                        type="button"
                        className={`role-btn ${formData.role === 'doctor' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, role: 'doctor' }))}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="role-icon">👨‍⚕️</span>
                        <span className="role-text">Doctor</span>
                    </motion.button>

                    <motion.button
                        type="button"
                        className={`role-btn ${formData.role === 'admin' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, role: 'admin' }))}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="role-icon">👔</span>
                        <span className="role-text">Admin</span>
                    </motion.button>
                </motion.div>

                <motion.form
                    className="auth-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {errors.submit && (
                        <motion.div
                            className="error-banner"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {errors.submit}
                        </motion.div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">
                            Email <span className="required">*</span>
                        </label>
                        <motion.input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={errors.email ? 'error' : ''}
                            whileFocus={{ scale: 1.01 }}
                        />
                        {errors.email && (
                            <motion.span
                                className="error-message"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                {errors.email}
                            </motion.span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password <span className="required">*</span>
                        </label>
                        <div className="password-input-wrapper">
                            <motion.input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={errors.password ? 'error' : ''}
                                whileFocus={{ scale: 1.01 }}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {errors.password && (
                            <motion.span
                                className="error-message"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                {errors.password}
                            </motion.span>
                        )}
                    </div>

                    <motion.button
                        type="submit"
                        className="auth-submit-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Login
                    </motion.button>

                    <div className="auth-footer">
                        <p>
                            New User? {' '}
                            <motion.a
                                href="/signup"
                                whileHover={{ scale: 1.05 }}
                            >
                                Sign Up
                            </motion.a>
                        </p>
                    </div>
                </motion.form>
            </motion.div>

            {/* Decorative Elements */}
            <div className="auth-bg-decoration">
                <motion.div
                    className="floating-shape shape-1"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="floating-shape shape-2"
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="floating-shape shape-3"
                    animate={{
                        y: [0, -25, 0],
                        rotate: [0, 10, 0]
                    }}
                    transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </div>
    );
};
