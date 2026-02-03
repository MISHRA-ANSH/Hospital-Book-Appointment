export const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
};

export const formatTime = (date) => {
    return new Date(date).toTimeString().slice(0, 5);
};

export const isToday = (date) => {
    return formatDate(new Date()) === formatDate(date);
};

export const isPast = (date, time) => {
    const now = new Date();
    const checkDate = new Date(`${date}T${time}`);
    return checkDate < now;
};

export const isSameDay = (date1, date2) => {
    return formatDate(date1) === formatDate(date2);
};

export const addMinutes = (time, minutes) => {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins + minutes);
    return formatTime(date);
};
