# Patient Dashboard

## Overview
The Patient Dashboard is a comprehensive interface for patients to manage their healthcare needs after logging in.

## Access
- **URL**: `/patient-dashboard`
- **Login**: Patients must login with role "Patient" to access this dashboard
- **Auto-redirect**: After successful login as a patient, users are automatically redirected to this dashboard

## Features

### Sidebar Navigation
The dashboard includes a fixed sidebar with the following sections:

1. **Dashboard**
   - Upcoming appointment
   - Pending bills
   - Recent reports

2. **Appointments**
   - Book appointment
   - View / cancel appointment

3. **Doctors**
   - View assigned doctor
   - Doctor availability

4. **Medical Records**
   - Visit history
   - Lab reports
   - Discharge summary

5. **Prescriptions**
   - Current medicines
   - Refill request

6. **Lab Tests**
   - Test status
   - Download report

7. **Billing & Payments**
   - Bills
   - Online payment
   - Payment history

8. **Messages**
   - Contact doctor / hospital

9. **Profile**
   - Personal + insurance info

10. **Notifications**
    - Appointment reminder
    - Test result alert

11. **Logout**
    - Sign out from the system

### Main Dashboard Area

#### Header
- Dashboard title
- Dark mode toggle button
- Notification bell icon
- User profile with avatar and name

#### Statistics Cards
Four stat cards showing:
- Total Appointments (240)
- Today Appointment (0)
- Total Meetings (0)
- Bill Amount ($216.11K)

#### Recent Appointments Table
Displays recent appointments with:
- Patient name
- Doctor name
- Doctor department
- Appointment date
- Status (Confirmed/Pending/Cancelled)

## Design Features
- **Gradient Sidebar**: Clean white sidebar with purple gradient for active items
- **Responsive**: Adapts to mobile, tablet, and desktop screens
- **Animations**: Smooth Framer Motion animations throughout
- **Icons**: Emoji icons for visual clarity
- **Color-coded Stats**: Each stat card has a unique color theme
- **Status Badges**: Color-coded badges for appointment status

## Technical Details
- **Component**: `PatientDashboard.jsx`
- **Styles**: `PatientDashboard.css`
- **Route**: `/patient-dashboard`
- **Authentication**: Requires patient role login
- **State Management**: Local state for active section

## Future Enhancements
- Implement actual functionality for each sidebar section
- Add real-time data from backend
- Enable appointment booking from dashboard
- Add prescription management
- Integrate payment gateway
- Add messaging system
- Enable document downloads
