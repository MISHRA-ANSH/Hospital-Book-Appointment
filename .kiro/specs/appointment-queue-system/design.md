# Hospital Appointment & Queue Management System - Design

## Architecture Overview

### Component Structure
```
src/
├── context/
│   ├── HospitalContext.jsx (main context)
│   ├── HospitalProvider.jsx (provider with all reducers)
│   ├── reducers/
│   │   ├── appointmentsReducer.js (appointment CRUD)
│   │   ├── queueReducer.js (queue management)
│   │   ├── timeSlotsReducer.js (time slot generation)
│   │   └── availabilityReducer.js (doctor availability)
│   └── actions/
│       ├── appointmentActions.js
│       ├── queueActions.js
│       ├── timeSlotActions.js
│       └── availabilityActions.js
├── services/
│   ├── appointmentService.js (business logic)
│   ├── queueService.js (queue algorithms)
│   ├── timeSlotService.js (slot generation)
│   └── persistenceService.js (localStorage)
└── pages/
    ├── PatientDashboard/ (booking, history)
    └── DoctorDashboard/ (queue, status updates)
```

## 1. Time Slot Generation Service

### Algorithm
```javascript
generateTimeSlots(doctorId, date, workingHours) {
  // 1. Parse working hours (e.g., "9:00 AM - 5:00 PM")
  // 2. Generate 30-minute slots
  // 3. Check if slot is in the past
  // 4. Check if slot is already booked
  // 5. Return available slots
}
```

### Working Hours
- Default: 9:00 AM - 5:00 PM (Monday-Friday)
- Saturday: 10:00 AM - 2:00 PM
- Sunday: Closed
- Slot duration: 30 minutes
- Break time: 1:00 PM - 2:00 PM (no slots)

### Implementation
```javascript
// timeSlotService.js
export const generateDailySlots = (doctorId, date) => {
  const slots = [];
  const dayOfWeek = new Date(date).getDay();
  
  // Define working hours based on day
  let startHour = 9, endHour = 17;
  if (dayOfWeek === 6) { // Saturday
    startHour = 10;
    endHour = 14;
  } else if (dayOfWeek === 0) { // Sunday
    return []; // Closed
  }
  
  // Generate 30-minute slots
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      // Skip lunch break (1:00 PM - 2:00 PM)
      if (hour === 13) continue;
      
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const slotDateTime = new Date(`${date}T${time}`);
      
      // Skip past slots
      if (slotDateTime < new Date()) continue;
      
      slots.push({
        id: `${doctorId}-${date}-${time}`,
        doctorId,
        date,
        time,
        isAvailable: true,
        appointmentId: null
      });
    }
  }
  
  return slots;
};
```

## 2. Appointment Booking Flow

### Booking Process
1. Patient selects doctor
2. System loads available slots for selected date
3. Patient selects time slot
4. System validates slot availability
5. System creates appointment
6. System assigns queue number
7. System marks slot as booked
8. System saves to localStorage
9. Show success message

### Validation Rules
- Slot must be available
- Slot must not be in the past
- Patient must be logged in
- Doctor must be active
- No duplicate bookings for same patient/doctor/date

### Implementation
```javascript
// appointmentService.js
export const bookAppointment = (appointmentData) => {
  // 1. Validate slot availability
  const slot = getTimeSlot(appointmentData.slotId);
  if (!slot || !slot.isAvailable) {
    throw new Error('Time slot not available');
  }
  
  // 2. Check for duplicate booking
  const existingAppointment = checkDuplicateBooking(
    appointmentData.patientId,
    appointmentData.doctorId,
    appointmentData.date
  );
  if (existingAppointment) {
    throw new Error('You already have an appointment with this doctor on this date');
  }
  
  // 3. Create appointment
  const appointment = {
    id: generateId(),
    ...appointmentData,
    status: 'BOOKED',
    queueNumber: getNextQueueNumber(appointmentData.doctorId, appointmentData.date),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    statusHistory: [{
      status: 'BOOKED',
      timestamp: new Date().toISOString()
    }]
  };
  
  // 4. Mark slot as booked
  updateTimeSlot(appointmentData.slotId, {
    isAvailable: false,
    appointmentId: appointment.id
  });
  
  // 5. Add to queue
  addToQueue(appointment);
  
  // 6. Save appointment
  saveAppointment(appointment);
  
  return appointment;
};
```

## 3. Queue Management System

### Queue Algorithm
- Queue numbers are assigned sequentially per doctor per day
- Starting from 1 each day
- When appointment is cancelled, reorder remaining queue
- Queue position determines consultation order

