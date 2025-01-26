import React, { useState, useRef } from 'react';
import { BsPlus } from 'react-icons/bs';

const StatusDropdown = ({ selectedStatus, onStatusChange, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const statuses = ['to-do', 'in-progress', 'completed'];

    return (
        <div className='status-dropdown' ref={dropdownRef}>
            <button
                className={`${selectedStatus ? "status-dropdown-btn-select" : "status-dropdown-btn"}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedStatus || <BsPlus fontSize={20} />}
            </button>
            {isOpen && (
                <div className='status-dropdown-menu'>
                    {statuses.map((status) => (
                        <button
                            key={status}
                            className={`status-dropdown-menu-item ${selectedStatus === status ? 'active' : ''}`}
                            onClick={() => {
                                onStatusChange(status);
                                setIsOpen(false);
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            )}
            {error && <small className='error-text'>{error}</small>}
        </div>
    );
};

export default StatusDropdown;