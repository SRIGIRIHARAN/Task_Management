import React, { useRef, useState, useEffect } from "react";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { BsCheckCircleFill } from "react-icons/bs";
import TaskDropdown from "./TaskDropdown";
import MoreDropdown from "./MoreDropdown";
import deleteIcon from '../../../assests/images/delete-icon.svg';

const TaskList = ({ tasks, handleOpen, onTaskAdded, handleEdit }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const dropdownRefs = useRef([]);

    const handleOutsideClick = (e) => {
        if (
            dropdownRefs.current.every(
                (ref) => ref && !ref.contains(e.target)
            )
        ) {
            setOpenDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const handleDropdownToggle = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const handleStatusChange = (taskId, newStatus) => {
        const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const updatedTasks = existingTasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        onTaskAdded();
    };

    const handleCheckboxChange = (taskId) => {
        setSelectedTasks(prev => {
            if (prev.includes(taskId)) {
                return prev.filter(id => id !== taskId);
            } else {
                return [...prev, taskId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedTasks.length === tasks.length) {
            setSelectedTasks([]);
        } else {
            setSelectedTasks(tasks.map(task => task.id));
        }
    };

    const handleBulkDelete = () => {
        if (selectedTasks.length === 0) return;

        const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const updatedTasks = existingTasks.filter(
            (task) => !selectedTasks.includes(task.id)
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setSelectedTasks([]);
        onTaskAdded();
    };

    return (
        <div className="task-list-container w-100">
            {selectedTasks.length > 0 && (
                <div className="delete-container">
                    <div className="delete-container-item">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedTasks.length === tasks.length}
                            onChange={handleSelectAll}
                        />
                        <span className="p-text-3">
                            {selectedTasks.length} selected
                        </span>
                    </div>
                    {selectedTasks.length > 0 && (
                        <button
                            onClick={handleBulkDelete}
                            className="delete-btn"
                        >
                            <img src={deleteIcon} width={16} height={16} alt="Edit_Icon" />
                        </button>
                    )}
                </div>
            )}
            {tasks.map((task, index) => (
                <div
                    className={`to-do-list-bod-item transition-colors ${selectedTasks.includes(task.id) ? 'bg-blue-50' : ''
                        }`}
                    key={task.id || index}
                >
                    <div className="row h-100">
                        <div className="col-md-3">
                            <div className="to-do-list-bod-item-1">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`flexCheckDefault-${task.id}`}
                                    checked={selectedTasks.includes(task.id)}
                                    onChange={() => handleCheckboxChange(task.id)}
                                />
                                <PiDotsSixVerticalBold className="select-icon" />
                                <BsCheckCircleFill className="select-icon" />
                                <p className="p-text-3">{task.title}</p>
                            </div>
                        </div>
                        <div className="col-3 mobile-hide">
                            <div className="to-do-list-bod-item-1">
                                <p className="p-text-3">{task.date || task.startDate}</p>
                            </div>
                        </div>
                        <div className="col-3 mobile-hide">
                            <div className="to-do-list-bod-item-1">
                                <TaskDropdown
                                    status={task.status}
                                    onStatusChange={(newStatus) =>
                                        handleStatusChange(task.id, newStatus)
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-3 mobile-hide">
                            <div className="to-do-list-bod-item-1 justify-content-between">
                                <p className="p-text-3">{task.category}</p>
                                <MoreDropdown
                                    isOpen={openDropdown === index}
                                    onToggle={() => handleDropdownToggle(index)}
                                    onEdit={() => handleEdit(task)}
                                    onDelete={() => {
                                        const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
                                        const updatedTasks = existingTasks.filter(
                                            (t) => t.id !== task.id
                                        );
                                        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
                                        onTaskAdded();
                                    }}
                                    ref={(el) => (dropdownRefs.current[index] = el)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;