### Implementation
```javascript
// queueService.js
export const getNextQueueNumber = (doctorId, date) => {
  const queue = getQueueForDoctor(doctorId, date);
  if (!queue || queue.length === 0) return 1;
  
  const maxQueueNumber = Math.max(...queue.map(item => item.queueNumber));
  return maxQueueNumber + 1;
};

export const reorderQueue = (doctorId, date, cancelledQueueNumber) => {
  const queue = getQueueForDoctor(doctorId, date);
  
  // Decrease queue numbers for all appointments after cancelled one
  queue.forEach(item => {
    if (item.queueNumber > cancelledQueueNumber) {
      item.queueNumber -= 1;
      updateAppointmentQueueNumber(item.appointmentId, item.queueNumber);
    }
  });
  
  saveQueue(doctorId, date, queue);
};
```

## 4. Appointment Status Workflow

### State Machine
```
BOOKED → CHECKED_IN → IN_CONSULTATION → COMPLETED
   ↓
CANCELLED (allowed before IN_CONSULTATION)
```

### Status Transitions
- BOOKED → CHECKED_IN: Patient arrives at hospital
- CHECKED_IN → IN_CONSULTATION: Doctor starts consultation
- IN_CONSULTATION → COMPLETED: Consultation finished
- Any → CANCELLED: Before IN_CONSULTATION only

### Implementation
```javascript
// appointmentService.js
const VALID_TRANSITIONS = {
  'BOOKED': ['CHECKED_IN', 'CANCELLED'],
  'CHECKED_IN': ['IN_CONSULTATION', 'CANCELLED'],
  'IN_CONSULTATION': ['COMPLETED'],
  'COMPLETED': [],
  'CANCELLED': []
};

export const updateAppointmentStatus = (appointmentId, newStatus) => {
  const appointment = getAppointment(appointmentId);
  
  // Validate transition
  if (!VALID_TRANSITIONS[appointment.status].includes(newStatus)) {
    throw new Error(`Invalid status transition from ${appointment.status} to ${newStatus}`);
  }
  
  // Update status
  appointment.status = newStatus;
  appointment.updatedAt = new Date().toISOString();
  appointment.statusHistory.push({
    status: newStatus,
    timestamp: new Date().toISOString()
  });
  
  // If cancelled, free up the slot
  if (newStatus === 'CANCELLED') {
    freeTimeSlot(appointment.slotId);
    reorderQueue(appointment.doctorId, appointment.date, appointment.queueNumber);
  }
  
  saveAppointment(appointment);
  return appointment;
};
```

## 5. Cancellation & Rescheduling

### Cancellation Flow
1. Validate appointment can be cancelled (not IN_CONSULTATION or COMPLETED)
2. Update status to CANCELLED
3. Free up time slot
4. Reorder queue
5. Save cancellation reason (optional)

### Rescheduling Flow
1. Cancel current appointment
2. Book new appointment with new slot
3. Maintain appointment history link

### Implementation
```javascript
// appointmentService.js
export const cancelAppointment = (appointmentId, reason = '') => {
  const appointment = getAppointment(appointmentId);
  
  // Validate can cancel
  if (['IN_CONSULTATION', 'COMPLETED'].includes(appointment.status)) {
    throw new Error('Cannot cancel appointment in this status');
  }
  
  // Check if last-minute cancellation (within 1 hour)
  const appointmentTime = new Date(`${appointment.date}T${appointment.timeSlot}`);
  const now = new Date();
  const hoursDiff = (appointmentTime - now) / (1000 * 60 * 60);
  
  if (hoursDiff < 1 && hoursDiff > 0) {
    console.warn('Last-minute cancellation detected');
  }
  
  // Update status
  appointment.status = 'CANCELLED';
  appointment.cancellationReason = reason;
  appointment.updatedAt = new Date().toISOString();
  
  // Free slot and reorder queue
  freeTimeSlot(appointment.slotId);
  reorderQueue(appointment.doctorId, appointment.date, appointment.queueNumber);
  
  saveAppointment(appointment);
  return appointment;
};

export const rescheduleAppointment = (appointmentId, newSlotId) => {
  const oldAppointment = getAppointment(appointmentId);
  
  // Cancel old appointment
  cancelAppointment(appointmentId, 'Rescheduled');
  
  // Book new appointment
  const newAppointment = bookAppointment({
    ...oldAppointment,
    slotId: newSlotId,
    rescheduledFrom: appointmentId
  });
  
  return newAppointment;
};
```

## 6. Doctor Availability

