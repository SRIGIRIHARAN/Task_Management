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
    const [activeTab, setActiveTab] = useState("list");
    const [dropdown, setDropdown] = useState(null);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [updateTaskModal, setUpdateTaskModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [selectedDate, setSelectedDate] = useState("Due Date");

    const toggleAddTaskModal = (isOpen) => setAddTaskModal(isOpen);

    const toggleUpdateTaskModal = (isOpen) => setUpdateTaskModal(isOpen);

    const dropdownRef = useRef(null);

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

    return (
        <div className="dashboard">
            <div className="dashboard-view">
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
                    <button className="add-task-btn" onClick={() => toggleAddTaskModal(true)}>Add Task</button>
                </div>
            </div>

            <div className="dashboard-content">
                {activeTab === "list" && <ListView />}
                {activeTab === "board" && <BoardView handleOpen={() => toggleUpdateTaskModal(true)} />}
            </div>
            <AddTaskModal show={addTaskModal} handleClose={() => toggleAddTaskModal(false)} />
            <UpdateTaskModal show={updateTaskModal} handleClose={() => toggleUpdateTaskModal(false)} />
        </div>
    );
};

export default Dashboard;
