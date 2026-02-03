import React from 'react';
import './Input.css';

export const Input = ({ label, type = 'text', value, onChange, placeholder, required = false }) => {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <input
                type={type}
                className="input-field"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};
