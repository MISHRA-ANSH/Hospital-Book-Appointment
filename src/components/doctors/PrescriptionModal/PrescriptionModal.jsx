import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PrescriptionModal.css';

export const PrescriptionModal = ({
    appointment,
    prescription,
    setPrescription,
    onSubmit,
    onClose
}) => {
    const addMedicine = () => {
        setPrescription({
            ...prescription,
            medicines: [...prescription.medicines, { name: '', dosage: '', duration: '', instructions: '' }]
        });
    };

    const removeMedicine = (index) => {
        const newMedicines = prescription.medicines.filter((_, i) => i !== index);
        setPrescription({ ...prescription, medicines: newMedicines });
    };

    const updateMedicine = (index, field, value) => {
        const newMedicines = [...prescription.medicines];
        newMedicines[index][field] = value;
        setPrescription({ ...prescription, medicines: newMedicines });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prescription.diagnosis.trim()) {
            alert('Please enter diagnosis');
            return;
        }
        if (prescription.medicines.some(m => !m.name.trim())) {
            alert('Please fill all medicine names');
            return;
        }
        onSubmit();
    };

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="prescription-modal"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <h2>💊 Complete Appointment & Write Prescription</h2>
                        <button className="close-btn" onClick={onClose}>✕</button>
                    </div>

                    <div className="patient-info-card">
                        <div className="info-row">
                            <span className="info-label">Patient:</span>
                            <span className="info-value">{appointment.patientName}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Date:</span>
                            <span className="info-value">{appointment.date}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Time:</span>
                            <span className="info-value">{appointment.timeSlot}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="prescription-form">
                        <div className="form-group">
                            <label>Diagnosis <span className="required">*</span></label>
                            <input
                                type="text"
                                value={prescription.diagnosis}
                                onChange={(e) => setPrescription({ ...prescription, diagnosis: e.target.value })}
                                placeholder="Enter diagnosis (e.g., Viral Fever, Hypertension)"
                                required
                            />
                        </div>

                        <div className="medicines-section">
                            <div className="section-header">
                                <h3>Medicines</h3>
                                <button type="button" className="btn-add-medicine" onClick={addMedicine}>
                                    + Add Medicine
                                </button>
                            </div>

                            {prescription.medicines.map((med, index) => (
                                <motion.div
                                    key={index}
                                    className="medicine-row"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="medicine-number">{index + 1}</div>
                                    <div className="medicine-fields">
                                        <input
                                            type="text"
                                            placeholder="Medicine name *"
                                            value={med.name}
                                            onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Dosage (e.g., 1-0-1)"
                                            value={med.dosage}
                                            onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Duration (e.g., 7 days)"
                                            value={med.duration}
                                            onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Instructions (e.g., After meals)"
                                            value={med.instructions}
                                            onChange={(e) => updateMedicine(index, 'instructions', e.target.value)}
                                        />
                                    </div>
                                    {prescription.medicines.length > 1 && (
                                        <button
                                            type="button"
                                            className="btn-remove-medicine"
                                            onClick={() => removeMedicine(index)}
                                        >
                                            🗑️
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <div className="form-group">
                            <label>Additional Notes</label>
                            <textarea
                                value={prescription.notes}
                                onChange={(e) => setPrescription({ ...prescription, notes: e.target.value })}
                                placeholder="Any additional notes, precautions, or follow-up instructions..."
                                rows="4"
                            />
                        </div>

                        <div className="modal-actions">
                            <button type="button" className="btn-cancel" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-submit">
                                ✓ Complete Appointment
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
