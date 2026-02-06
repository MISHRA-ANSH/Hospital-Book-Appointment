import React, { useState, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { HospitalProvider } from './context/HospitalProvider';
import { AppRoutes } from './routes';
import { UserProfile } from './components/common/UserProfile';
import { isAuthenticated } from './services/authService';
import './App.css';

function AppContent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);
    const location = useLocation();

    // Check if current page is patient or doctor dashboard
    const isPatientDashboard = location.pathname === '/patient-dashboard';
    const isDoctorDashboard = location.pathname === '/doctor-dashboard';
    const isDashboard = isPatientDashboard || isDoctorDashboard;

    useEffect(() => {
        setIsLoggedIn(isAuthenticated());
    }, []);

    // Listen for storage changes to update login state
    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(isAuthenticated());
        };

        window.addEventListener('storage', handleStorageChange);

        // Also check periodically in case of same-tab changes
        const interval = setInterval(handleStorageChange, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="app">
            {/* Hide navbar on patient or doctor dashboard */}
            {!isDashboard && (
                <nav className="navbar">
                    <div className="navbar-brand">
                        <div className="logo">🏥</div>
                    </div>

                    <div className="nav-links">
                        <a href="/" className="active">Home</a>
                        <a href="/services">Services</a>
                        <a href="/doctors">Doctors</a>
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a>

                        <div
                            className="nav-dropdown"
                            onMouseEnter={() => setShowFeaturesDropdown(true)}
                            onMouseLeave={() => setShowFeaturesDropdown(false)}
                        >
                            <a href="#" className="dropdown-trigger">
                                Our Features ▾
                            </a>
                            {showFeaturesDropdown && (
                                <div className="dropdown-menu">
                                    <a href="/appointments" className="dropdown-item">Appointment</a>
                                    <a href="/working-hours" className="dropdown-item">Working Hours</a>
                                    <a href="/testimonials" className="dropdown-item">Testimonials</a>
                                    <a href="/terms" className="dropdown-item">Terms of Service</a>
                                    <a href="/privacy" className="dropdown-item">Privacy Policy</a>
                                </div>
                            )}
                        </div>

                        <a href="/language">English</a>
                    </div>

                    <div className="nav-actions">
                        {isLoggedIn ? (
                            <UserProfile />
                        ) : (
                            <>
                                <button className="btn-login" onClick={() => window.location.href = '/login'}>Login</button>
                                <button className="btn-book" onClick={() => window.location.href = '/signup'}>
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            )}

            <main className="main-content">
                <AppRoutes />
            </main>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <HospitalProvider>
                <AppContent />
            </HospitalProvider>
        </BrowserRouter>
    );
}

export default App;
