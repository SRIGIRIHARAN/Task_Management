import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoReturnDownBack } from "react-icons/io5";
import DatePicker from './DatePicker';
import StatusDropdown from './StatusDropdown';
import CategoryDropdown from './CategoryDropdown';

const AddTask = ({ onTaskAdded }) => {
    const [addTaskView, setAddTaskView] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [errors, setErrors] = useState({});

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
            id: Date.now(),
            title: taskTitle,
            date: selectedDate,
            status: selectedStatus,
            category: selectedCategory,
        };

        const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        localStorage.setItem('tasks', JSON.stringify([...existingTasks, task]));

        handleCancelTask();
        onTaskAdded();
    };

    const handleCancelTask = () => {
        setTaskTitle('');
        setSelectedDate(null);
        setSelectedStatus('');
        setSelectedCategory('');
        setAddTaskView(false);
    };

    return (
        <div className='to-do-body-add-task mobile-hide'>
            <div className='to-do-body-add-task-head'>
                <button className='l-add-task-btn' onClick={() => setAddTaskView(!addTaskView)}>
                    <FaPlus className='plus-icon' />add task
                </button>
            </div>
            {addTaskView && (
                <div className='to-do-body-add-task-body-wrapper'>
                    <div className='to-do-body-add-task-body'>
                        <div className='row w-100'>
                            <div className='col-3'>
                                <input
                                    type='text'
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    placeholder='Task Title'
                                    value={taskTitle}
                                    onChange={(e) => {
                                        setTaskTitle(e.target.value);
                                        setErrors(prev => ({ ...prev, title: '' }));
                                    }}
                                    autoComplete='off'
                                />
                                {errors.title && <small className='error-text'>{errors.title}</small>}
                            </div>
                            <div className='col-3'>
                                <DatePicker
                                    selectedDate={selectedDate}
                                    onDateChange={(date) => {
                                        setSelectedDate(date);
                                        setErrors(prev => ({ ...prev, date: '' }));
                                    }}
                                    error={errors.date}
                                />
                            </div>
                            <div className='col-3'>
                                <StatusDropdown
                                    selectedStatus={selectedStatus}
                                    onStatusChange={(status) => {
                                        setSelectedStatus(status);
                                        setErrors(prev => ({ ...prev, status: '' }));
                                    }}
                                    error={errors.status}
                                />
                            </div>
                            <div className='col-3'>
                                <CategoryDropdown
                                    selectedCategory={selectedCategory}
                                    onCategoryChange={(category) => {
                                        setSelectedCategory(category);
                                        setErrors(prev => ({ ...prev, category: '' }));
                                    }}
                                    error={errors.category}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='to-do-body-add-task-button'>
                        <button className='add-btn' onClick={handleAddTask}>
                            Add <IoReturnDownBack />
                        </button>
                        <button className='cancel-btn' onClick={handleCancelTask}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTask;