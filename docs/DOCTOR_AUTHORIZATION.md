# Doctor Authorization System

## Overview
The hospital management system implements a secure doctor authorization system where only pre-authorized doctors can login and access the doctor dashboard.

## How It Works

### 1. Authorized Doctors Database
All authorized doctors are stored in `src/data/authorizedDoctors.json`. This file contains:
- Doctor ID
- Email address
- Password
- First Name & Last Name
- Specialty
- Department
- Phone number
- Years of experience
- Active status

### 2. Login Validation
When a user attempts to login as a doctor:
1. The system checks if the email and password match an entry in `authorizedDoctors.json`
2. The doctor must have `isActive: true` status
3. If credentials don't match or doctor is not active, the error message "Invalid details. Contact admin." is displayed
4. If credentials are valid, the doctor is logged in and redirected to the doctor dashboard

### 3. Doctor-Specific Data
Once logged in:
- The doctor's full information is stored in localStorage under `currentUser`
- The doctor dashboard only shows appointments assigned to that specific doctor
- Appointments are filtered by matching the doctor's email address
- Stats (appointment counts) are calculated based on the filtered appointments

## Authorized Doctors (Demo Data)

| Name | Email | Password | Specialty | Department |
|------|-------|----------|-----------|------------|
| Dr. Anamika Singh | dr.anamika@hospital.com | anamika123 | Cardiologist | Cardiology |
| Dr. Harsh Mehta | dr.harsh@hospital.com | harsh123 | Endocrinologist | Endocrinology |
| Dr. Prem Yadav | dr.prem@hospital.com | prem123 | Pediatrician | Pediatrics |
| Dr. Meenakshi Patel | dr.meenakshi@hospital.com | meenakshi123 | Neurologist | Neurology |
| Dr. Mukul Tyagi | dr.mukul@hospital.com | mukul123 | Surgeon | Surgery |
| Dr. Rossy Kumar | dr.rossy@hospital.com | rossy123 | General Physician | General Medicine |

## Adding New Doctors

To add a new authorized doctor:

1. Open `src/data/authorizedDoctors.json`
2. Add a new entry to the `doctors` array:

```json
{
    "id": "DOC007",
    "email": "dr.newdoctor@hospital.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "specialty": "Orthopedic Surgeon",
    "department": "Orthopedics",
    "phone": "+91 98765 43216",
    "experience": "10 Years",
    "isActive": true
}
```

3. Save the file
4. The new doctor can now login with their credentials

## Security Notes

⚠️ **Important**: This is a demo implementation. In a production environment:
- Passwords should be hashed (bcrypt, argon2, etc.)
- Doctor data should be stored in a secure database
- Authentication should use JWT tokens or session management
- API endpoints should be protected with proper authentication middleware
- Role-based access control (RBAC) should be implemented at the backend level

## Appointment Assignment

Sample appointments in the system are pre-assigned to doctors:
- Appointments include `doctorEmail` field
- Dashboard filters appointments where `doctorEmail` matches the logged-in doctor's email
- Each doctor only sees their own appointments

## Error Messages

| Scenario | Error Message |
|----------|--------------|
| Doctor not in authorized list | "Invalid details. Contact admin." |
| Incorrect password | "Invalid details. Contact admin." |
| Doctor account inactive | "Invalid details. Contact admin." |
| Patient/Admin wrong credentials | "Invalid email, password, or role selection" |

## Files Modified

1. `src/pages/LoginPage/LoginPage.jsx` - Added doctor authorization logic
2. `src/data/authorizedDoctors.json` - Created authorized doctors database
3. `src/pages/DoctorDashboard/DoctorDashboard.jsx` - Added appointment filtering
4. `src/pages/DoctorDashboard/DoctorSections.jsx` - Updated to show doctor-specific data
