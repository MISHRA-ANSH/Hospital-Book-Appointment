import React, { useState, useEffect } from 'react';
import { HospitalProvider } from './context/HospitalProvider';
import { AppRoutes } from './routes';
import { UserProfile } from './components/common/UserProfile';
import { isAuthenticated } from './services/authService';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <HospitalProvider>
            <div className="app">
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
                        <a href="/features">Our Features ▾</a>
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

                <main className="main-content">
                    <AppRoutes />
                </main>
            </div>
        </HospitalProvider>
    );
}

export default App;
