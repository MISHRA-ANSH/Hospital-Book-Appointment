# Component Documentation

## Common Components

### UI Components
- **Button**: Reusable button with variants (primary, secondary, danger)
- **Input**: Form input with label
- **Select**: Dropdown select with options
- **Card**: Container card with optional title
- **Badge**: Status badge with color variants

## Feature Components

### Appointments
- **BookingWizard**: Multi-step appointment booking flow
- **TimeSlotPicker**: Time slot selection grid
- **AppointmentStatusBadge**: Status indicator badge

### Doctors
- **DoctorCard**: Doctor information card with availability
- **DoctorList**: List of all doctors

### Queue
- **QueueDisplay**: Real-time queue display for a doctor
- **QueueItem**: Individual queue item

## Pages

### HomePage
Dashboard showing system statistics.

### BookAppointmentPage
Patient appointment booking interface.

### ManageQueuePage
Queue management interface for doctors.

## Component Props

### BookingWizard
```jsx
<BookingWizard
  patientId={string}
  onComplete={(appointment) => void}
/>
```

### QueueDisplay
```jsx
<QueueDisplay
  doctorId={string}
/>
```

### DoctorCard
```jsx
<DoctorCard
  doctor={object}
  onSelect={(doctor) => void}
/>
```

### TimeSlotPicker
```jsx
<TimeSlotPicker
  slots={array}
  selectedSlot={string}
  onSelectSlot={(slot) => void}
/>
```
