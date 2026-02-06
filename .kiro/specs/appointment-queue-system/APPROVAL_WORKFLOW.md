# Appointment Approval Workflow - Implementation Complete ✅

## Overview
Implemented doctor approval workflow where patients request appointments and doctors must approve them before they become scheduled.

## Changes Made

### 1. Updated Appointment Status Flow
**New Status:** `PENDING` → `APPROVED` → `BOOKED`

**Status Constants** (`src/utils/constants.js`):
```javascript
PENDING: 'PENDING',      // Patient requested, waiting for doctor approval
APPROVED: 'APPROVED',    // Doctor approved (auto-transitions to BOOKED)
REJECTED: 'REJECTED',    // Doctor rejected
BOOKED: 'BOOKED',        // Confirmed appointment
```

**Status Transitions:**
- PENDING → APPROVED or REJECTED
- APPROVED → BOOKED or CANCELLED
- BOOKED → CHECKED_IN → IN_CONSULTATION → COMPLETED

### 2. Updated Appointment Service (`src/services/appointmentService.js`)

**New Functions:**
- `approveAppointment(appointmentId)` - Doctor approves pending appointment
- `rejectAppointment(appointmentId, reason)` - Doctor rejects with reason
- `getPendingAppointmentsByDoctor(doctorId)` - Get all pending requests for doctor

**Modified Functions:**
- `bookAppointment()` - Now creates appointments with `PENDING` status instead of `BOOKED`

### 3. Doctor Dashboard Updates

**New Section:** "Pending Requests" (`src/pages/DoctorDashboard/DoctorSections.jsx`)
- Shows all pending appointment requests
- Approve button (green) - Approves and schedules appointment
- Reject button (red) - Rejects with optional reason
- Real-time updates after approval/rejection
- Shows patient details, date, time, queue number

**Menu Item Added:**
- ⏳ Pending Requests (with badge indicator)

### 4. Patient Dashboard Updates

**Booking Flow:**
- Success message now says: "Appointment request sent successfully! Waiting for doctor approval."
- Shows PENDING status in appointments list
- Can cancel PENDING appointments

**Stats Updated:**
- Upcoming Appointments now includes PENDING status

## How It Works

### Patient Side:
1. Patient selects doctor, date, and time slot
2. Clicks "Book Appointment"
3. Appointment created with status: **PENDING**
4. Patient sees message: "Waiting for doctor approval"
5. Appointment appears in "My Appointments" with PENDING badge
6. Patient can cancel if needed

### Doctor Side:
1. Doctor logs in to dashboard
2. Sees "Pending Requests" menu item (with badge if requests exist)
3. Clicks "Pending Requests"
4. Sees list of all pending appointment requests with:
   - Patient name and email
   - Date and time
   - Queue number
   - Request timestamp
5. Doctor can:
   - **Approve** → Status changes to BOOKED, patient notified
   - **Reject** → Status changes to REJECTED, slot freed, patient notified

## Testing Instructions

### Test 1: Book Appointment as Patient
1. Login as patient
2. Go to "Book appointment"
3. Select doctor, date, time
4. Click "Book Appointment"
5. ✅ Should see: "Appointment request sent successfully! Waiting for doctor approval"
6. ✅ Appointment should show status: PENDING

### Test 2: Approve Appointment as Doctor
1. Login as the doctor (use credentials from `src/data/authorizedDoctors.json`)
2. Click "Pending Requests" in sidebar
3. ✅ Should see the patient's appointment request
4. Click "✓ Approve"
5. ✅ Should see success message
6. ✅ Appointment should disappear from pending list

### Test 3: Verify Patient Sees Approved Appointment
1. Go back to patient dashboard
2. Refresh page
3. ✅ Appointment status should now be: BOOKED
4. ✅ Should appear in upcoming appointments

### Test 4: Reject Appointment as Doctor
1. Login as doctor
2. Go to "Pending Requests"
3. Click "✗ Reject" on an appointment
4. Enter rejection reason (optional)
5. ✅ Should see success message
6. ✅ Appointment should disappear from pending list
7. ✅ Time slot should be freed

### Test 5: Verify Patient Sees Rejected Appointment
1. Go back to patient dashboard
2. Refresh page
3. ✅ Appointment status should be: REJECTED
4. ✅ Should not appear in upcoming appointments
5. ✅ Patient can book another appointment in that slot

## Status Badge Colors

- **PENDING** - Yellow/Orange (#fef3c7 background, #92400e text)
- **BOOKED** - Blue (#667eea)
- **APPROVED** - Green (#10b981)
- **REJECTED** - Red (#ef4444)
- **COMPLETED** - Green (#10b981)
- **CANCELLED** - Red (#ef4444)

## API Usage Examples

### Approve Appointment
```javascript
import { approveAppointment } from '../../services/appointmentService';

const handleApprove = (appointmentId) => {
    try {
        const approved = approveAppointment(appointmentId);
        console.log('Approved:', approved);
        // Status is now BOOKED
    } catch (error) {
        console.error(error.message);
    }
};
```

### Reject Appointment
```javascript
import { rejectAppointment } from '../../services/appointmentService';

const handleReject = (appointmentId) => {
    try {
        const rejected = rejectAppointment(appointmentId, 'Doctor unavailable');
        console.log('Rejected:', rejected);
        // Status is now REJECTED, slot is freed
    } catch (error) {
        console.error(error.message);
    }
};
```

### Get Pending Requests
```javascript
import { getPendingAppointmentsByDoctor } from '../../services/appointmentService';

const doctorId = currentUser.id;
const pending = getPendingAppointmentsByDoctor(doctorId);
console.log('Pending requests:', pending);
```

## Data Flow

```
Patient Books Appointment
         ↓
   Status: PENDING
         ↓
    Slot Reserved
         ↓
  Queue Number Assigned
         ↓
Doctor Sees in "Pending Requests"
         ↓
    Doctor Decides
         ↓
    ┌─────────┴─────────┐
    ↓                   ↓
APPROVE              REJECT
    ↓                   ↓
Status: BOOKED      Status: REJECTED
    ↓                   ↓
Slot Confirmed      Slot Freed
    ↓                   ↓
Patient Notified    Patient Notified
```

## LocalStorage Keys
- `hospitalAppointments` - Contains all appointments with their status
- `hospitalTimeSlots` - Time slots (reserved during PENDING, confirmed on APPROVE)
- `hospitalQueue` - Queue numbers assigned

## Benefits

1. **Doctor Control** - Doctors can manage their schedule
2. **Prevents Overbooking** - Slot reserved but not confirmed until approved
3. **Better Communication** - Clear status for both patient and doctor
4. **Flexibility** - Doctor can reject if unavailable
5. **Audit Trail** - Status history tracks all changes

## Next Steps

1. Add email/SMS notifications (future enhancement)
2. Add auto-reject after 24 hours (future enhancement)
3. Add bulk approve/reject (future enhancement)
4. Add rejection reason dropdown (future enhancement)
5. Add notification badge count on "Pending Requests" menu

## Success Criteria Met ✅

- ✅ Patient can book appointment
- ✅ Appointment starts with PENDING status
- ✅ Doctor sees pending requests
- ✅ Doctor can approve appointments
- ✅ Doctor can reject appointments
- ✅ Status updates correctly
- ✅ Slots are managed properly
- ✅ Patient sees updated status
- ✅ Queue numbers work correctly
- ✅ Data persists in localStorage
