# Role-Based Access Control (RBAC)

## Overview
The Hospital Management System implements a three-tier role-based authentication system to provide appropriate access levels for different types of users.

## User Roles

### 🏥 Patient
**Primary Users**: Individuals seeking medical care

**Access Rights**:
- ✅ Book appointments with doctors
- ✅ View their own appointments
- ✅ Manage personal profile
- ✅ View available doctors
- ✅ View hospital services
- ❌ Cannot access queue management
- ❌ Cannot access admin dashboard
- ❌ Cannot view other patients' data

**Dashboard Features**:
- My Appointments
- Profile Settings
- Book New Appointment

---

### 👨‍⚕️ Doctor
**Primary Users**: Medical professionals providing care

**Access Rights**:
- ✅ Manage patient queue
- ✅ View all appointments
- ✅ Access patient records
- ✅ Update appointment status
- ✅ Manage their availability
- ✅ View their schedule
- ❌ Cannot access admin dashboard
- ❌ Cannot manage other doctors
- ❌ Cannot modify system settings

**Dashboard Features**:
- Manage Queue
- View Appointments
- Patient Records
- My Schedule
- Profile Settings

---

### 👔 Admin
**Primary Users**: System administrators and hospital management

**Access Rights**:
- ✅ Full system access
- ✅ Manage all users (patients, doctors, admins)
- ✅ View system analytics
- ✅ Access dashboard with statistics
- ✅ Manage hospital services
- ✅ Configure system settings
- ✅ View all appointments and queues
- ✅ Generate reports

**Dashboard Features**:
- System Dashboard
- Manage Users
- Analytics & Reports
- System Settings
- All Appointments
- All Queues
- Profile Settings

---

## Role Selection

### During Registration
Users select their role when creating an account:
1. Click on the desired role button (Patient/Doctor/Admin)
2. Fill in registration details
3. Submit form
4. Role is permanently assigned to the account

### During Login
Users must select the same role they registered with:
1. Click on the role button matching their registration
2. Enter email and password
3. Login is only successful if role matches

**Important**: A user registered as "Patient" cannot login as "Doctor" or "Admin", even with correct credentials.

---

## Role Indicators

### Visual Indicators
- **Navbar Badge**: Shows role next to username
- **Profile Dropdown**: Displays role badge with color coding
  - Patient: Blue badge 🏥
  - Doctor: Green badge 👨‍⚕️
  - Admin: Pink badge 👔

### Color Coding
```css
Patient: Blue (#1e40af)
Doctor: Green (#065f46)
Admin: Pink (#9f1239)
```

---

## Security Considerations

### Current Implementation (Demo/Prototype)
⚠️ **Client-side only** - suitable for demos and learning

### Production Requirements
For production deployment, implement:

1. **Server-side Authentication**
   - JWT tokens
   - Session management
   - Secure HTTP-only cookies

2. **Role Verification**
   - Server-side role checks
   - API endpoint protection
   - Route guards

3. **Password Security**
   - Bcrypt/Argon2 hashing
   - Salt generation
   - Password strength requirements

4. **Additional Security**
   - HTTPS only
   - CSRF protection
   - Rate limiting
   - 2FA for admin accounts
   - Audit logging
   - IP whitelisting for admin

---

## Usage Examples

### Register as Patient
```javascript
const result = registerUser({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+1234567890",
  password: "securepass123",
  gender: "male",
  role: "patient"
});
```

### Register as Doctor
```javascript
const result = registerUser({
  firstName: "Dr. Sarah",
  lastName: "Smith",
  email: "sarah.smith@hospital.com",
  phone: "+1234567891",
  password: "doctorpass123",
  gender: "female",
  role: "doctor"
});
```

### Register as Admin
```javascript
const result = registerUser({
  firstName: "Admin",
  lastName: "User",
  email: "admin@hospital.com",
  phone: "+1234567892",
  password: "adminpass123",
  gender: "male",
  role: "admin"
});
```

### Login with Role
```javascript
// Patient login
const patientLogin = loginUser("john@example.com", "securepass123", "patient");

// Doctor login
const doctorLogin = loginUser("sarah.smith@hospital.com", "doctorpass123", "doctor");

// Admin login
const adminLogin = loginUser("admin@hospital.com", "adminpass123", "admin");
```

### Check User Role
```javascript
const currentUser = getCurrentUser();
if (currentUser) {
  switch(currentUser.role) {
    case 'patient':
      // Show patient dashboard
      break;
    case 'doctor':
      // Show doctor dashboard
      break;
    case 'admin':
      // Show admin dashboard
      break;
  }
}
```

---

## Future Enhancements

### Planned Features
1. **Role Permissions Matrix**
   - Granular permission control
   - Custom role creation
   - Permission inheritance

2. **Multi-role Support**
   - Users with multiple roles
   - Role switching
   - Context-based access

3. **Role Hierarchy**
   - Admin > Doctor > Patient
   - Inherited permissions
   - Override capabilities

4. **Audit Trail**
   - Track role changes
   - Log access attempts
   - Monitor suspicious activity

5. **Role-based UI**
   - Dynamic menu items
   - Conditional rendering
   - Role-specific themes

---

## Testing Accounts

For testing purposes, you can create accounts with different roles:

### Test Patient
- Email: patient@test.com
- Password: patient123
- Role: Patient

### Test Doctor
- Email: doctor@test.com
- Password: doctor123
- Role: Doctor

### Test Admin
- Email: admin@test.com
- Password: admin123
- Role: Admin

**Note**: These are example credentials. Create your own test accounts in the application.
