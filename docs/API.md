# API Documentation

## Context API

### HospitalContext

Main context providing access to all state and dispatch functions.

**State:**
- `doctors`: Array of doctor objects
- `patients`: Array of patient objects
- `appointments`: Array of appointment objects
- `queue`: Array of queue items
- `notifications`: Array of notification objects

**Dispatchers:**
- `dispatchDoctors`: Dispatch actions for doctor state
- `dispatchPatients`: Dispatch actions for patient state
- `dispatchAppointments`: Dispatch actions for appointment state
- `dispatchQueue`: Dispatch actions for queue state
- `dispatchNotifications`: Dispatch actions for notification state

## Custom Hooks

### useAppointments()
Manages appointment operations.

**Methods:**
- `book(patientId, doctorId, date, time, timeEnd)`: Book new appointment
- `updateStatus(appointmentId, status)`: Update appointment status
- `cancel(appointmentId)`: Cancel appointment
- `reschedule(appointmentId, newDate, newTime, newTimeEnd)`: Reschedule appointment

### useQueue()
Manages queue operations.

**Methods:**
- `addToQueue(appointment)`: Add appointment to queue
- `updateStatus(appointmentId, status)`: Update queue item status
- `removeFromQueue(appointmentId)`: Remove from queue and reorder
- `getByDoctor(doctorId)`: Get queue for specific doctor
- `getActive()`: Get active queue items

### useTimeSlots()
Manages time slot operations.

**Methods:**
- `getSlots(doctorId, date)`: Get available slots for doctor on date
- `checkSlotAvailability(doctorId, date, time)`: Check if slot is available

### useNotifications()
Manages notifications.

**Methods:**
- `addNotification(type, message, details)`: Add new notification
- `markAsRead(notificationId)`: Mark notification as read
- `removeNotification(notificationId)`: Remove notification
- `clearAll()`: Clear all notifications

## Services

### appointmentService
Core appointment business logic.

### queueService
Queue management logic.

### timeSlotService
Time slot generation and availability checking.

### validationService
Validation rules for appointments and operations.

### persistenceService
LocalStorage persistence operations.

### notificationService
Notification creation and management.
