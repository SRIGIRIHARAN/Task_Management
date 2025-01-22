import React, { useEffect, useRef, useState } from 'react';
import sortImg from '../../../assests/images/sort-icon.svg';
import { IoChevronDown, IoReturnDownBack } from "react-icons/io5";
import { FaPlus } from 'react-icons/fa';
import calenderImg from '../../../assests/images/calender-icon.svg';
import { BsPlus } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ListView = () => {
    const [openDropdowns, setOpenDropdowns] = useState(['todo', 'in-progress', 'completed']);
    const [addTaskView, setAddTaskView] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [errors, setErrors] = useState({});
    const [addDrop, setAddDrop] = useState({
        dropdown1: false,
        dropdown2: false,
    });

    const dropdownRefs = {
        dropdown1: useRef(null),
        dropdown2: useRef(null),
    };

    const toggleDropdown = (section) => {
        setOpenDropdowns((prev) =>
            prev.includes(section)
                ? prev.filter((item) => item !== section)
                : [...prev, section]
        );
    };

    const toggleAddTaskView = () => {
        setAddTaskView(!addTaskView);
        setErrors({});
    };

    const toggleAddDrop = (key) => {
        setAddDrop((prev) => {
            const newState = Object.keys(prev).reduce((acc, dropdownKey) => {
                acc[dropdownKey] = dropdownKey === key ? !prev[key] : false;
                return acc;
            }, {});
            return newState;
        });
    };

    const handleClickOutside = (event) => {
        const isOutside = Object.entries(dropdownRefs).every(
            ([key, ref]) => !ref.current || !ref.current.contains(event.target)
        );

        if (isOutside) {
            setAddDrop({
                dropdown1: false,
                dropdown2: false,
            });
        }
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleAddTask = () => {
        const validationErrors = {};
        if (!taskTitle.trim()) validationErrors.title = 'Task title is required.';
        if (!selectedDate) validationErrors.date = 'Please select a date.';
        if (!selectedStatus) validationErrors.status = 'Please select a status.';
        if (!selectedCategory) validationErrors.category = 'Please select a category.';

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        const task = {
            title: taskTitle,
            date: selectedDate.toISOString().split('T')[0],
            status: selectedStatus,
            category: selectedCategory,
        };

        // Save to localStorage
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        localStorage.setItem('tasks', JSON.stringify([...existingTasks, task]));

        // Reset form
        setTaskTitle('');
        setSelectedDate(null);
        setSelectedStatus('');
        setSelectedCategory('');
        setAddTaskView(false);
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
                        className={`to-do-list-head ${openDropdowns.includes('todo') ? 'border-lr' : ''}`}
                        onClick={() => toggleDropdown('todo')}
                    >
                        Todo (0)
                        <IoChevronDown
                            className={`l-dropdown-icon ${openDropdowns.includes('todo') ? 'rotate' : ''}`}
                        />
                    </button>
                    {openDropdowns.includes('todo') && (
                        <div className='to-do-list-body show'>
                            <div className='to-do-body-add-task'>
                                <div className='to-do-body-add-task-head'>
                                    <button className='l-add-task-btn' onClick={toggleAddTaskView}>
                                        <FaPlus className='plus-icon' />add task
                                    </button>
                                </div>
                                {addTaskView && (
                                    <div className='to-do-body-add-task-body-wrapper'>
                                        <div className='to-do-body-add-task-body'>
                                            <input
                                                type='text'
                                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                                placeholder='Task Title'
                                                value={taskTitle}
                                                onChange={(e) => {
                                                    setTaskTitle(e.target.value);
                                                    setErrors((prev) => ({ ...prev, title: '' }));
                                                }}
                                                autoComplete='off'
                                            />
                                            {errors.title && <small className='error-text'>{errors.title}</small>}

                                            <button className='add-date'>
                                                <DatePicker
                                                    selected={selectedDate}
                                                    onChange={(date) => {
                                                        setSelectedDate(date);
                                                        setErrors((prev) => ({ ...prev, date: '' }));
                                                    }}
                                                    placeholderText=''
                                                    className={`add-date ${errors.date ? 'is-invalid' : ''}`}
                                                />
                                                add date
                                            </button>
                                            {errors.date && <small className='error-text'>{errors.date}</small>}

                                            <div className='status-dropdown' ref={dropdownRefs.dropdown1}>
                                                <button className='status-dropdown-btn' onClick={() => toggleAddDrop("dropdown1")}>
                                                    {selectedStatus || <BsPlus fontSize={20} />}
                                                </button>
                                                {addDrop.dropdown1 && (
                                                    <div className='status-dropdown-menu'>
                                                        {['to-do', 'in-progress', 'completed'].map((status) => (
                                                            <button
                                                                key={status}
                                                                className='status-dropdown-menu-item'
                                                                onClick={() => {
                                                                    setSelectedStatus(status);
                                                                    setAddDrop((prev) => ({ ...prev, dropdown1: false }));
                                                                    setErrors((prev) => ({ ...prev, status: '' }));
                                                                }}
                                                            >
                                                                {status}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {errors.status && <small className='error-text'>{errors.status}</small>}

                                            <div className='status-dropdown' ref={dropdownRefs.dropdown2}>
                                                <button className='status-dropdown-btn' onClick={() => toggleAddDrop("dropdown2")}>
                                                    {selectedCategory || <BsPlus fontSize={20} />}
                                                </button>
                                                {addDrop.dropdown2 && (
                                                    <div className='status-dropdown-menu'>
                                                        {['work', 'personal'].map((category) => (
                                                            <button
                                                                key={category}
                                                                className='status-dropdown-menu-item'
                                                                onClick={() => {
                                                                    setSelectedCategory(category);
                                                                    setAddDrop((prev) => ({ ...prev, dropdown2: false }));
                                                                    setErrors((prev) => ({ ...prev, category: '' }));
                                                                }}
                                                            >
                                                                {category}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {errors.category && <small className='error-text'>{errors.category}</small>}
                                        </div>
                                        <div className='to-do-body-add-task-button'>
                                            <button className='add-btn' onClick={handleAddTask}>
                                                Add <IoReturnDownBack />
                                            </button>
                                            <button className='cancel-btn' onClick={toggleAddTaskView}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='to-do-list-body-no-item'>
                                No Tasks in To-Do
                            </div>
                        </div>
                    )}
                </div>

                <div className='to-do-list'>
                    <button
                        className={`to-do-list-head in-progress ${openDropdowns.includes('in-progress') ? 'border-lr' : ''}`}
                        onClick={() => toggleDropdown('in-progress')}
                    >
                        In-Progress (3)
                        <IoChevronDown
                            className={`l-dropdown-icon ${openDropdowns.includes('in-progress') ? 'rotate' : ''}`}
                        />
                    </button>
                    {openDropdowns.includes('in-progress') && (
                        <div className='to-do-list-body show'>
                            <div className='to-do-list-body-no-item'>
                                No Tasks in Progress
                            </div>
                        </div>
                    )}
                </div>

                <div className='to-do-list'>
                    <button
                        className={`to-do-list-head completed  ${openDropdowns.includes('completed') ? 'border-lr' : ''}`}
                        onClick={() => toggleDropdown('completed')}
                    >
                        Completed (3)
                        <IoChevronDown
                            className={`l-dropdown-icon ${openDropdowns.includes('completed') ? 'rotate' : ''}`}
                        />
                    </button>
                    {openDropdowns.includes('completed') && (
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
