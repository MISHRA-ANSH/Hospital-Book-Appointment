import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoctorSections } from './DoctorSections';
import { getAppointmentsByDoctor } from '../../services/appointmentService';
import './DoctorDashboard.css';

export const DoctorDashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [currentUser, setCurrentUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [stats, setStats] = useState([
        { icon: '📅', value: '0', label: 'Today Appointments', color: '#667eea' },
        { icon: '⏳', value: '0', label: 'Pending Requests', color: '#f59e0b' },
        { icon: '✅', value: '0', label: 'Completed', color: '#10b981' },
        { icon: '👥', value: '0', label: 'Total Patients', color: '#8b5cf6' }
    ]);
    const [todayAppointments, setTodayAppointments] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        setCurrentUser(user);

        console.log('DoctorDashboard useEffect - Loading data for user:', user);

        // Load real appointments for this doctor
        if (user?.id) {
            const appointments = getAppointmentsByDoctor(user.id);
            console.log('All appointments for doctor:', appointments);

            const today = new Date().toISOString().split('T')[0];
            console.log('Today date:', today);

            // Filter today's appointments (BOOKED status only)
            const todayApts = appointments.filter(apt =>
                apt.date === today && apt.status === 'BOOKED'
            );
            console.log('Today BOOKED appointments:', todayApts);

            // Filter upcoming appointments (BOOKED status, today or future)
            const upcomingApts = appointments.filter(apt =>
                apt.status === 'BOOKED' && apt.date >= today
            );
            console.log('Upcoming BOOKED appointments:', upcomingApts);

            // Calculate stats
            const pending = appointments.filter(apt => apt.status === 'PENDING').length;
            const completed = appointments.filter(apt => apt.status === 'COMPLETED').length;
            const uniquePatients = new Set(appointments.map(apt => apt.patientId)).size;

            console.log('Stats:', { pending, completed, uniquePatients, todayCount: todayApts.length, upcomingCount: upcomingApts.length });

            setStats([
                { icon: '📅', value: upcomingApts.length.toString(), label: 'Upcoming Appointments', color: '#667eea' },
                { icon: '⏳', value: pending.toString(), label: 'Pending Requests', color: '#f59e0b' },
                { icon: '✅', value: completed.toString(), label: 'Completed', color: '#10b981' },
                { icon: '👥', value: uniquePatients.toString(), label: 'Total Patients', color: '#8b5cf6' }
            ]);

            // Set today's appointments for display (or upcoming if today is empty)
            const displayApts = todayApts.length > 0 ? todayApts : upcomingApts.slice(0, 5);
            setTodayAppointments(displayApts.map(apt => ({
                patient: apt.patientName,
                email: apt.patientEmail,
                time: apt.timeSlot,
                date: apt.date,
                department: apt.department,
                doctorName: apt.doctorName,
                doctorEmail: apt.doctorEmail,
                status: apt.status,
                queueNumber: apt.queueNumber
            })));
        }
    }, []);

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
        localStorage.removeItem('currentUser');
        window.location.href = '/';
    };

    const menuItems = [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'pending-requests', icon: '⏳', label: 'Pending Requests', badge: true },
        { id: 'appointments', icon: '📅', label: 'Appointments' },
        { id: 'patients', icon: '👥', label: 'Patients' },
        { id: 'medical-records', icon: '📋', label: 'Medical Records' },
        { id: 'prescriptions', icon: '💊', label: 'Prescriptions' },
        { id: 'lab-tests', icon: '🔬', label: 'Lab Tests / Reports' },
        { id: 'schedule', icon: '🕐', label: 'Schedule / Availability' }
    ];

    return (
        <div className="doctor-dashboard">
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
                    <input type="text" placeholder="Chercher" />
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
                                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => setActiveSection(item.id)}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-label">{item.label}</span>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        className="nav-item logout"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: menuItems.length * 0.05 }}
                    >
                        <div className="nav-link" onClick={handleLogout}>
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
                        <h1 className="page-title">
                            {activeSection === 'dashboard' ? 'Dashboard' :
                                activeSection === 'appointments' ? 'Appointments' :
                                    activeSection === 'patients' ? 'Patients' :
                                        activeSection === 'medical-records' ? 'Medical Records' :
                                            activeSection === 'prescriptions' ? 'Prescriptions' :
                                                activeSection === 'lab-tests' ? 'Lab Tests / Reports' :
                                                    activeSection === 'schedule' ? 'Schedule / Availability' : 'Dashboard'}
                        </h1>
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
                            className="icon-btn notification-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            🔔
                            <span className="notification-badge">3</span>
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

                            <AnimatePresence>
                                {showUserMenu && (
                                    <motion.div
                                        className="user-dropdown-menu"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
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
                                            <span className="dropdown-icon">⚙️</span>
                                            <span>Settings</span>
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
                <DoctorSections
                    activeSection={activeSection}
                    currentUser={currentUser}
                    stats={stats}
                    todayAppointments={todayAppointments}
                />
            </div>
        </div>
    );
};
