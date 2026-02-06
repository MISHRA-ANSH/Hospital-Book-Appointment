import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import authorizedDoctorsData from '../../data/authorizedDoctors.json';
import { getAvailableSlots, initializeSlotsForDoctors } from '../../services/timeSlotService';
import { bookAppointment, getAppointmentsByPatient, cancelAppointment, getPatientHistory } from '../../services/appointmentService';
import { getQueuePosition } from '../../services/queueService';
import { formatDate } from '../../utils/dateUtils';
import { getPrescriptionsByPatient } from '../../services/prescriptionService';

export const DashboardSections = ({ activeSection, currentUser, stats, recentAppointments }) => {

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
            case 'upcoming':
            case 'bills':
            case 'reports':
                return <DashboardHome stats={stats} recentAppointments={recentAppointments} currentUser={currentUser} />;

            case 'book':
                return <BookAppointment currentUser={currentUser} />;

            case 'view-cancel':
                return <ViewAppointments currentUser={currentUser} />;

            case 'visit-history':
                return <VisitHistory currentUser={currentUser} />;

            case 'current-medicines':
                return <ViewPrescriptions currentUser={currentUser} />;

            case 'assigned':
                return <AssignedDoctor />;

            case 'availability':
                return <DoctorAvailability />;

            case 'lab-reports':
                return <LabReports />;

            case 'discharge':
                return <DischargeSummary />;

            case 'current-medicines':
                return <CurrentMedicines />;

            case 'refill':
                return <RefillRequest />;

            case 'test-status':
                return <TestStatus />;

            case 'download-report':
                return <DownloadReport />;

            case 'bills-list':
                return <BillsList />;

            case 'online-payment':
                return <OnlinePayment />;

            case 'payment-history':
                return <PaymentHistory />;

            case 'contact':
                return <ContactDoctor />;

            case 'personal-info':
                return <PersonalInfo currentUser={currentUser} />;

            case 'appointment-reminder':
            case 'test-alert':
                return <Notifications />;

            default:
                return <DashboardHome stats={stats} recentAppointments={recentAppointments} currentUser={currentUser} />;
        }
    };

    return <div className="content-area">{renderContent()}</div>;
};

