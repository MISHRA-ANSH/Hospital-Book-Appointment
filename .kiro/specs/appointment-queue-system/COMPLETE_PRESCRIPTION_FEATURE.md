# Complete Appointment & Prescription Feature

## Summary of Requirements

1. ✅ **Prevent Same Time Slot Booking** - Already implemented via `isSlotBookable()` 
2. ❌ **Doctor Complete Appointment** - Need to add
3. ❌ **Doctor Write Prescription** - Need to add

## Implementation Plan

### 1. Prescription Service (✅ Created)
File: `src/services/prescriptionService.js`

Functions:
- `createPrescription()` - Create new prescription
- `getPrescriptionsByPatient()` - Get patient's prescriptions
- `getPrescriptionsByDoctor()` - Get doctor's prescriptions
- `getPrescriptionByAppointment()` - Get prescription for appointment

### 2. Complete Appointment Function (✅ Added)
File: `src/services/appointmentService.js`

```javascript
export const completeAppointment = (appointmentId, prescriptionData)
```

- Changes status to COMPLETED
- Adds prescription data to appointment
- Updates timestamp

### 3. Doctor Dashboard - Appointments Section

**Need to Add:**

#### A. Complete Button
- Show for BOOKED appointments only
- Opens prescription modal
- Allows doctor to:
  - Enter diagnosis
  - Add multiple medicines (name, dosage, duration, instructions)
  - Add notes
  - Submit to complete appointment

#### B. Prescription Modal UI
```jsx
<PrescriptionModal>
  <input diagnosis />
  <MedicineList>
    <Medicine name dosage duration instructions />
    <AddMedicineButton />
  </MedicineList>
  <textarea notes />
  <SubmitButton />
</PrescriptionModal>
```

#### C. View Prescription Button
- Show for COMPLETED appointments
- Display prescription details

### 4. Patient Dashboard - View Prescriptions

**Need to Add:**

#### A. Prescriptions Section
- List all prescriptions
- Show:
  - Doctor name
  - Date
  - Diagnosis
  - Medicines with dosage
  - Notes
- Download/Print option

## Quick Implementation Steps

### Step 1: Update Doctor Appointments Component

Add to `src/pages/DoctorDashboard/DoctorSections.jsx`:

```javascript
const Appointments = ({ currentUser }) => {
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [prescription, setPrescription] = useState({
        diagnosis: '',
        medicines: [{ name: '', dosage: '', duration: '', instructions: '' }],
        notes: ''
    });

    const handleComplete = (appointment) => {
        setSelectedAppointment(appointment);
        setShowPrescriptionModal(true);
    };

    const handleSubmitPrescription = () => {
        // Create prescription
        createPrescription({
            appointmentId: selectedAppointment.id,
            patientId: selectedAppointment.patientId,
            patientName: selectedAppointment.patientName,
            doctorId: currentUser.id,
            doctorName: `Dr. ${currentUser.firstName} ${currentUser.lastName}`,
            ...prescription
        });

        // Complete appointment
        completeAppointment(selectedAppointment.id, prescription);

        // Close modal and refresh
        setShowPrescriptionModal(false);
        loadAppointments();
    };

    return (
        <>
            {/* Appointment cards with Complete button */}
            {appointments.map(apt => (
                <div key={apt.id}>
                    {/* ... appointment details ... */}
                    {apt.status === 'BOOKED' && (
                        <button onClick={() => handleComplete(apt)}>
                            Complete & Prescribe
                        </button>
                    )}
                </div>
            ))}

            {/* Prescription Modal */}
            {showPrescriptionModal && (
                <PrescriptionModal
                    appointment={selectedAppointment}
                    prescription={prescription}
                    setPrescription={setPrescription}
                    onSubmit={handleSubmitPrescription}
                    onClose={() => setShowPrescriptionModal(false)}
                />
            )}
        </>
    );
};
```

### Step 2: Create Prescription Modal Component

File: `src/components/doctors/PrescriptionModal/PrescriptionModal.jsx`

