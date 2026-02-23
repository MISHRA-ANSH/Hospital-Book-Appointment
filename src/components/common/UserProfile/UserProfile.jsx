import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentUser, logoutUser } from '../../../services/authService';
import './UserProfile.css';

export const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const loadUser = () => {
            const currentUser = getCurrentUser();
            setUser(currentUser);
        };

        loadUser();

        // Listen for storage changes (when user logs in/out in another tab)
        const handleStorageChange = (e) => {
            if (e.key === 'currentUser') {
                loadUser();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Also check periodically for session changes
        const interval = setInterval(loadUser, 2000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    const handleLogout = () => {
        const result = logoutUser();
        if (result.success) {
            setUser(null);
            setShowDropdown(false);
            window.location.href = '/';
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="user-profile-wrapper">
            <motion.button
                className="user-profile-btn"
                onClick={() => setShowDropdown(!showDropdown)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="user-avatar">
                    {user.firstName?.charAt(0) || 'U'}{user.lastName?.charAt(0) || 'U'}
                </div>
                <div className="user-info-inline">
                    <span className="user-name">{user.firstName} {user.lastName}</span>
                    <span className="user-role-badge">{user.role}</span>
                </div>
                <span className="dropdown-arrow">▾</span>
            </motion.button>

            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        className="user-dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="dropdown-header">
                            <div className="user-info">
                                <p className="user-full-name">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="user-email">{user.email}</p>
                                <span className={`role-badge role-${user.role}`}>
                                    {user.role === 'admin' && '👔 Admin'}
                                    {user.role === 'doctor' && '👨‍⚕️ Doctor'}
                                    {user.role === 'patient' && '🏥 Patient'}
                                </span>
                            </div>
                        </div>

                        <div className="dropdown-divider"></div>

                        <div className="dropdown-menu">
                            {user.role === 'patient' && (
                                <button className="dropdown-item" onClick={() => window.location.href = '/book'}>
                                    <span className="item-icon">📅</span>
                                    My Appointments
                                </button>
                            )}
                            {user.role === 'doctor' && (
                                <>
                                    <button className="dropdown-item" onClick={() => window.location.href = '/queue'}>
                                        <span className="item-icon">📋</span>
                                        Manage Queue
                                    </button>
                                    <button className="dropdown-item" onClick={() => window.location.href = '/appointments'}>
                                        <span className="item-icon">📅</span>
                                        View Appointments
                                    </button>
                                </>
                            )}
                            {user.role === 'admin' && (
                                <>
                                    <button className="dropdown-item" onClick={() => window.location.href = '/dashboard'}>
                                        <span className="item-icon">📊</span>
                                        Dashboard
                                    </button>
                                    <button className="dropdown-item" onClick={() => window.location.href = '/users'}>
                                        <span className="item-icon">👥</span>
                                        Manage Users
                                    </button>
                                </>
                            )}
                            <button className="dropdown-item" onClick={() => window.location.href = '/profile'}>
                                <span className="item-icon">👤</span>
                                Profile Settings
                            </button>
                        </div>

                        <div className="dropdown-divider"></div>

                        <button className="dropdown-item logout-item" onClick={handleLogout}>
                            <span className="item-icon">🚪</span>
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