// Dashboard Home
const DashboardHome = ({ stats, currentUser }) => {
    const [appointments, setAppointments] = useState([]);

    const loadAppointments = () => {
        if (currentUser?.id) {
            const userAppointments = getAppointmentsByPatient(currentUser.id);
            // Get upcoming appointments (PENDING or BOOKED, not cancelled/completed)
            const upcoming = userAppointments
                .filter(apt => apt.status !== 'CANCELLED' && apt.status !== 'COMPLETED' && apt.status !== 'REJECTED')
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 5);
            setAppointments(upcoming);
        }
    };

    useEffect(() => {
        loadAppointments();

        // Poll for updates every 5 seconds
        const interval = setInterval(loadAppointments, 5000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [currentUser]);

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
                <h2>Upcoming Appointments</h2>
                {appointments.length > 0 ? (
                    <div className="appointments-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>DOCTOR</th>
                                    <th>DEPARTMENT</th>
                                    <th>DATE</th>
                                    <th>TIME</th>
                                    <th>QUEUE #</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((apt) => (
                                    <tr key={apt.id}>
                                        <td>{apt.doctorName}</td>
                                        <td>{apt.department}</td>
                                        <td>{apt.date}</td>
                                        <td>{apt.timeSlot}</td>
                                        <td><strong>#{apt.queueNumber}</strong></td>
                                        <td><span className={`status-badge ${apt.status.toLowerCase()}`}>{apt.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                        <p>No upcoming appointments. Book your first appointment!</p>
                    </div>
                )}
            </motion.div>
        </>
    );
};

// Book Appointment - REAL FUNCTIONALITY
const BookAppointment = ({ currentUser }) => {
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const doctors = authorizedDoctorsData.doctors;

    // Initialize slots for all doctors on component mount
    useEffect(() => {
        initializeSlotsForDoctors(doctors);
    }, []);

    // Load available slots when doctor and date are selected
    useEffect(() => {
        if (selectedDoctor && selectedDate) {
            setLoading(true);
            try {
                const slots = getAvailableSlots(selectedDoctor, selectedDate);
                setAvailableSlots(slots);
                setSelectedSlot(null);
            } catch (error) {
                setMessage({ type: 'error', text: 'Error loading slots' });
            } finally {
                setLoading(false);
            }
        } else {
            setAvailableSlots([]);
            setSelectedSlot(null);
        }
    }, [selectedDoctor, selectedDate]);

    const handleBookAppointment = async (e) => {
        e.preventDefault();

        if (!selectedSlot) {
            setMessage({ type: 'error', text: 'Please select a time slot' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const doctor = doctors.find(d => d.id === selectedDoctor);

            const appointment = bookAppointment({
                patientId: currentUser.id,
                patientName: `${currentUser.firstName} ${currentUser.lastName}`,
                patientEmail: currentUser.email,
                doctorId: doctor.id,
                doctorName: `Dr. ${doctor.firstName} ${doctor.lastName}`,
                doctorEmail: doctor.email,
                department: doctor.department,
                slotId: selectedSlot.id
            });

            setMessage({
                type: 'success',
                text: `Appointment request sent successfully! Queue number: #${appointment.queueNumber}. Waiting for doctor approval.`
            });

            // Reset form
            setTimeout(() => {
                setSelectedDoctor('');
                setSelectedDate('');
                setAvailableSlots([]);
                setSelectedSlot(null);
                setMessage({ type: '', text: '' });
            }, 3000);

        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    // Get minimum date (today)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Get maximum date (30 days from now)
    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        return maxDate.toISOString().split('T')[0];
    };

    return (
        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2>📅 Book New Appointment</h2>

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

            <div className="appointment-form-card">
                <form className="booking-form" onSubmit={handleBookAppointment}>
                    <div className="form-row">
                        <div className="form-field">
                            <label>Select Doctor <span className="required">*</span></label>
                            <select
                                required
                                value={selectedDoctor}
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                            >
                                <option value="">Choose Doctor</option>
                                {doctors.map(doctor => (
                                    <option key={doctor.id} value={doctor.id}>
                                        Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-field">
                            <label>Select Date <span className="required">*</span></label>
                            <input
                                type="date"
                                required
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={getMinDate()}
                                max={getMaxDate()}
                            />
                        </div>

                        <div className="form-field">
                            <label>Available Time Slots <span className="required">*</span></label>
                            {loading ? (
                                <div className="loading-text">Loading slots...</div>
                            ) : selectedDoctor && selectedDate ? (
                                availableSlots.length > 0 ? (
                                    <select
                                        required
                                        value={selectedSlot?.id || ''}
                                        onChange={(e) => {
                                            const slot = availableSlots.find(s => s.id === e.target.value);
                                            setSelectedSlot(slot);
                                        }}
                                        className="time-slot-dropdown"
                                    >
                                        <option value="">Select Time Slot</option>
                                        {availableSlots.map(slot => (
                                            <option
                                                key={slot.id}
                                                value={slot.id}
                                                disabled={!slot.isAvailable}
                                            >
                                                🕐 {slot.time} {!slot.isAvailable ? '(Booked)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className="no-slots-message">
                                        No available slots for this date
                                    </div>
                                )
                            ) : (
                                <div className="select-first-message">
                                    Please select doctor and date first
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading || !selectedSlot}
                        style={{
                            opacity: loading || !selectedSlot ? 0.5 : 1,
                            cursor: loading || !selectedSlot ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Booking...' : 'Book Appointment'}
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

// View & Cancel Appointments - REAL FUNCTIONALITY
const ViewAppointments = ({ currentUser }) => {
    const [appointments, setAppointments] = useState([]);
    const [message, setMessage] = useState({ type: '', text: '' });

    const loadAppointments = () => {
        if (currentUser?.id) {
            const userAppointments = getAppointmentsByPatient(currentUser.id);
            setAppointments(userAppointments.sort((a, b) => new Date(b.date) - new Date(a.date)));
        }
    };

    useEffect(() => {
        loadAppointments();
    }, [currentUser]);

    const handleCancel = (appointmentId) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            try {
                cancelAppointment(appointmentId, 'Patient request');
                setMessage({ type: 'success', text: 'Appointment cancelled successfully' });
                loadAppointments();
                setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            } catch (error) {
                setMessage({ type: 'error', text: error.message });
            }
        }
    };

    return (
        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2>📋 My Appointments</h2>

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
                    {appointments.map(apt => (
                        <div key={apt.id} className="appointment-card">
                            <div className="apt-header">
                                <div>
                                    <h3>{apt.doctorName}</h3>
                                    <p>{apt.department}</p>
                                </div>
                                <span className={`status-badge ${apt.status.toLowerCase()}`}>{apt.status}</span>
                            </div>
                            <div className="apt-details">
                                <p><strong>Date:</strong> {apt.date}</p>
                                <p><strong>Time:</strong> {apt.timeSlot}</p>
                                <p><strong>Queue Number:</strong> #{apt.queueNumber}</p>
                                <p><strong>Booked:</strong> {new Date(apt.createdAt).toLocaleString()}</p>
                            </div>
                            {(apt.status === 'PENDING' || apt.status === 'BOOKED') && (
                                <div className="apt-actions">
                                    <button
                                        className="btn-cancel"
                                        onClick={() => handleCancel(apt.id)}
                                    >
                                        Cancel Appointment
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
        </motion.div>
    );
};

// Visit History - REAL FUNCTIONALITY
const VisitHistory = ({ currentUser }) => {
    const [history, setHistory] = useState([]);
    const [filter, setFilter] = useState({ dateRange: 'all', status: 'all' });

    useEffect(() => {
        if (currentUser?.id) {
            const patientHistory = getPatientHistory(currentUser.id, filter);
            setHistory(patientHistory);
        }
    }, [currentUser, filter]);

    return (
        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2>📜 Visit History</h2>

            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <select
                    value={filter.dateRange}
                    onChange={(e) => setFilter({ ...filter, dateRange: e.target.value })}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '2px solid #e2e8f0' }}
                >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>

                <select
                    value={filter.status}
                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '2px solid #e2e8f0' }}
                >
                    <option value="all">All Status</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="BOOKED">Booked</option>
                </select>
            </div>

            {history.length > 0 ? (
                <div className="history-timeline">
                    {history.map(apt => (
                        <div key={apt.id} className="history-item">
                            <div className="history-date">{apt.date} at {apt.timeSlot}</div>
                            <div className="history-content">
                                <h4>{apt.doctorName} - {apt.department}</h4>
                                <p><strong>Status:</strong> <span className={`status-badge ${apt.status.toLowerCase()}`}>{apt.status}</span></p>
                                <p><strong>Queue Number:</strong> #{apt.queueNumber}</p>
                                {apt.cancellationReason && (
                                    <p><strong>Cancellation Reason:</strong> {apt.cancellationReason}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    <p>No history found for selected filters</p>
                </div>
            )}
        </motion.div>
    );
};

// View Prescriptions - Patient can see all prescriptions
const ViewPrescriptions = ({ currentUser }) => {
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        const loadPrescriptions = () => {
            if (currentUser?.id) {
                const patientPrescriptions = getPrescriptionsByPatient(currentUser.id);
                setPrescriptions(patientPrescriptions.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                ));
            }
        };

        loadPrescriptions();

        // Poll for updates every 5 seconds
        const interval = setInterval(loadPrescriptions, 5000);
        return () => clearInterval(interval);
    }, [currentUser]);

    return (
        <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2>💊 My Prescriptions</h2>

            {prescriptions.length > 0 ? (
                <div className="prescriptions-list">
                    {prescriptions.map(prescription => (
                        <div key={prescription.id} className="prescription-card">
                            <div className="prescription-header">
                                <div>
                                    <h3>{prescription.doctorName}</h3>
                                    <p className="prescription-date">
                                        {new Date(prescription.createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <button className="btn-download" onClick={() => window.print()}>
                                    📥 Download
                                </button>
                            </div>

                            <div className="prescription-body">
                                <div className="diagnosis-section">
                                    <strong>Diagnosis:</strong>
                                    <p>{prescription.diagnosis}</p>
                                </div>

                                <div className="medicines-table">
                                    <h4>Medicines Prescribed:</h4>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Medicine</th>
                                                <th>Dosage</th>
                                                <th>Duration</th>
                                                <th>Instructions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {prescription.medicines.map((med, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td><strong>{med.name}</strong></td>
                                                    <td>{med.dosage}</td>
                                                    <td>{med.duration}</td>
                                                    <td>{med.instructions}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {prescription.notes && (
                                    <div className="notes-section">
                                        <strong>Additional Notes:</strong>
                                        <p>{prescription.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    <p>No prescriptions yet</p>
                </div>
            )}
        </motion.div>
    );
};

// Placeholder components (keep existing functionality)
const AssignedDoctor = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>👨‍⚕️ Assigned Doctor</h2>
        <p>Your assigned doctor information will appear here.</p>
    </motion.div>
);

const DoctorAvailability = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>📅 Doctor Availability</h2>
        <p>Doctor availability schedule will appear here.</p>
    </motion.div>
);

const LabReports = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>🔬 Lab Reports</h2>
        <p>Your lab reports will appear here.</p>
    </motion.div>
);

const DischargeSummary = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>📄 Discharge Summary</h2>
        <p>Discharge summary will appear here.</p>
    </motion.div>
);

const CurrentMedicines = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>💊 Current Medicines</h2>
        <p>Your current medicines will appear here.</p>
    </motion.div>
);

const RefillRequest = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>🔄 Refill Request</h2>
        <p>Request medicine refills here.</p>
    </motion.div>
);

const TestStatus = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>🧪 Test Status</h2>
        <p>Your test status will appear here.</p>
    </motion.div>
);

const DownloadReport = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>📥 Download Reports</h2>
        <p>Download your reports here.</p>
    </motion.div>
);

const BillsList = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>💰 Bills List</h2>
        <p>Your bills will appear here.</p>
    </motion.div>
);

const OnlinePayment = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>💳 Online Payment</h2>
        <p>Make online payments here.</p>
    </motion.div>
);

const PaymentHistory = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>📊 Payment History</h2>
        <p>Your payment history will appear here.</p>
    </motion.div>
);

const ContactDoctor = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>📞 Contact Doctor</h2>
        <p>Contact your doctor here.</p>
    </motion.div>
);

const PersonalInfo = ({ currentUser }) => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>👤 Personal Information</h2>
        <div className="profile-form">
            <p><strong>Name:</strong> {currentUser?.firstName} {currentUser?.lastName}</p>
            <p><strong>Email:</strong> {currentUser?.email}</p>
            <p><strong>Phone:</strong> {currentUser?.phone}</p>
            <p><strong>Gender:</strong> {currentUser?.gender}</p>
        </div>
    </motion.div>
);

const Notifications = () => (
    <motion.div className="content-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2>🔔 Notifications</h2>
        <p>Your notifications will appear here.</p>
    </motion.div>
);
