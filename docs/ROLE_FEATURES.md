# Role-Based Features Guide

## Quick Reference

| Feature | Patient 🏥 | Doctor 👨‍⚕️ | Admin 👔 |
|---------|-----------|------------|---------|
| **Authentication** |
| Register Account | ✅ | ✅ | ✅ |
| Login | ✅ | ✅ | ✅ |
| Logout | ✅ | ✅ | ✅ |
| **Profile Management** |
| View Profile | ✅ | ✅ | ✅ |
| Edit Profile | ✅ | ✅ | ✅ |
| Change Password | ✅ | ✅ | ✅ |
| **Appointments** |
| Book Appointment | ✅ | ❌ | ✅ |
| View Own Appointments | ✅ | ❌ | ✅ |
| View All Appointments | ❌ | ✅ | ✅ |
| Cancel Appointment | ✅ | ❌ | ✅ |
| Update Appointment Status | ❌ | ✅ | ✅ |
| **Queue Management** |
| View Queue | ❌ | ✅ | ✅ |
| Manage Queue | ❌ | ✅ | ✅ |
| Call Next Patient | ❌ | ✅ | ✅ |
| **User Management** |
| View All Users | ❌ | ❌ | ✅ |
| Add Users | ❌ | ❌ | ✅ |
| Edit Users | ❌ | ❌ | ✅ |
| Delete Users | ❌ | ❌ | ✅ |
| **System Access** |
| Dashboard | ❌ | ✅ | ✅ |
| Analytics | ❌ | ❌ | ✅ |
| System Settings | ❌ | ❌ | ✅ |
| Reports | ❌ | ✅ | ✅ |

---

## Role-Specific Navigation

### Patient Navigation
```
Home
├── Services
├── Doctors
├── About
├── Contact
└── Profile Dropdown
    ├── My Appointments
    ├── Profile Settings
    └── Logout
```

### Doctor Navigation
```
Home
├── Services
├── Doctors
├── About
├── Contact
└── Profile Dropdown
    ├── Manage Queue
    ├── View Appointments
    ├── Profile Settings
    └── Logout
```

### Admin Navigation
```
Home
├── Services
├── Doctors
├── About
├── Contact
└── Profile Dropdown
    ├── Dashboard
    ├── Manage Users
    ├── Profile Settings
    └── Logout
```

---

## Role Selection UI

### Login Page
```
┌─────────────────────────────────────┐
│         🏥 User Login               │
│                                     │
│  ┌────┐  ┌────┐  ┌────┐           │
│  │ 🏥 │  │👨‍⚕️│  │ 👔 │           │
│  │Pat.│  │Doc.│  │Adm.│           │
│  └────┘  └────┘  └────┘           │
│                                     │
│  Email: [________________]          │
│  Password: [____________]           │
│                                     │
│  [        Login        ]            │
│                                     │
│  New User? Sign Up                  │
└─────────────────────────────────────┘
```

### Signup Page
```
┌─────────────────────────────────────┐
│      🏥 User Registration           │
│                                     │
│  ┌────┐  ┌────┐  ┌────┐           │
│  │ 🏥 │  │👨‍⚕️│  │ 👔 │           │
│  │Pat.│  │Doc.│  │Adm.│           │
│  └────┘  └────┘  └────┘           │
│                                     │
│  First Name: [_____] Last: [_____] │
│  Email: [_____] Phone: [_____]     │
│  Password: [_____] Confirm: [____] │
│  Gender: ○ Male  ○ Female          │
│                                     │
│  [        Submit        ]           │
│                                     │
│  Already User? Sign In              │
└─────────────────────────────────────┘
```

---

## Profile Dropdown Examples

### Patient Profile
```
┌──────────────────────┐
│ JD  John Doe        ▾│
└──────────────────────┘
        ↓
┌──────────────────────┐
│ John Doe             │
│ john@example.com     │
│ [🏥 PATIENT]         │
├──────────────────────┤
│ 📅 My Appointments   │
│ 👤 Profile Settings  │
├──────────────────────┤
│ 🚪 Logout            │
└──────────────────────┘
```

### Doctor Profile
```
┌──────────────────────┐
│ SS  Dr. Sarah       ▾│
└──────────────────────┘
        ↓
┌──────────────────────┐
│ Dr. Sarah Smith      │
│ sarah@hospital.com   │
│ [👨‍⚕️ DOCTOR]         │
├──────────────────────┤
│ 📋 Manage Queue      │
│ 📅 View Appointments │
│ 👤 Profile Settings  │
├──────────────────────┤
│ 🚪 Logout            │
└──────────────────────┘
```

### Admin Profile
```
┌──────────────────────┐
│ AU  Admin User      ▾│
└──────────────────────┘
        ↓
┌──────────────────────┐
│ Admin User           │
│ admin@hospital.com   │
│ [👔 ADMIN]           │
├──────────────────────┤
│ 📊 Dashboard         │
│ 👥 Manage Users      │
│ 👤 Profile Settings  │
├──────────────────────┤
│ 🚪 Logout            │
└──────────────────────┘
```

---

## Color Scheme

### Role Colors
- **Patient**: Blue theme (#667eea to #764ba2)
- **Doctor**: Green accents (#10b981)
- **Admin**: Pink/Purple accents (#ec4899)

### Badge Colors
- **Patient Badge**: Light blue background, dark blue text
- **Doctor Badge**: Light green background, dark green text
- **Admin Badge**: Light pink background, dark pink text

---

## Workflow Examples

### Patient Workflow
1. Register as Patient
2. Login with Patient role
3. Browse available doctors
4. Book appointment
5. View appointment status
6. Manage profile

### Doctor Workflow
1. Register as Doctor
2. Login with Doctor role
3. View patient queue
4. Manage appointments
5. Update patient status
6. View schedule

### Admin Workflow
1. Register as Admin
2. Login with Admin role
3. Access dashboard
4. View analytics
5. Manage users
6. Configure system
