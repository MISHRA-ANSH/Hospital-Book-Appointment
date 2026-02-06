import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPendingAppointmentsByDoctor, approveAppointment, rejectAppointment, getAppointmentsByDoctor, completeAppointment } from '../../services/appointmentService';
import { createPrescription } from '../../services/prescriptionService';
import { PrescriptionModal } from '../../components/doctors/PrescriptionModal';

export const DoctorSections = ({ activeSection, currentUser, stats, todayAppointments }) => {

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <DashboardHome stats={stats} todayAppointments={todayAppointments} currentUser={currentUser} />;
            case 'pending-requests':
                return <PendingRequests currentUser={currentUser} />;
            case 'appointments':
                return <Appointments currentUser={currentUser} />;
            case 'patients':
                return <Patients />;
            case 'medical-records':
                return <MedicalRecords />;
            case 'prescriptions':
                return <Prescriptions />;
            case 'lab-tests':
                return <LabTests />;
            case 'schedule':
                return <Schedule currentUser={currentUser} />;
            default:
                return <DashboardHome stats={stats} todayAppointments={todayAppointments} currentUser={currentUser} />;
        }
    };

    return <div className="content-area">{renderContent()}</div>;
};

// Pending Appointment Requests
const PendingRequests = ({ currentUser }) => {
    const [pendingAppointments, setPendingAppointments] = useState([]);
    const [message, setMessage] = useState({ type: '', text: '' });

    const loadPendingAppointments = () => {
        if (currentUser?.id) {
            const pending = getPendingAppointmentsByDoctor(currentUser.id);
            setPendingAppointments(pending);
        }
    };

    useEffect(() => {
        loadPendingAppointments();
    }, [currentUser]);

    const handleApprove = (appointmentId) => {
        try {
            const approved = approveAppointment(appointmentId);
            console.log('Approved appointment:', approved);
            setMessage({ type: 'success', text: 'Appointment approved! Refreshing...' });
            loadPendingAppointments();

            // Force reload after short delay
            setTimeout(() => {
                window.location.href = window.location.href;
            }, 1000);
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
            console.error('Approve error:', error);
        }
    };

    const handleReject = (appointmentId) => {
        const reason = prompt('Enter rejection reason (optional):');
        try {
            const rejected = rejectAppointment(appointmentId, reason || 'Doctor unavailable');
            console.log('Rejected appointment:', rejected);
            setMessage({ type: 'success', text: 'Appointment rejected! Refreshing...' });
            loadPendingAppointments();

            // Force reload after short delay
            setTimeout(() => {
                window.location.href = window.location.href;
            }, 1000);
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
            console.error('Reject error:', error);
        }
    };

    return (
        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2>⏳ Pending Appointment Requests</h2>

            {message.text && (
                <div className={`alert alert-${message.type}`} style={{
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    borderRadius: '8px',
                    backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                    color: message.type === 'success' ? '#065f46' : '#991b1b'
                }}>
                    {message.text}
                </div>
            )}

            {pendingAppointments.length > 0 ? (
                <div className="appointments-list">
                    {pendingAppointments.map(apt => (
                        <div key={apt.id} className="appointment-card" style={{ border: '2px solid #f59e0b' }}>
                            <div className="apt-header">
                                <div className="patient-info">
                                    <div className="patient-avatar-large">{apt.patientName.split(' ').map(n => n[0]).join('')}</div>
                                    <div>
                                        <h3>{apt.patientName}</h3>
                                        <p>{apt.patientEmail}</p>
                                    </div>
                                </div>
                                <span className="status-badge" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
                                    PENDING
                                </span>
                            </div>
                            <div className="apt-details">
                                <p><strong>Department:</strong> {apt.department}</p>
                                <p><strong>Date:</strong> {apt.date}</p>
                                <p><strong>Time:</strong> {apt.timeSlot}</p>
                                <p><strong>Queue Number:</strong> #{apt.queueNumber}</p>
                                <p><strong>Requested:</strong> {new Date(apt.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="apt-actions" style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    className="btn-view"
                                    onClick={() => handleApprove(apt.id)}
                                    style={{ backgroundColor: '#10b981', color: 'white' }}
                                >
                                    ✓ Approve
                                </button>
                                <button
                                    className="btn-cancel"
                                    onClick={() => handleReject(apt.id)}
                                    style={{ backgroundColor: '#ef4444', color: 'white' }}
                                >
                                    ✗ Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    <p>No pending appointment requests</p>
                </div>
            )}
        </motion.div>
    );
};

// Dashboard Home
const DashboardHome = ({ stats, todayAppointments }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState('02/01/2026 - 02/07/2026');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    return (
        <>
            <motion.div className="stats-grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {stats.map((stat, index) => (
                    <motion.div key={index} className="stat-card" whileHover={{ y: -5 }}>
                        <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <h3 style={{ color: stat.color }}>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div className="appointments-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="section-header">
                    <div className="search-filter-bar">
                        <div className="search-box">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-buttons">
                            <button className="filter-btn">📅</button>
                            <button className="filter-btn">🔽</button>
                            <input type="text" className="date-range" value={dateRange} readOnly />
                            <button className="export-btn">Export Excel</button>
                        </div>
                    </div>
                </div>

                <div className="appointments-table">
                    <table>
                        <thead>
                            <tr>
                                <th>PATIENTE </th>
                                <th>MÉDECIN </th>
                                <th>DÉPARTEMENT DE DOCTEUR </th>
                                <th>DATE ▼</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayAppointments.length > 0 ? (
                                todayAppointments.map((apt, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="patient-cell">
                                                <div className="patient-avatar">{apt.patient.split(' ').map(n => n[0]).join('')}</div>
                                                <div>
                                                    <div className="patient-name">{apt.patient}</div>
                                                    <div className="patient-email">{apt.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="doctor-cell">
                                                <div className="doctor-avatar">
                                                    {currentUser?.firstName?.charAt(0)}{currentUser?.lastName?.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="doctor-name">
                                                        Dr. {currentUser?.firstName} {currentUser?.lastName}
                                                    </div>
                                                    <div className="doctor-email">{currentUser?.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="department-badge">{apt.department}</span></td>
                                        <td>
                                            <div className="date-cell">
                                                <div className="time-badge">{apt.time}</div>
                                                <div className="date-text">{apt.date}</div>
                                            </div>
                                        </td>
                                        <td><span className="status-badge confirmed">{apt.status}</span></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                                        No appointments found for your account.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </>
    );
};

// Appointments Section
const Appointments = ({ currentUser }) => {
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [prescription, setPrescription] = useState({
        diagnosis: '',
        medicines: [{ name: '', dosage: '', duration: '', instructions: '' }],
        notes: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    const loadAppointments = () => {
        if (currentUser?.id) {
            const allAppointments = getAppointmentsByDoctor(currentUser.id);
            let filtered = allAppointments;

            const today = new Date().toISOString().split('T')[0];

            switch (filter) {
                case 'today':
                    filtered = allAppointments.filter(apt => apt.date === today && apt.status === 'BOOKED');
                    break;
                case 'upcoming':
                    filtered = allAppointments.filter(apt =>
                        apt.status === 'BOOKED' && new Date(apt.date) >= new Date()
                    );
                    break;
                case 'completed':
                    filtered = allAppointments.filter(apt => apt.status === 'COMPLETED');
                    break;
                default:
                    filtered = allAppointments.filter(apt =>
                        apt.status !== 'PENDING' && apt.status !== 'REJECTED'
                    );
            }

            setAppointments(filtered.sort((a, b) => new Date(b.date) - new Date(a.date)));
        }
    };

    useEffect(() => {
        loadAppointments();
    }, [currentUser, filter]);

    const handleComplete = (appointment) => {
        setSelectedAppointment(appointment);
        setShowPrescriptionModal(true);
    };

    const handleSubmitPrescription = () => {
        try {
            createPrescription({
                appointmentId: selectedAppointment.id,
                patientId: selectedAppointment.patientId,
                patientName: selectedAppointment.patientName,
                doctorId: currentUser.id,
                doctorName: `Dr. ${currentUser.firstName} ${currentUser.lastName}`,
                ...prescription
            });

            completeAppointment(selectedAppointment.id, prescription);

            setMessage({ type: 'success', text: 'Appointment completed and prescription saved!' });
            setShowPrescriptionModal(false);
            setPrescription({
                diagnosis: '',
                medicines: [{ name: '', dosage: '', duration: '', instructions: '' }],
                notes: ''
            });
            loadAppointments();

            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    return (
        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2>📅 All Appointments</h2>

            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '10px' }}>
                <button
                    onClick={() => setFilter('all')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: filter === 'all' ? '2px solid #667eea' : '2px solid #e2e8f0',
                        background: filter === 'all' ? '#667eea' : 'white',
                        color: filter === 'all' ? 'white' : '#1e293b',
                        cursor: 'pointer'
                    }}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('today')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: filter === 'today' ? '2px solid #667eea' : '2px solid #e2e8f0',
                        background: filter === 'today' ? '#667eea' : 'white',
                        color: filter === 'today' ? 'white' : '#1e293b',
                        cursor: 'pointer'
                    }}
                >
                    Today
                </button>
                <button
                    onClick={() => setFilter('upcoming')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: filter === 'upcoming' ? '2px solid #667eea' : '2px solid #e2e8f0',
                        background: filter === 'upcoming' ? '#667eea' : 'white',
                        color: filter === 'upcoming' ? 'white' : '#1e293b',
                        cursor: 'pointer'
                    }}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setFilter('completed')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: filter === 'completed' ? '2px solid #667eea' : '2px solid #e2e8f0',
                        background: filter === 'completed' ? '#667eea' : 'white',
                        color: filter === 'completed' ? 'white' : '#1e293b',
                        cursor: 'pointer'
                    }}
                >
                    Completed
                </button>
            </div>

            {message.text && (
                <div className={`alert alert-${message.type}`} style={{
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    borderRadius: '8px',
                    backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                    color: message.type === 'success' ? '#065f46' : '#991b1b'
                }}>
                    {message.text}
                </div>
            )}

            {appointments.length > 0 ? (
                <div className="appointments-list">
                    {appointments.map((apt) => (
                        <div key={apt.id} className="appointment-card">
                            <div className="apt-header">
                                <div className="patient-info">
                                    <div className="patient-avatar-large">{apt.patientName.split(' ').map(n => n[0]).join('')}</div>
                                    <div>
                                        <h3>{apt.patientName}</h3>
                                        <p>{apt.patientEmail}</p>
                                    </div>
                                </div>
                                <span className={`status-badge ${apt.status.toLowerCase()}`}>{apt.status}</span>
                            </div>
                            <div className="apt-details">
                                <p><strong>Department:</strong> {apt.department}</p>
                                <p><strong>Date:</strong> {apt.date}</p>
                                <p><strong>Time:</strong> {apt.timeSlot}</p>
                                <p><strong>Queue #:</strong> {apt.queueNumber}</p>
                            </div>
                            {apt.status === 'BOOKED' && (
                                <div className="apt-actions">
                                    <button
                                        className="btn-complete"
                                        onClick={() => handleComplete(apt)}
                                        style={{
                                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px 20px',
                                            borderRadius: '8px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        ✓ Complete & Prescribe
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    <p>No appointments found</p>
                </div>
            )}

            {showPrescriptionModal && (
                <PrescriptionModal
                    appointment={selectedAppointment}
                    prescription={prescription}
                    setPrescription={setPrescription}
                    onSubmit={handleSubmitPrescription}
                    onClose={() => setShowPrescriptionModal(false)}
                />
            )}
        </motion.div>
    );
};

// Patients Section
const Patients = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>👥 My Patients</h2>
        <div className="patients-grid">
            {[
                { name: 'Testpatient Patel', age: 45, gender: 'Male', lastVisit: '25 nov, 2025', condition: 'Hypertension' },
                { name: 'Abc Abc anooo', age: 32, gender: 'Female', lastVisit: '24 oct, 2025', condition: 'Diabetes' },
                { name: '123 123', age: 28, gender: 'Male', lastVisit: '16 oct, 2025', condition: 'Fever' },
                { name: 'Trith Shah', age: 55, gender: 'Male', lastVisit: '18 sept, 2025', condition: 'Regular Checkup' }
            ].map((patient, index) => (
                <div key={index} className="patient-card">
                    <div className="patient-avatar-large">{patient.name.split(' ').map(n => n[0]).join('')}</div>
                    <h3>{patient.name}</h3>
                    <div className="patient-details">
                        <p><strong>Age:</strong> {patient.age}</p>
                        <p><strong>Gender:</strong> {patient.gender}</p>
                        <p><strong>Last Visit:</strong> {patient.lastVisit}</p>
                        <p><strong>Condition:</strong> {patient.condition}</p>
                    </div>
                    <button className="btn-view-full">View Full Record</button>
                </div>
            ))}
        </div>
    </motion.div>
);

// Medical Records Section
const MedicalRecords = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>📋 Medical Records</h2>
        <div className="records-list">
            {[
                { patient: 'Testpatient Patel', date: '25 nov, 2025', diagnosis: 'Hypertension', treatment: 'Medication prescribed' },
                { patient: 'Abc Abc anooo', date: '24 oct, 2025', diagnosis: 'Diabetes Type 2', treatment: 'Insulin therapy' },
                { patient: '123 123', date: '16 oct, 2025', diagnosis: 'Viral Fever', treatment: 'Rest and fluids' }
            ].map((record, index) => (
                <div key={index} className="record-card">
                    <div className="record-header">
                        <h3>{record.patient}</h3>
                        <span className="record-date">{record.date}</span>
                    </div>
                    <div className="record-content">
                        <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                        <p><strong>Treatment:</strong> {record.treatment}</p>
                    </div>
                    <button className="btn-view">View Full Record</button>
                </div>
            ))}
        </div>
    </motion.div>
);

// Prescriptions Section
const Prescriptions = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>💊 Prescriptions</h2>
        <button className="btn-add-new">+ Add New Prescription</button>
        <div className="prescriptions-list">
            {[
                { patient: 'Testpatient Patel', medicine: 'Amlodipine 5mg', dosage: '1-0-1', duration: '30 days', date: '25 nov, 2025' },
                { patient: 'Abc Abc anooo', medicine: 'Metformin 500mg', dosage: '1-0-1', duration: '60 days', date: '24 oct, 2025' },
                { patient: '123 123', medicine: 'Paracetamol 500mg', dosage: '1-1-1', duration: '5 days', date: '16 oct, 2025' }
            ].map((prescription, index) => (
                <div key={index} className="prescription-card">
                    <div className="prescription-header">
                        <h3>{prescription.patient}</h3>
                        <span className="prescription-date">{prescription.date}</span>
                    </div>
                    <div className="prescription-details">
                        <p><strong>Medicine:</strong> {prescription.medicine}</p>
                        <p><strong>Dosage:</strong> {prescription.dosage}</p>
                        <p><strong>Duration:</strong> {prescription.duration}</p>
                    </div>
                    <div className="prescription-actions">
                        <button className="btn-edit">Edit</button>
                        <button className="btn-print">Print</button>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
);

// Lab Tests Section
const LabTests = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>🔬 Lab Tests / Reports</h2>
        <button className="btn-add-new">+ Request New Test</button>
        <div className="lab-tests-grid">
            {[
                { patient: 'Testpatient Patel', test: 'Blood Test', status: 'Completed', date: '25 nov, 2025' },
                { patient: 'Abc Abc anooo', test: 'HbA1c Test', status: 'Completed', date: '24 oct, 2025' },
                { patient: '123 123', test: 'CBC', status: 'In Progress', date: '16 oct, 2025' },
                { patient: 'Trith Shah', test: 'X-Ray', status: 'Pending', date: '18 sept, 2025' }
            ].map((test, index) => (
                <div key={index} className="lab-test-card">
                    <div className="test-icon">🧪</div>
                    <h3>{test.test}</h3>
                    <p className="test-patient">{test.patient}</p>
                    <p className="test-date">{test.date}</p>
                    <span className={`status-badge ${test.status === 'Completed' ? 'confirmed' : test.status === 'In Progress' ? 'pending' : 'cancelled'}`}>
                        {test.status}
                    </span>
                    {test.status === 'Completed' && <button className="btn-download">Download Report</button>}
                </div>
            ))}
        </div>
    </motion.div>
);

// Schedule Section
const Schedule = ({ currentUser }) => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>🕐 My Schedule / Availability</h2>
        <div className="schedule-card">
            <h3>Dr. {currentUser?.firstName} {currentUser?.lastName}</h3>
            <div className="schedule-grid">
                {[
                    { day: 'Monday', slots: '9:00 AM - 5:00 PM', status: 'Available' },
                    { day: 'Tuesday', slots: '9:00 AM - 5:00 PM', status: 'Available' },
                    { day: 'Wednesday', slots: '9:00 AM - 5:00 PM', status: 'Available' },
                    { day: 'Thursday', slots: '9:00 AM - 5:00 PM', status: 'Available' },
                    { day: 'Friday', slots: '9:00 AM - 5:00 PM', status: 'Available' },
                    { day: 'Saturday', slots: '10:00 AM - 2:00 PM', status: 'Available' },
                    { day: 'Sunday', slots: 'Closed', status: 'Not Available' }
                ].map((schedule, index) => (
                    <div key={index} className="schedule-day-card">
                        <h4>{schedule.day}</h4>
                        <p>{schedule.slots}</p>
                        <span className={`status-badge ${schedule.status === 'Available' ? 'confirmed' : 'cancelled'}`}>
                            {schedule.status}
                        </span>
                    </div>
                ))}
            </div>
            <button className="btn-edit-schedule">Edit Schedule</button>
        </div>
    </motion.div>
);




