# Hospital Appointment & Queue Management System

A comprehensive React-based hospital appointment and queue management system with advanced scheduling logic, queue handling, role-based authentication, and state management.

## Features

### Core Features
- **Role-Based Authentication** (Patient, Doctor, Admin)
- **Doctor Authorization System** - Only authorized doctors can access doctor dashboard
- **Doctor & Patient Management**
- **Appointment Slot Generation & Booking**
- **Queue Management System**
- **Appointment Status Workflow**
- **Cancellation & Rescheduling**
- **Doctor Availability Handling**
- **Visit History**
- **LocalStorage Persistence**
- **Edge Case Handling**

### Dashboards
- **Patient Dashboard** - Book appointments, view history, manage prescriptions, bills, and more
- **Doctor Dashboard** - View assigned appointments, manage patients, prescriptions, lab tests, and schedule

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Quick Start - Doctor Login

To test the doctor dashboard, use these authorized doctor credentials:

| Email | Password | Specialty |
|-------|----------|-----------|
| dr.anamika@hospital.com | anamika123 | Cardiologist |
| dr.harsh@hospital.com | harsh123 | Endocrinologist |
| dr.prem@hospital.com | prem123 | Pediatrician |

See `/docs/TESTING_GUIDE.md` for complete testing instructions.

## Documentation

- `/docs/AUTHENTICATION.md` - Authentication system overview
- `/docs/DOCTOR_AUTHORIZATION.md` - Doctor authorization details
- `/docs/TESTING_GUIDE.md` - How to test the system
- `/docs/ROLES.md` - User roles and permissions
- `/docs/ROLE_FEATURES.md` - Features by role
- `/docs/PATIENT_DASHBOARD.md` - Patient dashboard documentation
- `/docs/API.md` - API documentation
- `/docs/COMPONENTS.md` - Component documentation
- `/docs/FLOW.md` - Application flow

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── context/         # State management
├── services/        # Business logic
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
└── data/            # Static data (authorized doctors)
```

## Security Notes

⚠️ **This is a demo application**. For production use:
- Implement proper backend authentication
- Hash passwords (bcrypt, argon2)
- Use JWT tokens or session management
- Store sensitive data in secure databases
- Implement HTTPS
- Add rate limiting and CSRF protection
