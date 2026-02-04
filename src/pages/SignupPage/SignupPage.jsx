import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

export const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        gender: 'male',
        role: 'patient'
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Phone number is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Get existing users from localStorage
        const users = JSON.parse(localStorage.getItem('hospitalUsers') || '[]');

        // Check if email already exists
        if (users.some(u => u.email.toLowerCase() === formData.email.toLowerCase())) {
            setErrors({
                submit: 'Email already registered. Please login.'
            });
            return;
        }

        // Add new user
        const newUser = {
            id: Date.now(),
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            gender: formData.gender,
            role: formData.role,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('hospitalUsers', JSON.stringify(users));

        // Auto login - store current user
        localStorage.setItem('currentUser', JSON.stringify({
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phone: newUser.phone,
            gender: newUser.gender,
            role: newUser.role
        }));

        // Show success message
        alert(`Registration successful! Welcome, ${newUser.firstName}!`);

        // Redirect to home
        navigate('/');
    };

    return (
        <div className="auth-page">
            <motion.div
                className="auth-container signup-container"
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
                    User Registration
                </motion.h1>

                <motion.p
                    className="auth-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Create your account to get started
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

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">
                                First Name <span className="required">*</span>
                            </label>
                            <motion.input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className={errors.firstName ? 'error' : ''}
                                whileFocus={{ scale: 1.01 }}
                            />
                            {errors.firstName && (
                                <motion.span
                                    className="error-message"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    {errors.firstName}
                                </motion.span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">
                                Last Name <span className="required">*</span>
                            </label>
                            <motion.input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className={errors.lastName ? 'error' : ''}
                                whileFocus={{ scale: 1.01 }}
                            />
                            {errors.lastName && (
                                <motion.span
                                    className="error-message"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    {errors.lastName}
                                </motion.span>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
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
                                placeholder="Email"
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
                            <label htmlFor="phone">
                                Phone <span className="required">*</span>
                            </label>
                            <motion.input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91"
                                className={errors.phone ? 'error' : ''}
                                whileFocus={{ scale: 1.01 }}
                            />
                            {errors.phone && (
                                <motion.span
                                    className="error-message"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    {errors.phone}
                                </motion.span>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
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
                                    placeholder="Password"
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

                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                Confirm Password <span className="required">*</span>
                            </label>
                            <div className="password-input-wrapper">
                                <motion.input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    className={errors.confirmPassword ? 'error' : ''}
                                    whileFocus={{ scale: 1.01 }}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <motion.span
                                    className="error-message"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    {errors.confirmPassword}
                                </motion.span>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            Gender <span className="required">*</span>
                        </label>
                        <div className="radio-group">
                            <motion.label
                                className={`radio-label ${formData.gender === 'male' ? 'active' : ''}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === 'male'}
                                    onChange={handleChange}
                                />
                                <span className="radio-custom"></span>
                                Male
                            </motion.label>

                            <motion.label
                                className={`radio-label ${formData.gender === 'female' ? 'active' : ''}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === 'female'}
                                    onChange={handleChange}
                                />
                                <span className="radio-custom"></span>
                                Female
                            </motion.label>
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        className="auth-submit-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Submit
                    </motion.button>

                    <div className="auth-footer">
                        <p>
                            Already User? {' '}
                            <motion.a
                                href="/login"
                                whileHover={{ scale: 1.05 }}
                            >
                                Sign In
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
