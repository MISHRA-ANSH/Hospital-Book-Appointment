import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { BookAppointmentPage } from '../pages/BookAppointmentPage';
import { ManageQueuePage } from '../pages/ManageQueuePage';
import { ServicesPage } from '../pages/ServicesPage';
import { ContactPage } from '../pages/ContactPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/book" element={<BookAppointmentPage />} />
                <Route path="/queue" element={<ManageQueuePage />} />
            </Routes>
        </BrowserRouter>
    );
};
