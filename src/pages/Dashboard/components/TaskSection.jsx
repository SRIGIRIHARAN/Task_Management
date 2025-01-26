import React from 'react';
import { IoChevronDown } from "react-icons/io5";
import TaskList from './TaskList';
import AddTask from './AddTask';

const TaskSection = ({ title, type, tasks, isOpen, onToggle, handleOpen, onTaskAdded, handleEdit }) => {
    return (
        <div className='to-do-list'>
            <button
                className={`to-do-list-head ${type} ${isOpen ? 'border-lr' : ''}`}
                onClick={onToggle}
            >
                {title} ({tasks.length})
                <IoChevronDown className={`l-dropdown-icon ${isOpen ? 'rotate' : ''}`} />
            </button>
            {isOpen && (
                <div className='to-do-list-body show'>
                    {type === 'todo' && <AddTask onTaskAdded={onTaskAdded} />}
                    <TaskList tasks={tasks} handleOpen={handleOpen} onTaskAdded={onTaskAdded} handleEdit={handleEdit} />
                    {tasks.length === 0 && (
                        <div className='to-do-list-body-no-item'>
                            No Tasks in {title}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskSection;