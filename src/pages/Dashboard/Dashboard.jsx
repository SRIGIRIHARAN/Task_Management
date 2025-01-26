import React, { useState, useRef, useEffect } from "react";
import listViewIcon from "../../assests/images/list-view-icon.svg";
import boardViewIcon from "../../assests/images/board-view-icon.svg";
import ListView from "./components/ListView";
import BoardView from "./components/BoardView";
import { IoChevronDown } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import AddTaskModal from "../../components/ui/AddTaskModal/AddTaskModal";
import UpdateTaskModal from "../../components/ui/UpdateTaskModal/UpdateTaskModal";

const Dashboard = () => {
    const [taskData, setTaskData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [activeTab, setActiveTab] = useState("list");
    const [dropdown, setDropdown] = useState(null);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [updateTaskModal, setUpdateTaskModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [selectedDate, setSelectedDate] = useState("Due Date");
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        setTaskData(storedTasks);
    }, [refreshTrigger]);

    const toggleAddTaskModal = (isOpen) => setAddTaskModal(isOpen);

    const toggleUpdateTaskModal = (isOpen) => setUpdateTaskModal(isOpen);

    const handleEdit = (task) => {
        setSelectedTask(task);
        toggleUpdateTaskModal(true);
    };

    const dropdownRef = useRef(null);

    const handleTaskAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleUpdate = (updatedTask) => {
        const updatedTasks = taskData.map(task =>
            task.title === updatedTask.title ? updatedTask : task
        );
        setTaskData(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        toggleUpdateTaskModal(false);
    };

    return (
        <div className="dashboard">
            <div className="dashboard-view mobile-hide">
                <button
                    className={`view-btn ${activeTab === "list" ? "active" : ""}`}
                    onClick={() => setActiveTab("list")}
                >
                    <img src={listViewIcon} width={16} height={16} alt="List_View_Icon" />
                    List
                </button>

                <button
                    className={`view-btn ${activeTab === "board" ? "active" : ""}`}
                    onClick={() => setActiveTab("board")}
                >
                    <img src={boardViewIcon} width={16} height={16} alt="Board_View_Icon" />
                    Board
                </button>
            </div>
            <div className="dashboard-header" ref={dropdownRef}>
                <button className="add-task-btn desktop-hide tab-hide" onClick={() => toggleAddTaskModal(true)}>Add Task</button>
                <div className="dashboard-header-left">
                    <p className="p-text-2">Filter by:</p>

                    <div className="filter-dropdown">
                        <button
                            className="filter-dropdown-btn"
                            onClick={() =>
                                setDropdown(dropdown === "category" ? null : "category")
                            }
                        >
                            {selectedCategory} <IoChevronDown className={`dropdown-icon ${dropdown === "category" ? 'rotate' : ''}`} />
                        </button>
                        {dropdown === "category" && (
                            <div className={`filter-dropdown-menu ${dropdown === "category" ? 'show' : ''}`}>
                                <button
                                    className={`filter-dropdown-menu-item ${selectedCategory === "Work" ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedCategory("Work");
                                        setDropdown(null);
                                    }}
                                >
                                    Work
                                </button>
                                <button
                                    className={`filter-dropdown-menu-item ${selectedCategory === "Personal" ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedCategory("Personal");
                                        setDropdown(null);
                                    }}
                                >
                                    Personal
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="filter-dropdown">
                        <button
                            className="filter-dropdown-btn"
                            onClick={() =>
                                setDropdown(dropdown === "date" ? null : "date")
                            }
                        >
                            {selectedDate} <IoChevronDown className={`dropdown-icon ${dropdown === "date" ? 'rotate' : ''}`} />
                        </button>
                        {dropdown === "date" && (
                            <div className={`filter-dropdown-menu ${dropdown === "date" ? 'show' : ''}`}>
                                <button
                                    className={`filter-dropdown-menu-item ${selectedDate === "Today" ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedDate("Today");
                                        setDropdown(null);
                                    }}
                                >
                                    Today
                                </button>
                                <button
                                    className={`filter-dropdown-menu-item ${selectedDate === "Tomorrow" ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedDate("Tomorrow");
                                        setDropdown(null);
                                    }}
                                >
                                    Tomorrow
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="dashboard-header-right">
                    <div className="input-group">
                        <span className="input-group-text"><LuSearch /></span>
                        <input type="text" className="form-control" placeholder="Search" autoComplete="off" />
                    </div>
                    <button className="add-task-btn mobile-hide" onClick={() => toggleAddTaskModal(true)}>Add Task</button>
                </div>
            </div>

            <div className="dashboard-content">
                {activeTab === "list" && <ListView handleOpen={() => toggleUpdateTaskModal(true)} refreshTrigger={refreshTrigger} taskData={taskData} onTaskAdded={handleTaskAdded} handleEdit={handleEdit} />}
                {activeTab === "board" && <BoardView handleOpen={() => toggleUpdateTaskModal(true)} />}
            </div>
            <AddTaskModal show={addTaskModal} handleClose={() => toggleAddTaskModal(false)} onTaskAdded={handleTaskAdded} />
            <UpdateTaskModal show={updateTaskModal} handleClose={() => toggleUpdateTaskModal(false)} selectedTask={selectedTask} handleUpdate={handleUpdate} />
        </div>
    );
};

export default Dashboard;
