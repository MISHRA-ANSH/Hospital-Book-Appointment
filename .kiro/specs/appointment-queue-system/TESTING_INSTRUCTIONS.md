# Testing Instructions - Phase 1: Core Booking System

## ✅ Fixed Issues
- Removed duplicate `recentAppointments` variable declarations in PatientDashboard.jsx
- All diagnostics errors resolved
- Dev server running successfully

## 🎯 What's Been Implemented

### Backend Services (100% Complete)
1. **Time Slot Service** (`src/services/timeSlotService.js`)
   - Generates 30-minute time slots
   - Working hours: Mon-Fri 9:00-17:00, Sat 10:00-14:00, Sun closed
   - Lunch break: 13:00-14:00 (no slots)
   - Filters out past time slots automatically
   - Persists slots in localStorage

2. **Appointment Service** (`src/services/appointmentService.js`)
   - Complete booking flow with validation
   - Duplicate booking prevention
   - Queue number assignment
   - Cancellation with slot release
   - Status workflow management
   - Patient history with filters

3. **Queue Service** (`src/services/queueService.js`)
   - Auto-assigns queue numbers
   - Reorders queue on cancellation
   - Tracks queue position
   - Manages active queues per doctor/date

### Frontend UI (Patient Dashboard - 100% Complete)
1. **Dashboard Home** - Shows real stats and upcoming appointments
2. **Book Appointment** - Full booking flow with real data
3. **View/Cancel Appointments** - Manage appointments
4. **Visit History** - Filter by date range and status

## 🧪 Testing Guide

### Test 1: Patient Signup & Login
1. Go to http://localhost:5173/signup
2. Create a new patient account:
   - First Name: Test
   - Last Name: Patient
   - Email: test.patient@example.com
   - Password: test123
   - Phone: +91 98765 00000
   - Gender: Male
   - Role: Patient
3. Click "Sign Up"
4. Should redirect to `/patient-dashboard`

### Test 2: Book First Appointment
1. In Patient Dashboard, click "Appointments" → "Book appointment"
2. Select Doctor: Dr. Anamika Singh - Cardiologist
3. Select Date: Tomorrow's date
4. You should see available time slots (9:00, 9:30, 10:00, etc.)
5. Click on a time slot (e.g., 10:00)
6. Click "Book Appointment"
7. Should see success message with queue number: "Appointment booked successfully! Your queue number is #1"

### Test 3: Verify Dashboard Stats
1. Go back to Dashboard (click "Dashboard" in sidebar)
2. Stats should update:
   - Upcoming Appointments: 1
   - Completed: 0
   - Cancelled: 0
   - Total Visits: 1
3. Should see your appointment in "Upcoming Appointments" table

### Test 4: Book Second Appointment (Same Doctor, Same Date)
1. Try to book another appointment with same doctor on same date
2. Should see error: "You already have an appointment with this doctor on this date"
3. This validates duplicate booking prevention ✅

### Test 5: Book Appointment with Different Doctor
1. Select Doctor: Dr. Harsh Mehta - Endocrinologist
2. Select same date as before
3. Select a time slot
4. Click "Book Appointment"
5. Should succeed with queue number #1 (separate queue per doctor)

### Test 6: View All Appointments
1. Click "Appointments" → "View / cancel appointment"
2. Should see both appointments listed
3. Each should show:
   - Doctor name and department
   - Date and time
   - Queue number
   - Status: BOOKED
   - Booked timestamp

### Test 7: Cancel Appointment
1. In "View / cancel appointment" section
2. Click "Cancel Appointment" on one of your appointments
3. Confirm the cancellation
4. Should see success message
5. Appointment status should change to CANCELLED
6. "Cancel Appointment" button should disappear

