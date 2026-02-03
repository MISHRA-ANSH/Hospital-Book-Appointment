export const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const filterByDate = (items, date) => {
    return items.filter(item => item.date === date);
};

export const filterByStatus = (items, status) => {
    return items.filter(item => item.status === status);
};

export const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) result[group] = [];
        result[group].push(item);
        return result;
    }, {});
};
