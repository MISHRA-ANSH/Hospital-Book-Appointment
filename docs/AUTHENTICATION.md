# Authentication System Documentation

## Overview
The Hospital Management System includes a complete role-based authentication system with login and signup functionality. Users can register and login as **Patient**, **Doctor**, or **Admin**. User data is stored in the browser's localStorage.

## User Roles

### 1. Patient 🏥
- Book appointments
- View their appointments
- Manage their profile

### 2. Doctor 👨‍⚕️
- Manage patient queue
- View all appointments
- Access patient records
- Manage their profile

### 3. Admin 👔
- Access dashboard
- Manage all users
- View system analytics
- Full system access

## Features

### 1. User Registration (Signup)
- **Route**: `/signup`
- **Role Selection**: Patient, Doctor, or Admin
- **Fields**:
  - First Name (required)
  - Last Name (required)
  - Email (required, validated)
  - Phone (required, validated)
  - Password (required, min 6 characters)
  - Confirm Password (required, must match)
  - Gender (Male/Female)
  - Role (Patient/Doctor/Admin)

### 2. User Login
- **Route**: `/login`
- **Role Selection**: Patient, Doctor, or Admin
- **Fields**:
  - Email (required)
  - Password (required)
  - Role (required - must match registration role)

### 3. User Profile
- Displays user information in navbar when logged in
- Shows user role badge
- Role-specific dropdown menu:
  - **Patient**: My Appointments, Profile Settings
  - **Doctor**: Manage Queue, View Appointments, Profile Settings
  - **Admin**: Dashboard, Manage Users, Profile Settings
  - **All**: Logout button

## LocalStorage Structure

### Users Storage
```javascript
// Key: 'hospitalUsers'
[
  {
    id: 1234567890,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890",
    password: "password123",
    gender: "male",
    role: "patient", // or "doctor" or "admin"
    createdAt: "2026-02-04T10:30:00.000Z"
  }
]
```

### Current User Session
```javascript
// Key: 'currentUser'
{
  id: 1234567890,
  email: "john@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "+1234567890",
  gender: "male",
  role: "patient" // or "doctor" or "admin"
}
```

## Authentication Service API

### `registerUser(userData)`
Registers a new user with a specific role.
```javascript
const result = registerUser({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+1234567890",
  password: "password123",
  gender: "male",
  role: "patient" // or "doctor" or "admin"
});
// Returns: { success: true/false, user: {...}, message: "..." }
```

### `loginUser(email, password, role)`
Authenticates a user with their role.
```javascript
const result = loginUser("john@example.com", "password123", "patient");
// Returns: { success: true/false, user: {...}, message: "..." }
```

**Note**: The role must match the role used during registration. A user registered as "patient" cannot login as "doctor" or "admin".

### `logoutUser()`
Logs out the current user.
```javascript
const result = logoutUser();
// Returns: { success: true/false, message: "..." }
```

### `getCurrentUser()`
Gets the currently logged-in user.
```javascript
const user = getCurrentUser();
// Returns: user object or null
```

### `isAuthenticated()`
Checks if a user is logged in.
```javascript
const loggedIn = isAuthenticated();
// Returns: true/false
```

### `updateUserProfile(userId, updates)`
Updates user profile information.
```javascript
const result = updateUserProfile(userId, {
  firstName: "Jane",
  phone: "+9876543210"
});
// Returns: { success: true/false, user: {...}, message: "..." }
```

### `changePassword(userId, oldPassword, newPassword)`
Changes user password.
```javascript
const result = changePassword(userId, "oldpass", "newpass");
// Returns: { success: true/false, message: "..." }
```

## Form Validation

### Email Validation
- Must be in valid email format (xxx@xxx.xxx)
- Checked for uniqueness during registration

### Password Validation
- Minimum 6 characters
- Must match confirmation password during registration

### Phone Validation
- Must contain only digits, spaces, dashes, parentheses, and optional + prefix

## UI Features

### Animations
- Smooth page transitions using Framer Motion
- Floating background shapes
- Icon animations
- Form input focus effects
- Button hover and tap effects

### Password Toggle
- Eye icon to show/hide password
- Available on both password fields

### Error Handling
- Real-time validation
- Error messages appear below fields
- Error banner for submission errors
- Input fields highlight in red when invalid

### Responsive Design
- Mobile-friendly layouts
- Adaptive form layouts
- Touch-friendly buttons

## Security Notes

⚠️ **Important**: This is a client-side only authentication system suitable for demos and prototypes.

For production use, you should:
1. Implement server-side authentication
2. Use secure password hashing (bcrypt, argon2)
3. Implement JWT or session-based authentication
4. Add HTTPS
5. Implement rate limiting
6. Add CSRF protection
7. Use secure HTTP-only cookies
8. Implement password reset functionality
9. Add email verification
10. Implement 2FA (Two-Factor Authentication)

## Usage Example

```javascript
import { loginUser, getCurrentUser, logoutUser } from './services/authService';

// Login
const loginResult = loginUser("user@example.com", "password123");
if (loginResult.success) {
  console.log("Logged in:", loginResult.user);
}

// Get current user
const currentUser = getCurrentUser();
if (currentUser) {
  console.log("Current user:", currentUser);
}

// Logout
const logoutResult = logoutUser();
if (logoutResult.success) {
  console.log("Logged out successfully");
}
```

## Navigation Flow

1. **New User**: Home → Signup → Auto-login → Home (with profile)
2. **Existing User**: Home → Login → Home (with profile)
3. **Logged In User**: Can access profile dropdown, appointments, settings
4. **Logout**: Profile Dropdown → Logout → Home (guest view)

## Styling

The authentication pages use a beautiful gradient background with:
- Purple gradient (from #667eea to #764ba2)
- Floating animated shapes
- Glass-morphism effects
- Smooth transitions
- Modern card design
- Professional form styling

## Browser Compatibility

Works in all modern browsers that support:
- localStorage API
- ES6+ JavaScript
- CSS Grid and Flexbox
- CSS animations and transitions
