import { LOCAL_STORAGE_KEYS } from '../utils/constants';

export const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
};

export const loadFromLocalStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
};

export const clearLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
    }
};

export const initializeStorage = () => {
    const keys = Object.values(LOCAL_STORAGE_KEYS);
    keys.forEach(key => {
        if (!localStorage.getItem(key)) {
            saveToLocalStorage(key, []);
        }
    });
};
