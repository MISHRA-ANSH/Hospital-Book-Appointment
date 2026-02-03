# Application Flow Documentation

## Appointment Booking Flow

1. **Select Patient**: Choose patient from dropdown
2. **Select Doctor**: View available doctors and select one
3. **Select Date**: Choose appointment date
4. **Select Time**: Pick from available time slots
5. **Confirm**: Book appointment and add to queue

## Queue Management Flow

1. **Check-in**: Patient arrives and checks in (BOOKED → CHECKED_IN)
2. **Queue Assignment**: Automatic queue number assignment
3. **Consultation**: Doctor starts consultation (CHECKED_IN → IN_CONSULTATION)
4. **Complete**: Consultation ends (IN_CONSULTATION → COMPLETED)
5. **Queue Reorder**: Queue automatically reorders on cancellation

## Status Transitions

```
BOOKED → CHECKED_IN → IN_CONSULTATION → COMPLETED
   ↓           ↓
CANCELLED   CANCELLED
```

**Valid Transitions:**
- BOOKED can go to: CHECKED_IN, CANCELLED
- CHECKED_IN can go to: IN_CONSULTATION, CANCELLED
- IN_CONSULTATION can go to: COMPLETED
- COMPLETED: Final state
- CANCELLED: Final state

## Cancellation Flow

1. **Validate**: Check if appointment can be cancelled
2. **Update Status**: Set status to CANCELLED
3. **Remove from Queue**: Remove from queue
4. **Reorder**: Reorder remaining queue items
5. **Notify**: Send notification to patient

## Rescheduling Flow

1. **Validate**: Check if appointment can be rescheduled
2. **Check Availability**: Verify new slot is available
3. **Update Appointment**: Change date/time
4. **Maintain Queue**: Keep queue position if same day
5. **Notify**: Send confirmation notification

## Doctor Availability Flow

1. **Toggle Availability**: Mark doctor as unavailable
2. **Find Affected Appointments**: Get all BOOKED appointments
3. **Bulk Cancel**: Cancel all affected appointments
4. **Notify Patients**: Send notifications to all affected patients
5. **Update Queue**: Remove cancelled appointments from queue

## Data Persistence

All state changes are automatically persisted to localStorage:
- Doctors
- Patients
- Appointments
- Queue

Data is restored on page refresh.

## Edge Cases Handled

1. **Double Booking Prevention**: Validate slot availability before booking
2. **Past Slot Prevention**: Disable past time slots
3. **Status Transition Validation**: Enforce valid status transitions
4. **Queue Reordering**: Automatic reordering on cancellation
5. **Doctor Unavailability**: Cascade cancellation of appointments
6. **Duplicate Prevention**: Check for existing appointments
