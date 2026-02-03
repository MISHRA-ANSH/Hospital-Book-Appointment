import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { BookAppointmentPage } from '../pages/BookAppointmentPage';
import { ManageQueuePage } from '../pages/ManageQueuePage';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/book" element={<BookAppointmentPage />} />
                <Route path="/queue" element={<ManageQueuePage />} />
            </Routes>
        </BrowserRouter>
    );
};
