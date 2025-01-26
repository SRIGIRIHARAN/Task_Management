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
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        setTaskData(storedTasks);
    }, [refreshTrigger]);

    const searchInTask = (task, query) => {
        const searchTerm = query.toLowerCase();
        const taskDate = task.date || task.startDate;
        
        const titleMatch = task.title?.toLowerCase().includes(searchTerm);
        
        const dateMatch = taskDate?.toLowerCase().includes(searchTerm);
        
        const statusMatch = task.status?.toLowerCase().includes(searchTerm);
        
        const categoryMatch = task.category?.toLowerCase().includes(searchTerm);
        
        return titleMatch || dateMatch || statusMatch || categoryMatch;
    };

    useEffect(() => {
        let filtered = [...taskData]; 

        if (selectedCategory !== "Category") {
            filtered = filtered.filter(task => task.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        if (selectedDate !== "Due Date") {
            const today = new Date().toISOString().split('T')[0];
            const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
            
            filtered = filtered.filter(task => {
                const taskDate = task.date || task.startDate;
                if (selectedDate === "Today") {
                    return taskDate === today;
                } else if (selectedDate === "Tomorrow") {
                    return taskDate === tomorrow;
                }
                return true;
            });
        }

        if (searchQuery) {
            filtered = filtered.filter(task => searchInTask(task, searchQuery));
        }

        setFilteredTasks(filtered);
    }, [taskData, selectedCategory, selectedDate, searchQuery]);

    const toggleAddTaskModal = (isOpen) => setAddTaskModal(isOpen);
    const toggleUpdateTaskModal = (isOpen) => setUpdateTaskModal(isOpen);
    
    const handleEdit = (task) => {
        setSelectedTask(task);
        toggleUpdateTaskModal(true);
    };

    const handleTaskAdded = () => setRefreshTrigger(prev => prev + 1);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
            task.id === updatedTask.id ? updatedTask : task
        );
        setTaskData(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        toggleUpdateTaskModal(false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setDropdown(null);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setDropdown(null);
    };

    const handleClearFilters = () => {
        setSelectedCategory("Category");
        setSelectedDate("Due Date");
        setSearchQuery("");
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
                            onClick={() => setDropdown(dropdown === "category" ? null : "category")}
                        >
                            {selectedCategory} <IoChevronDown className={`dropdown-icon ${dropdown === "category" ? 'rotate' : ''}`} />
                        </button>
                        {dropdown === "category" && (
                            <div className={`filter-dropdown-menu ${dropdown === "category" ? 'show' : ''}`}>
                                <button
                                    className={`filter-dropdown-menu-item ${selectedCategory === "Work" ? 'active' : ''}`}
                                    onClick={() => handleCategorySelect("Work")}
                                >
                                    Work
                                </button>
                                <button
                                    className={`filter-dropdown-menu-item ${selectedCategory === "Personal" ? 'active' : ''}`}
                                    onClick={() => handleCategorySelect("Personal")}
                                >
                                    Personal
                                </button>
                                {selectedCategory !== "Category" && (
                                    <button
                                        className="filter-dropdown-menu-item"
                                        onClick={() => handleCategorySelect("Category")}
                                    >
                                        Clear Filter
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="filter-dropdown">
                        <button
                            className="filter-dropdown-btn"
                            onClick={() => setDropdown(dropdown === "date" ? null : "date")}
                        >
                            {selectedDate} <IoChevronDown className={`dropdown-icon ${dropdown === "date" ? 'rotate' : ''}`} />
                        </button>
                        {dropdown === "date" && (
                            <div className={`filter-dropdown-menu ${dropdown === "date" ? 'show' : ''}`}>
                                <button
                                    className={`filter-dropdown-menu-item ${selectedDate === "Today" ? 'active' : ''}`}
                                    onClick={() => handleDateSelect("Today")}
                                >
                                    Today
                                </button>
                                <button
                                    className={`filter-dropdown-menu-item ${selectedDate === "Tomorrow" ? 'active' : ''}`}
                                    onClick={() => handleDateSelect("Tomorrow")}
                                >
                                    Tomorrow
                                </button>
                                {selectedDate !== "Due Date" && (
                                    <button
                                        className="filter-dropdown-menu-item"
                                        onClick={() => handleDateSelect("Due Date")}
                                    >
                                        Clear Filter
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {(selectedCategory !== "Category" || selectedDate !== "Due Date" || searchQuery) && (
                        <button
                            className="filter-dropdown-btn"
                            onClick={handleClearFilters}
                        >
                            Clear All Filters
                        </button>
                    )}
                </div>

                <div className="dashboard-header-right">
                    <div className="input-group">
                        <span className="input-group-text"><LuSearch /></span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search tasks by title, date, status, or category"
                            autoComplete="off"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="add-task-btn mobile-hide" onClick={() => toggleAddTaskModal(true)}>Add Task</button>
                </div>
            </div>

            <div className="dashboard-content">
                {activeTab === "list" && (
                    <ListView 
                        handleOpen={handleEdit} 
                        taskData={filteredTasks} 
                        onTaskAdded={handleTaskAdded} 
                        handleEdit={handleEdit}
                    />
                )}
                {activeTab === "board" && (
                    <BoardView 
                        handleOpen={handleEdit} 
                        taskData={filteredTasks} 
                        onTaskAdded={handleTaskAdded} 
                    />
                )}
            </div>
            <AddTaskModal 
                show={addTaskModal} 
                handleClose={() => toggleAddTaskModal(false)} 
                onTaskAdded={handleTaskAdded} 
            />
            <UpdateTaskModal 
                show={updateTaskModal} 
                handleClose={() => toggleUpdateTaskModal(false)} 
                selectedTask={selectedTask} 
                handleUpdate={handleUpdate} 
            />
        </div>
    );
};

export default Dashboard;