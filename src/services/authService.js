/**
 * Authentication Service
 * Handles user authentication and session management with localStorage
 */

const USERS_KEY = 'hospitalUsers';
const CURRENT_USER_KEY = 'currentUser';

/**
 * Register a new user
 */
export const registerUser = (userData) => {
    try {
        const users = getUsers();

        // Check if email already exists
        if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
            return {
                success: false,
                message: 'Email already registered'
            };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            password: userData.password,
            gender: userData.gender,
            role: userData.role || 'patient',
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        return {
            success: true,
            user: newUser,
            message: 'Registration successful'
        };
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            message: 'Registration failed'
        };
    }
};

/**
 * Login user
 */
export const loginUser = (email, password, role = 'patient') => {
    try {
        const users = getUsers();
        const user = users.find(u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password &&
            u.role === role
        );

        if (user) {
            // Store current user session (without password)
            const userSession = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                gender: user.gender,
                role: user.role
            };

            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));

            return {
                success: true,
                user: userSession,
                message: 'Login successful'
            };
        }

        return {
            success: false,
            message: 'Invalid email or password'
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'Login failed'
        };
    }
};

/**
 * Logout user
 */
export const logoutUser = () => {
    try {
        localStorage.removeItem(CURRENT_USER_KEY);
        // Force reload to clear any cached state
        setTimeout(() => {
            window.location.reload();
        }, 100);
        return {
            success: true,
            message: 'Logout successful'
        };
    } catch (error) {
        console.error('Logout error:', error);
        return {
            success: false,
            message: 'Logout failed'
        };
    }
};

/**
 * Get current logged in user
 */
export const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem(CURRENT_USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
};

/**
 * Check if user is logged in
 */
export const isAuthenticated = () => {
    return getCurrentUser() !== null;
};

/**
 * Get all users (for admin purposes)
 */
export const getUsers = () => {
    try {
        const usersStr = localStorage.getItem(USERS_KEY);
        return usersStr ? JSON.parse(usersStr) : [];
    } catch (error) {
        console.error('Get users error:', error);
        return [];
    }
};

/**
 * Update user profile
 */
export const updateUserProfile = (userId, updates) => {
    try {
        const users = getUsers();
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return {
                success: false,
                message: 'User not found'
            };
        }

        // Update user data
        users[userIndex] = {
            ...users[userIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        // Update current user session if it's the same user
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.id === userId) {
            const updatedSession = {
                ...currentUser,
                ...updates
            };
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedSession));
        }

        return {
            success: true,
            user: users[userIndex],
            message: 'Profile updated successfully'
        };
    } catch (error) {
        console.error('Update profile error:', error);
        return {
            success: false,
            message: 'Update failed'
        };
    }
};

/**
 * Change password
 */
export const changePassword = (userId, oldPassword, newPassword) => {
    try {
        const users = getUsers();
        const user = users.find(u => u.id === userId);

        if (!user) {
            return {
                success: false,
                message: 'User not found'
            };
        }

        if (user.password !== oldPassword) {
            return {
                success: false,
                message: 'Current password is incorrect'
            };
        }

        // Update password
        user.password = newPassword;
        user.updatedAt = new Date().toISOString();

        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        return {
            success: true,
            message: 'Password changed successfully'
        };
    } catch (error) {
        console.error('Change password error:', error);
        return {
            success: false,
            message: 'Password change failed'
        };
    }
};

export default {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    isAuthenticated,
    getUsers,
    updateUserProfile,
    changePassword
};
