import React, { useState } from 'react';
import sortImg from '../../../assests/images/sort-icon.svg';
import { IoChevronDown } from "react-icons/io5";

const ListView = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (section) => {
        setOpenDropdown((prev) => (prev === section ? null : section));
    };

    return (
        <div className='list-view'>
            <div className='list-view-head'>
                <span className='s-text-1'>Task name</span>
                <span className='s-text-1'>
                    Due on
                    <img src={sortImg} width={8} height={8} alt='Sort_Image' />
                </span>
                <span className='s-text-1'>Task Status</span>
                <span className='s-text-1'>Task Category</span>
                <span className='s-text-1 vis-hide'>Task Category</span>
            </div>
            <div className='list-view-body'>
                <div className='to-do-list'>
                    <button
                        className={`to-do-list-head ${openDropdown === 'todo' ? 'border-lr' : ''}`}
                        onClick={() => toggleDropdown('todo')}
                    >
                        Todo (0)
                        <IoChevronDown className={`l-dropdown-icon ${openDropdown === 'todo' ? 'rotate' : ''}`} />
                    </button>
                    {openDropdown === 'todo' && (
                        <div className='to-do-list-body show'>
                            <div className='to-do-list-body-no-item'>
                                No Tasks in To-Do
                            </div>
                        </div>
                    )}
                </div>

                <div className='to-do-list'>
                    <button
                        className={`to-do-list-head in-progress ${openDropdown === 'in-progress' ? 'border-lr' : ''}`}
                        onClick={() => toggleDropdown('in-progress')}
                    >
                        In-Progress (3)
                        <IoChevronDown className={`l-dropdown-icon ${openDropdown === 'in-progress' ? 'rotate' : ''}`} />
                    </button>
                    {openDropdown === 'in-progress' && (
                        <div className='to-do-list-body show'>
                            <div className='to-do-list-body-no-item'>
                                No Tasks in Progress
                            </div>
                        </div>
                    )}
                </div>

                <div className='to-do-list'>
                    <button
                        className={`to-do-list-head completed ${openDropdown === 'completed' ? 'border-lr' : ''}`}
                        onClick={() => toggleDropdown('completed')}
                    >
                        Completed (3)
                        <IoChevronDown className={`l-dropdown-icon ${openDropdown === 'completed' ? 'rotate' : ''}`} />
                    </button>
                    {openDropdown === 'completed' && (
                        <div className='to-do-list-body show'>
                            <div className='to-do-list-body-no-item'>
                                No Tasks in Completed
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListView;
