import React from 'react';
import { HospitalProvider } from './context/HospitalProvider';
import { AppRoutes } from './routes';
import './App.css';

function App() {
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
                        <button className="btn-login">Login</button>
                        <button className="btn-book" onClick={() => window.location.href = '/book'}>
                            Book Appointment
                        </button>
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
