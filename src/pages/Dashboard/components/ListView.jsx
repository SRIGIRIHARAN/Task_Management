import React, { useState, useEffect } from 'react';
import TaskSection from './TaskSection';

const ListView = ({ handleOpen, onTaskAdded, taskData, handleEdit }) => {
    const [openDropdowns, setOpenDropdowns] = useState(['todo', 'in-progress', 'completed']);

    const toggleDropdown = (section) => {
        setOpenDropdowns((prev) =>
            prev.includes(section)
                ? prev.filter((item) => item !== section)
                : [...prev, section]
        );
    };

    const mapStatus = (status) => {
        const statusMap = {
            'todo': 'to-do',
            'in-progress': 'in-progress',
            'completed': 'completed'
        };
        return statusMap[status] || status;
    };

    return (
        <div className='list-view'>
            <ListViewHeader />
            <div className='list-view-body'>
                <TaskSection
                    title="Todo"
                    type="todo"
                    tasks={taskData.filter(task => task.status === mapStatus('todo'))}
                    isOpen={openDropdowns.includes('todo')}
                    onToggle={() => toggleDropdown('todo')}
                    handleOpen={handleOpen}
                    onTaskAdded={onTaskAdded}
                    handleEdit={handleEdit}
                />
                <TaskSection
                    title="In-Progress"
                    type="in-progress"
                    tasks={taskData.filter(task => task.status === mapStatus('in-progress'))}
                    isOpen={openDropdowns.includes('in-progress')}
                    onToggle={() => toggleDropdown('in-progress')}
                    handleOpen={handleOpen}
                    onTaskAdded={onTaskAdded}
                    handleEdit={handleEdit}
                />
                <TaskSection
                    title="Completed"
                    type="completed"
                    tasks={taskData.filter(task => task.status === mapStatus('completed'))}
                    isOpen={openDropdowns.includes('completed')}
                    onToggle={() => toggleDropdown('completed')}
                    handleOpen={handleOpen}
                    onTaskAdded={onTaskAdded}
                    handleEdit={handleEdit}
                />
            </div>
        </div>
    );
};

const ListViewHeader = () => (
    <div className='list-view-head mobile-hide'>
        <div className='row'>
            <div className='col-md-3'>
                <span className='s-text-1'>Task name</span>
            </div>
            <div className='col-md-3'>
                <span className='s-text-1'>Due on</span>
            </div>
            <div className='col-md-3'>
                <span className='s-text-1'>Task Status</span>
            </div>
            <div className='col-md-3'>
                <span className='s-text-1'>Task Category</span>
            </div>
        </div>
    </div>
);

export default ListView;