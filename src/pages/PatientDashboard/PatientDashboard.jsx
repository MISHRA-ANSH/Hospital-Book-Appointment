import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardSections } from './DashboardSections';
import { getAppointmentsByPatient } from '../../services/appointmentService';
import './PatientDashboard.css';

export const PatientDashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [currentUser, setCurrentUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [stats, setStats] = useState([
        { icon: '📅', value: '0', label: 'Upcoming Appointments', color: '#667eea' },
        { icon: '✅', value: '0', label: 'Completed', color: '#10b981' },
        { icon: '❌', value: '0', label: 'Cancelled', color: '#ef4444' },
        { icon: '📋', value: '0', label: 'Total Visits', color: '#f59e0b' }
    ]);
    const [expandedMenus, setExpandedMenus] = useState({
        dashboard: true,
        appointments: false,
        doctors: false,
        'medical-records': false,
        prescriptions: false,
        'lab-tests': false,
        billing: false,
        messages: false,
        profile: false,
        notifications: false
    });

    useEffect(() => {
        // Get current user from localStorage
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        setCurrentUser(user);

        // Function to calculate and update stats
        const updateStats = () => {
            if (user?.id) {
                const appointments = getAppointmentsByPatient(user.id);
                const upcoming = appointments.filter(apt =>
                    apt.status === 'PENDING' || apt.status === 'BOOKED' || apt.status === 'CHECKED_IN'
                ).length;
                const completed = appointments.filter(apt => apt.status === 'COMPLETED').length;
                const cancelled = appointments.filter(apt => apt.status === 'CANCELLED' || apt.status === 'REJECTED').length;
                const total = appointments.length;

                setStats([
                    { icon: '📅', value: upcoming.toString(), label: 'Upcoming Appointments', color: '#667eea' },
                    { icon: '✅', value: completed.toString(), label: 'Completed', color: '#10b981' },
                    { icon: '❌', value: cancelled.toString(), label: 'Cancelled', color: '#ef4444' },
                    { icon: '📋', value: total.toString(), label: 'Total Visits', color: '#f59e0b' }
                ]);
            }
        };

        // Initial stats calculation
        updateStats();

        // Poll for updates every 5 seconds
        const interval = setInterval(updateStats, 5000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showUserMenu && !event.target.closest('.user-menu-wrapper')) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showUserMenu]);

    const handleLogout = () => {
        // Clear user session
        localStorage.removeItem('currentUser');
        // Redirect to home page
        window.location.href = '/';
    };

    const toggleMenu = (menuId) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuId]: !prev[menuId]
        }));
    };

    const menuItems = [
        {
            id: 'dashboard',
            icon: '📊',
            label: 'Dashboard',
            subItems: [
                { id: 'upcoming', label: 'Upcoming appointment' },
                { id: 'bills', label: 'Pending bills' },
                { id: 'reports', label: 'Recent reports' }
            ]
        },
        {
            id: 'appointments',
            icon: '📅',
            label: 'Appointments',
            subItems: [
                { id: 'book', label: 'Book appointment' },
                { id: 'view-cancel', label: 'View / cancel appointment' }
            ]
        },
        {
            id: 'doctors',
            icon: '👨‍⚕️',
            label: 'Doctors',
            subItems: [
                { id: 'assigned', label: 'View assigned doctor' },
                { id: 'availability', label: 'Doctor availability' }
            ]
        },
        {
            id: 'medical-records',
            icon: '📋',
            label: 'Medical Records',
            subItems: [
                { id: 'visit-history', label: 'Visit history' },
                { id: 'lab-reports', label: 'Lab reports' },
                { id: 'discharge', label: 'Discharge summary' }
            ]
        },
        {
            id: 'prescriptions',
            icon: '💊',
            label: 'Prescriptions',
            subItems: [
                { id: 'current-medicines', label: 'Current medicines' },
                { id: 'refill', label: 'Refill request' }
            ]
        },
        {
            id: 'lab-tests',
            icon: '🔬',
            label: 'Lab Tests',
            subItems: [
                { id: 'test-status', label: 'Test status' },
                { id: 'download-report', label: 'Download report' }
            ]
        },
        {
            id: 'billing',
            icon: '💳',
            label: 'Billing & Payments',
            subItems: [
                { id: 'bills-list', label: 'Bills' },
                { id: 'online-payment', label: 'Online payment' },
                { id: 'payment-history', label: 'Payment history' }
            ]
        },
        {
            id: 'messages',
            icon: '💬',
            label: 'Messages',
            subItems: [
                { id: 'contact', label: 'Contact doctor / hospital' }
            ]
        },
        {
            id: 'profile',
            icon: '👤',
            label: 'Profile',
            subItems: [
                { id: 'personal-info', label: 'Personal + insurance info' }
            ]
        },
        {
            id: 'notifications',
            icon: '🔔',
            label: 'Notifications',
            subItems: [
                { id: 'appointment-reminder', label: 'Appointment reminder' },
                { id: 'test-alert', label: 'Test result alert' }
            ]
        }
    ];

    // Stats are now calculated in useEffect above

    return (
        <div className="patient-dashboard">
            {/* Sidebar */}
            <motion.aside
                className="dashboard-sidebar"
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="sidebar-header">
                    <div className="logo">🏥</div>
                    <h2>HMS</h2>
                </div>

                <div className="sidebar-search">
                    <input type="text" placeholder="Search" />
                    <span className="search-icon">🔍</span>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="nav-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div
                                className={`nav-link ${activeSection === item.id ? 'active' : ''} ${expandedMenus[item.id] ? 'expanded' : ''}`}
                                onClick={() => {
                                    setActiveSection(item.id);
                                    toggleMenu(item.id);
                                }}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-label">{item.label}</span>
                            </div>
                            <AnimatePresence>
                                {item.subItems && expandedMenus[item.id] && (
                                    <motion.div
                                        className="sub-items"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {item.subItems.map((subItem) => (
                                            <div
                                                key={subItem.id}
                                                className="sub-item"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveSection(subItem.id);
                                                }}
                                            >
                                                {subItem.label}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}

                    <motion.div
                        className="nav-item logout"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: menuItems.length * 0.05 }}
                    >
                        <div className="nav-link" onClick={() => window.location.href = '/login'}>
                            <span className="nav-icon">🚪</span>
                            <span className="nav-label">Logout</span>
                        </div>
                    </motion.div>
                </nav>
            </motion.aside>

            {/* Main Content */}
            <div className="dashboard-main">
                {/* Top Header Bar */}
                <motion.div
                    className="dashboard-top-bar"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="top-bar-left">
                        <button className="hamburger-menu">☰</button>
                        <h1 className="page-title">Dashboard</h1>
                    </div>

                    <div className="top-bar-right">
                        <motion.button
                            className="icon-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            🌙
                        </motion.button>
                        <motion.button
                            className="icon-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            🔔
                        </motion.button>
                        <div className="user-menu-wrapper">
                            <motion.div
                                className="user-info-header"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="user-avatar-small">
                                    {currentUser?.firstName?.charAt(0)}{currentUser?.lastName?.charAt(0)}
                                </div>
                                <span className="user-name-header">
                                    {currentUser?.firstName} {currentUser?.lastName}
                                </span>
                                <span className="dropdown-arrow">▾</span>
                            </motion.div>

                            {/* User Dropdown Menu */}
                            <AnimatePresence>
                                {showUserMenu && (
                                    <motion.div
                                        className="user-dropdown-menu"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="dropdown-item">
                                            <span className="dropdown-icon">👤</span>
                                            <span>Edit Profile</span>
                                        </div>
                                        <div className="dropdown-item">
                                            <span className="dropdown-icon">🔒</span>
                                            <span>Change Password</span>
                                        </div>
                                        <div className="dropdown-item">
                                            <span className="dropdown-icon">🌐</span>
                                            <span>Change Language</span>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <div className="dropdown-item logout-item" onClick={handleLogout}>
                                            <span className="dropdown-icon">🚪</span>
                                            <span>Logout</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Dynamic Content Sections */}
                <DashboardSections
                    activeSection={activeSection}
                    currentUser={currentUser}
                    stats={stats}
                />
            </div>
        </div>
    );
};
