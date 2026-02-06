import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { BookAppointmentPage } from '../pages/BookAppointmentPage';
import { ManageQueuePage } from '../pages/ManageQueuePage';
import { ServicesPage } from '../pages/ServicesPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { AppointmentsPage } from '../pages/AppointmentsPage';
import { WorkingHoursPage } from '../pages/WorkingHoursPage';
import { TestimonialsPage } from '../pages/TestimonialsPage';
import { TermsPage } from '../pages/TermsPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { DoctorsPage } from '../pages/DoctorsPage';
import { PatientDashboard } from '../pages/PatientDashboard';
import { DoctorDashboard } from '../pages/DoctorDashboard';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/book" element={<BookAppointmentPage />} />
            <Route path="/queue" element={<ManageQueuePage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

            {/* Feature Pages */}
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/working-hours" element={<WorkingHoursPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
    );
};