```jsx
export const PrescriptionModal = ({ appointment, prescription, setPrescription, onSubmit, onClose }) => {
    const addMedicine = () => {
        setPrescription({
            ...prescription,
            medicines: [...prescription.medicines, { name: '', dosage: '', duration: '', instructions: '' }]
        });
    };

    const updateMedicine = (index, field, value) => {
        const newMedicines = [...prescription.medicines];
        newMedicines[index][field] = value;
        setPrescription({ ...prescription, medicines: newMedicines });
    };

    return (
        <div className="modal-overlay">
            <div className="prescription-modal">
                <h2>Complete Appointment & Write Prescription</h2>
                
                <div className="patient-info">
                    <p><strong>Patient:</strong> {appointment.patientName}</p>
                    <p><strong>Date:</strong> {appointment.date}</p>
                </div>

                <div className="form-group">
                    <label>Diagnosis *</label>
                    <input
                        value={prescription.diagnosis}
                        onChange={(e) => setPrescription({ ...prescription, diagnosis: e.target.value })}
                        placeholder="Enter diagnosis"
                    />
                </div>

                <div className="medicines-section">
                    <h3>Medicines</h3>
                    {prescription.medicines.map((med, index) => (
                        <div key={index} className="medicine-row">
                            <input
                                placeholder="Medicine name"
                                value={med.name}
                                onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                            />
                            <input
                                placeholder="Dosage (e.g., 1-0-1)"
                                value={med.dosage}
                                onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                            />
                            <input
                                placeholder="Duration (e.g., 7 days)"
                                value={med.duration}
                                onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                            />
                            <input
                                placeholder="Instructions"
                                value={med.instructions}
                                onChange={(e) => updateMedicine(index, 'instructions', e.target.value)}
                            />
                        </div>
                    ))}
                    <button onClick={addMedicine}>+ Add Medicine</button>
                </div>

                <div className="form-group">
                    <label>Additional Notes</label>
                    <textarea
                        value={prescription.notes}
                        onChange={(e) => setPrescription({ ...prescription, notes: e.target.value })}
                        placeholder="Any additional notes or instructions"
                    />
                </div>

                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onSubmit} className="btn-primary">
                        Complete Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};
```

### Step 3: Add Prescriptions View for Patients

File: `src/pages/PatientDashboard/DashboardSections.jsx`

Add new section:

```javascript
case 'prescriptions':
    return <ViewPrescriptions currentUser={currentUser} />;
```

Component:

```javascript
const ViewPrescriptions = ({ currentUser }) => {
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        if (currentUser?.id) {
            const patientPrescriptions = getPrescriptionsByPatient(currentUser.id);
            setPrescriptions(patientPrescriptions);
        }
    }, [currentUser]);

    return (
        <div className="prescriptions-section">
            <h2>💊 My Prescriptions</h2>
            {prescriptions.map(prescription => (
                <div key={prescription.id} className="prescription-card">
                    <div className="prescription-header">
                        <h3>{prescription.doctorName}</h3>
                        <span>{new Date(prescription.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="prescription-body">
                        <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>
                        <h4>Medicines:</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Medicine</th>
                                    <th>Dosage</th>
                                    <th>Duration</th>
                                    <th>Instructions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescription.medicines.map((med, index) => (
                                    <tr key={index}>
                                        <td>{med.name}</td>
                                        <td>{med.dosage}</td>
                                        <td>{med.duration}</td>
                                        <td>{med.instructions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {prescription.notes && (
                            <p><strong>Notes:</strong> {prescription.notes}</p>
                        )}
                    </div>
                    <button className="btn-download">Download Prescription</button>
                </div>
            ))}
        </div>
    );
};
```

## Testing Steps

### Test 1: Complete Appointment
1. Doctor login
2. Go to "Appointments"
3. Find BOOKED appointment
4. Click "Complete & Prescribe"
5. Fill diagnosis, medicines, notes
6. Click "Complete Appointment"
7. ✅ Status should change to COMPLETED
8. ✅ Prescription should be saved

### Test 2: View Prescription (Patient)
1. Patient login
2. Go to "Prescriptions" section
3. ✅ Should see prescription from doctor
4. ✅ Should show all medicines and details

### Test 3: Duplicate Slot Prevention
1. Patient 1 books slot: 10:00 AM
2. Patient 2 tries to book same slot: 10:00 AM
3. ✅ Should show error: "Time slot is not available"

## Files Created/Modified

✅ Created:
- `src/services/prescriptionService.js`

✅ Modified:
- `src/services/appointmentService.js` - Added `completeAppointment()`

❌ Need to Create:
- `src/components/doctors/PrescriptionModal/PrescriptionModal.jsx`
- `src/components/doctors/PrescriptionModal/PrescriptionModal.css`

❌ Need to Modify:
- `src/pages/DoctorDashboard/DoctorSections.jsx` - Add Complete button and modal
- `src/pages/PatientDashboard/DashboardSections.jsx` - Add Prescriptions view
- `src/pages/PatientDashboard/PatientDashboard.jsx` - Add Prescriptions menu item

## Next Steps

Would you like me to:
1. Implement the complete prescription modal UI?
2. Add the patient prescriptions view?
3. Test the duplicate slot prevention?

Let me know and I'll implement it step by step!
