import React from 'react';
import calenderImg from '../../../assests/images/calender-icon.svg';

const DatePicker = ({ selectedDate, onDateChange, error }) => {
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <div>
            <button
                className={`add-date ${selectedDate ? "add-date-select" : ""}`}
                onClick={() => document.getElementById('datePicker')?.click()}
            >
                <img src={calenderImg} width={18} height={18} alt="Calender Icon" />
                {selectedDate === getTodayDate() ? 'Today' : selectedDate || 'Add Date'}
                <input
                    type="date"
                    id="datePicker"
                    value={selectedDate || ''}
                    className="form-control custom-add-date"
                    onChange={(e) => onDateChange(e.target.value)}
                />
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default DatePicker;