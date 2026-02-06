# Hospital Appointment & Queue Management System - Requirements

## Overview
Complete implementation of a frontend-only Hospital Appointment & Queue Management System with appointment booking, queue management, status workflows, and visit history.

## 1. Appointment Slot Generation

### User Stories
- As a system, I need to generate time slots for each doctor automatically
- As a patient, I want to see available time slots when booking an appointment
- As a system, I need to prevent booking of past time slots

### Acceptance Criteria
1.1. Generate time slots for each doctor based on their working hours
1.2. Time slots should be 30 minutes each (e.g., 9:00 AM, 9:30 AM, 10:00 AM)
1.3. Prevent overlapping slots for the same doctor
1.4. Disable/hide past time slots (before current date/time)
1.5. Store time slots in localStorage
1.6. Restore time slots on page refresh

## 2. Functional Appointment Booking

### User Stories
- As a patient, I want to book an appointment with a specific doctor
- As a patient, I want to select from available time slots
- As a system, I need to prevent double booking of the same slot

### Acceptance Criteria
2.1. Patient can select doctor from dropdown (from authorizedDoctors.json)
2.2. Display only available time slots for selected doctor
2.3. Prevent booking if slot is already taken
2.4. Confirm appointment and store in localStorage
2.5. Auto-assign appointment ID
2.6. Show success message after booking
2.7. Redirect to patient dashboard after successful booking

## 3. Queue Management System

### User Stories
- As a system, I need to auto-assign queue numbers to appointments
- As a patient, I want to see my queue position
- As a doctor, I want to see the queue of patients waiting

### Acceptance Criteria
3.1. Auto-assign queue number when appointment is booked
3.2. Queue numbers are sequential per doctor per day
3.3. Maintain waiting list in order
3.4. Reorder queue when appointment is cancelled
3.5. Display queue position in patient dashboard
3.6. Display queue list in doctor dashboard
3.7. Persist queue data in localStorage

## 4. Appointment Status Workflow

### User Stories
- As a system, I need to track appointment status through its lifecycle
- As a doctor, I want to update appointment status
- As a patient, I want to see my appointment status

### Acceptance Criteria
4.1. Implement status workflow: BOOKED → CHECKED_IN → IN_CONSULTATION → COMPLETED
4.2. Allow CANCELLED status from any state before IN_CONSULTATION
4.3. Prevent invalid status transitions
4.4. Update status in localStorage
4.5. Display current status in both patient and doctor dashboards
4.6. Show status badge with appropriate colors
4.7. Log status change history with timestamps

## 5. Cancellation & Rescheduling

### User Stories
- As a patient, I want to cancel my appointment
- As a patient, I want to reschedule my appointment to another slot
- As a system, I need to update the queue when appointments are cancelled

### Acceptance Criteria
5.1. Allow cancellation before IN_CONSULTATION status
5.2. Update appointment status to CANCELLED
5.3. Free up the time slot for other patients
5.4. Reorder queue numbers after cancellation
5.5. Allow rescheduling to another available slot
5.6. Maintain appointment history even after cancellation
5.7. Show cancellation reason (optional)

## 6. Doctor Availability Handling

### User Stories
- As a doctor, I want to mark myself as unavailable
- As a system, I need to handle appointments when doctor becomes unavailable
- As a patient, I want to be notified if my doctor is unavailable

### Acceptance Criteria
6.1. Doctor can toggle availability status
6.2. When doctor is unavailable, hide their slots from booking
6.3. Option to auto-cancel future appointments
6.4. Option to suggest rescheduling to patients
6.5. Store availability status in localStorage
6.6. Display availability status in doctor profile

## 7. Visit History

### User Stories
- As a patient, I want to see my past appointments
- As a doctor, I want to see my consultation history
- As a user, I want to filter history by date and status

### Acceptance Criteria
7.1. Display patient's appointment history in patient dashboard
7.2. Display doctor's consultation history in doctor dashboard
7.3. Filter by date range (today, this week, this month, custom)
7.4. Filter by status (all, completed, cancelled)
7.5. Show appointment details (doctor, date, time, status)
7.6. Sort by date (newest first)
7.7. Persist history in localStorage

## 8. Edge Case Handling

### User Stories
- As a system, I need to handle edge cases gracefully
- As a user, I want clear error messages for invalid actions

### Acceptance Criteria
8.1. Handle last-minute cancellations (within 1 hour of appointment)
8.2. Prevent multiple bookings for same slot
8.3. Handle doctor leaving mid-day (mark remaining slots unavailable)
8.4. Handle page refresh without losing data
8.5. Validate all user inputs
8.6. Show appropriate error messages
8.7. Handle localStorage quota exceeded
8.8. Handle concurrent bookings (race conditions)

## Technical Requirements

### State Management
- Use Context API with useReducer
- Separate reducers for:
  - Appointments
  - Queue
  - Time Slots
  - Doctor Availability

### Data Persistence
- Store all data in localStorage
- Keys:
  - `hospitalAppointments` - All appointments
  - `hospitalQueue` - Queue data
  - `hospitalTimeSlots` - Generated time slots
  - `doctorAvailability` - Doctor availability status
  - `appointmentHistory` - Historical data

### Data Models

#### Appointment
```javascript
{
  id: string,
  patientId: string,
  patientName: string,
  patientEmail: string,
  doctorId: string,
  doctorName: string,
  doctorEmail: string,
  department: string,
  date: string,
  timeSlot: string,
  status: 'BOOKED' | 'CHECKED_IN' | 'IN_CONSULTATION' | 'COMPLETED' | 'CANCELLED',
  queueNumber: number,
  createdAt: string,
  updatedAt: string,
  statusHistory: Array<{status: string, timestamp: string}>,
  cancellationReason: string (optional)
}
```

#### TimeSlot
```javascript
{
  id: string,
  doctorId: string,
  date: string,
  time: string,
  isAvailable: boolean,
  appointmentId: string (if booked)
}
```

#### Queue
```javascript
{
  doctorId: string,
  date: string,
  queue: Array<{
    queueNumber: number,
    appointmentId: string,
    patientName: string,
    status: string
  }>
}
```

## Implementation Priority

### Phase 1 (High Priority)
1. Appointment Slot Generation
2. Functional Appointment Booking
3. Queue Management System
4. Appointment Status Workflow

### Phase 2 (Medium Priority)
5. Cancellation & Rescheduling
6. Visit History
7. Doctor Availability Handling

### Phase 3 (Low Priority)
8. Edge Case Handling
9. Advanced Features (notifications, reminders)

## Success Criteria
- ✅ Patients can book appointments successfully
- ✅ Queue numbers are assigned automatically
- ✅ Appointment status can be updated through workflow
- ✅ Appointments can be cancelled and rescheduled
- ✅ Visit history is maintained and accessible
- ✅ Doctor availability affects appointment booking
- ✅ All data persists in localStorage
- ✅ Edge cases are handled gracefully
- ✅ No console errors
- ✅ Responsive UI works on all devices
