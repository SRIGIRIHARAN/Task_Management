import React, { useState, useEffect, useRef } from "react";

const TaskDropdown = ({ status, onStatusChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const statuses = ["to-do", "in-progress", "completed"];

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <div className="status-dropdown" ref={dropdownRef}>
            <button
                className="status-dropdown-btn-select"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {status}
            </button>
            {isOpen && (
                <div className="status-dropdown-menu">
                    {statuses.map((statusOption) => (
                        <button
                            key={statusOption}
                            className={`status-dropdown-menu-item ${status === statusOption ? "active" : ""
                                }`}
                            onClick={() => {
                                onStatusChange(statusOption);
                                setIsOpen(false);
                            }}
                        >
                            {statusOption}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskDropdown;