### Test 8: Verify Queue Reordering
1. Book 3 appointments with same doctor on same date:
   - Slot 1: 10:00 (Queue #1)
   - Slot 2: 10:30 (Queue #2)
   - Slot 3: 11:00 (Queue #3)
2. Cancel the middle appointment (Queue #2)
3. The third appointment should automatically become Queue #2
4. This validates queue reordering ✅

### Test 9: Visit History with Filters
1. Click "Medical Records" → "Visit history"
2. Should see all appointments (including cancelled)
3. Test filters:
   - Date Range: "This Week" - should show only this week's appointments
   - Status: "CANCELLED" - should show only cancelled appointments
   - Status: "BOOKED" - should show only active bookings

### Test 10: Past Slot Prevention
1. Try to book an appointment for today
2. Select a time slot that has already passed
3. Past slots should NOT appear in the available slots list
4. This validates past slot filtering ✅

### Test 11: Sunday Closed
1. Try to select a Sunday date
2. Should see message: "No available slots for this date"
3. This validates Sunday closure ✅

### Test 12: Saturday Hours
1. Select a Saturday date
2. Should only see slots from 10:00 to 14:00
3. No slots before 10:00 or after 14:00
4. This validates Saturday working hours ✅

### Test 13: Lunch Break
1. Select any weekday
2. Should NOT see any slots between 13:00-14:00
3. This validates lunch break ✅

### Test 14: Multiple Patients
1. Logout and create another patient account
2. Book appointments with the same doctors
3. Each patient should have their own queue numbers
4. Queue numbers should be sequential per doctor/date

### Test 15: LocalStorage Persistence
1. Book some appointments
2. Refresh the page (F5)
3. All appointments should still be there
4. Stats should be correct
5. This validates localStorage persistence ✅

## 📊 Expected Results Summary

### Working Features ✅
- ✅ Time slot generation (30-min intervals)
- ✅ Working hours enforcement (Mon-Fri 9-5, Sat 10-2, Sun closed)
- ✅ Lunch break (1-2 PM)
- ✅ Past slot filtering
- ✅ Duplicate booking prevention
- ✅ Queue number assignment
- ✅ Queue reordering on cancellation
- ✅ Appointment cancellation
- ✅ Visit history with filters
- ✅ Real-time stats calculation
- ✅ LocalStorage persistence

### Known Limitations (To Be Implemented in Phase 2)
- ⏳ Doctor Dashboard (not yet updated with real data)
- ⏳ Status transitions (CHECKED_IN, IN_CONSULTATION, COMPLETED)
- ⏳ Rescheduling functionality
- ⏳ Doctor availability management
- ⏳ Toast notifications
- ⏳ Loading states
- ⏳ Real-time queue updates

## 🐛 Troubleshooting

### Issue: No slots appearing
**Solution**: Check browser console for errors. Clear localStorage and refresh.

### Issue: Duplicate booking error when it shouldn't
**Solution**: Check if you already have an appointment with that doctor on that date. Cancel it first.

### Issue: Stats not updating
**Solution**: Refresh the page. Stats are calculated on component mount.

### Issue: Queue numbers not sequential
**Solution**: This is expected if appointments were cancelled. Queue reorders automatically.

## 🔍 Data Inspection

To inspect the data in localStorage:
1. Open browser DevTools (F12)
2. Go to Application → Local Storage → http://localhost:5173
3. Check these keys:
   - `hospitalTimeSlots` - All time slots
   - `hospitalAppointments` - All appointments
   - `hospitalQueue` - Queue data

## 📝 Test Data

### Available Doctors
1. Dr. Anamika Singh - Cardiologist
2. Dr. Harsh Mehta - Endocrinologist
3. Dr. Prem Yadav - Pediatrician
4. Dr. Meenakshi Patel - Neurologist
5. Dr. Mukul Tyagi - Surgeon
6. Dr. Rossy Kumar - General Physician

### Test Patient Credentials
Create your own or use:
- Email: test.patient@example.com
- Password: test123

## ✨ Next Steps

After testing Phase 1, we can proceed to:
1. Update Doctor Dashboard with real queue and appointments
2. Implement status workflow (Check-in, In Consultation, Complete)
3. Add rescheduling functionality
4. Add toast notifications
5. Add loading states and animations
6. Implement doctor availability management