### Availability States
- AVAILABLE: Can accept appointments
- UNAVAILABLE: Cannot accept new appointments
- ON_LEAVE: Extended unavailability

### Implementation
```javascript
// availabilityService.js
export const setDoctorAvailability = (doctorId, isAvailable, reason = '') => {
  const availability = {
    doctorId,
    isAvailable,
    reason,
    updatedAt: new Date().toISOString()
  };
  
  // If becoming unavailable, handle future appointments
  if (!isAvailable) {
    const futureAppointments = getFutureAppointments(doctorId);
    
    // Option 1: Auto-cancel
    // futureAppointments.forEach(apt => cancelAppointment(apt.id, 'Doctor unavailable'));
    
    // Option 2: Mark for rescheduling
    futureAppointments.forEach(apt => {
      apt.needsRescheduling = true;
      saveAppointment(apt);
    });
  }
  
  saveDoctorAvailability(availability);
  return availability;
};
```

## 7. Visit History

### History Data Structure
```javascript
{
  patientId: string,
  appointments: Array<Appointment>,
  filters: {
    dateRange: 'today' | 'week' | 'month' | 'custom',
    status: 'all' | 'completed' | 'cancelled',
    startDate: string,
    endDate: string
  }
}
```

### Implementation
```javascript
// appointmentService.js
export const getPatientHistory = (patientId, filters = {}) => {
  let appointments = getAllAppointments().filter(apt => apt.patientId === patientId);
  
  // Apply date filter
  if (filters.dateRange) {
    const now = new Date();
    let startDate;
    
    switch (filters.dateRange) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'custom':
        startDate = new Date(filters.startDate);
        break;
    }
    
    appointments = appointments.filter(apt => new Date(apt.date) >= startDate);
  }
  
  // Apply status filter
  if (filters.status && filters.status !== 'all') {
    appointments = appointments.filter(apt => apt.status === filters.status.toUpperCase());
  }
  
  // Sort by date (newest first)
  appointments.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return appointments;
};
```

## 8. LocalStorage Schema

### Storage Keys
```javascript
const STORAGE_KEYS = {
  APPOINTMENTS: 'hospitalAppointments',
  QUEUE: 'hospitalQueue',
  TIME_SLOTS: 'hospitalTimeSlots',
  AVAILABILITY: 'doctorAvailability',
  USERS: 'hospitalUsers',
  CURRENT_USER: 'currentUser'
};
```

### Data Persistence
- Save after every mutation
- Load on app initialization
- Handle quota exceeded errors
- Implement data cleanup for old records

## UI Components

### Patient Dashboard - Book Appointment Section
- Doctor selection dropdown
- Date picker (only future dates)
- Time slot grid (visual selection)
- Appointment details form
- Confirmation dialog

### Patient Dashboard - My Appointments Section
- List of upcoming appointments
- Appointment cards with status badges
- Cancel button (if allowed)
- Reschedule button
- View details button

### Doctor Dashboard - Queue Section
- Today's queue list
- Patient cards with queue numbers
- Status update buttons
- Call next patient button

### Doctor Dashboard - Appointments Section
- Calendar view
- List view with filters
- Status update interface
- Patient details

## Error Handling

### Common Errors
1. Slot not available
2. Duplicate booking
3. Invalid status transition
4. Past date/time selection
5. Doctor unavailable
6. localStorage quota exceeded

### Error Messages
- User-friendly messages
- Actionable suggestions
- Clear error states in UI

## Performance Considerations

### Optimization
- Lazy load appointment history
- Cache frequently accessed data
- Debounce search/filter operations
- Virtualize long lists
- Minimize localStorage writes

### Data Cleanup
- Archive appointments older than 6 months
- Remove cancelled appointments after 30 days
- Cleanup unused time slots

## Testing Strategy

### Unit Tests
- Service functions
- Reducers
- Utility functions

### Integration Tests
- Booking flow
- Cancellation flow
- Status updates
- Queue management

### Edge Cases
- Concurrent bookings
- Last-minute cancellations
- Doctor mid-day unavailability
- localStorage full
- Network issues (N/A for frontend-only)

## Implementation Phases

### Phase 1: Core Booking (Week 1)
- Time slot generation
- Appointment booking
- Basic queue management

### Phase 2: Status & History (Week 2)
- Status workflow
- Visit history
- Cancellation

### Phase 3: Advanced Features (Week 3)
- Rescheduling
- Doctor availability
- Edge case handling

### Phase 4: Polish & Testing (Week 4)
- UI improvements
- Error handling
- Testing
- Documentation
