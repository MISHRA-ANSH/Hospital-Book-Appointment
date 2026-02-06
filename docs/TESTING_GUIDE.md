# Testing Guide - Doctor Authorization

## How to Test Doctor Login

### Test Case 1: Login as Authorized Doctor (Dr. Anamika Singh)
1. Navigate to the login page
2. Select "Doctor" role
3. Enter credentials:
   - Email: `dr.anamika@hospital.com`
   - Password: `anamika123`
4. Click "Login"
5. **Expected Result**: 
   - Success message: "Welcome back, Dr. Anamika!"
   - Redirected to doctor dashboard
   - Dashboard shows 2 appointments (filtered for Dr. Anamika)
   - Stats show: 2 Today Appointments, 1 Completed, 1 Pending

### Test Case 2: Login as Another Doctor (Dr. Harsh Mehta)
1. Navigate to the login page
2. Select "Doctor" role
3. Enter credentials:
   - Email: `dr.harsh@hospital.com`
   - Password: `harsh123`
4. Click "Login"
5. **Expected Result**: 
   - Success message: "Welcome back, Dr. Harsh!"
   - Redirected to doctor dashboard
   - Dashboard shows 1 appointment (filtered for Dr. Harsh)
   - Stats show: 1 Today Appointments, 0 Completed, 1 Pending

### Test Case 3: Login with Unauthorized Doctor Credentials
1. Navigate to the login page
2. Select "Doctor" role
3. Enter credentials:
   - Email: `unauthorized@hospital.com`
   - Password: `anypassword`
4. Click "Login"
5. **Expected Result**: 
   - Error message: "Invalid details. Contact admin."
   - User remains on login page

### Test Case 4: Login with Wrong Password for Authorized Doctor
1. Navigate to the login page
2. Select "Doctor" role
3. Enter credentials:
   - Email: `dr.anamika@hospital.com`
   - Password: `wrongpassword`
4. Click "Login"
5. **Expected Result**: 
   - Error message: "Invalid details. Contact admin."
   - User remains on login page

### Test Case 5: Verify Appointment Filtering
1. Login as Dr. Anamika Singh (Cardiologist)
2. Check the appointments table
3. **Expected Result**: 
   - Should see 2 appointments:
     - Testpatient Patel (Cardiology)
     - Trith Shah (Cardiology)
   - Should NOT see appointments for other doctors

4. Logout and login as Dr. Prem Yadav (Pediatrician)
5. Check the appointments table
6. **Expected Result**: 
   - Should see 1 appointment:
     - 123 123 (Pediatrics)
   - Should NOT see cardiology appointments

## All Authorized Doctor Credentials

| Doctor Name | Email | Password | Department | Expected Appointments |
|-------------|-------|----------|------------|----------------------|
| Dr. Anamika Singh | dr.anamika@hospital.com | anamika123 | Cardiology | 2 |
| Dr. Harsh Mehta | dr.harsh@hospital.com | harsh123 | Endocrinology | 1 |
| Dr. Prem Yadav | dr.prem@hospital.com | prem123 | Pediatrics | 1 |
| Dr. Meenakshi Patel | dr.meenakshi@hospital.com | meenakshi123 | Neurology | 1 |
| Dr. Mukul Tyagi | dr.mukul@hospital.com | mukul123 | Surgery | 1 |
| Dr. Rossy Kumar | dr.rossy@hospital.com | rossy123 | General Medicine | 0 |

## Features to Verify

### 1. Doctor Dashboard Header
- Shows doctor's name in top-right corner
- User dropdown menu works
- Logout functionality works

### 2. Appointments Table
- Shows only appointments for logged-in doctor
- Doctor column shows logged-in doctor's name and email
- Patient information displays correctly
- Department badges match the doctor's specialty

### 3. Stats Cards
- "Today Appointments" count matches filtered appointments
- "Completed Today" shows ~60% of total
- "Pending" shows ~40% of total
- "Total Patients" shows 156 (static for now)

### 4. Navigation
- All sidebar menu items are clickable
- Active section is highlighted
- Logout button redirects to home page

## Common Issues and Solutions

### Issue: "Invalid details. Contact admin." for valid doctor
**Solution**: Check that the email and password exactly match the entries in `src/data/authorizedDoctors.json`

### Issue: Doctor sees all appointments instead of filtered ones
**Solution**: Verify that appointments in the data have the correct `doctorEmail` field matching the doctor's email

### Issue: Stats show wrong numbers
**Solution**: Stats are calculated based on filtered appointments. If no appointments match the doctor, stats will show 0.

## Next Steps for Production

1. Replace localStorage with proper backend API
2. Implement JWT token authentication
3. Hash passwords using bcrypt
4. Add password reset functionality
5. Implement real-time appointment updates
6. Add appointment management features (accept/reject/reschedule)
7. Connect to real patient database
8. Add audit logging for security
