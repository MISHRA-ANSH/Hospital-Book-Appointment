import React from 'react';
import './Select.css';

export const Select = ({ label, value, onChange, options, placeholder }) => {
    return (
        <div className="select-group">
            {label && <label className="select-label">{label}</label>}
            <select className="select-field" value={value} onChange={onChange}>
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
