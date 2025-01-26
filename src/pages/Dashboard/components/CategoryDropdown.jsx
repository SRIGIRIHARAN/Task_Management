import React, { useState, useRef } from 'react';
import { BsPlus } from 'react-icons/bs';

const CategoryDropdown = ({ selectedCategory, onCategoryChange, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const categories = ['work', 'personal'];

    return (
        <div className='status-dropdown' ref={dropdownRef}>
            <button
                className={`${selectedCategory ? "status-dropdown-btn-select bg-none" : "status-dropdown-btn"}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedCategory || <BsPlus fontSize={20} />}
            </button>
            {isOpen && (
                <div className='status-dropdown-menu c-height'>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`status-dropdown-menu-item ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => {
                                onCategoryChange(category);
                                setIsOpen(false);
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}
            {error && <small className='error-text'>{error}</small>}
        </div>
    );
};

export default CategoryDropdown;