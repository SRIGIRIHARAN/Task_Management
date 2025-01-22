import React, { useState, useRef, useEffect } from "react";
import listViewIcon from "../../assests/images/list-view-icon.svg";
import boardViewIcon from "../../assests/images/board-view-icon.svg";
import ListView from "./components/ListView";
import BoardView from "./components/BoardView";
import { IoChevronDown } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import AddTaskModal from "../../components/ui/AddTaskModal/AddTaskModal";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("list");
    const [dropdown, setDropdown] = useState(null);
    const [addTaskModal, setAddTaskModal] = useState(false);

    const toggleAddTaskModal = (isOpen) => setAddTaskModal(isOpen);

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

                    <div className="filter-dropdown" >
                        <button
                            className="filter-dropdown-btn"
                            onClick={() =>
                                setDropdown(dropdown === "category" ? null : "category")
                            }
                        >
                            Category <IoChevronDown className={`dropdown-icon ${dropdown === "category" ? 'rotate' : ''}`} />
                        </button>
                        {dropdown === "category" && (
                            <div className={`filter-dropdown-menu ${dropdown === "category" ? 'show' : ''}`}>
                                <button className="filter-dropdown-menu-item">Work</button>
                                <button className="filter-dropdown-menu-item">Personal</button>
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
                            Due Date <IoChevronDown className={`dropdown-icon ${dropdown === "date" ? 'rotate' : ''}`} />
                        </button>
                        {dropdown === "date" && (
                            <div className={`filter-dropdown-menu ${dropdown === "date" ? 'show' : ''}`}>
                                <button className="filter-dropdown-menu-item">Today</button>
                                <button className="filter-dropdown-menu-item">Tomorrow</button>
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
                {activeTab === "board" && <BoardView />}
            </div>
            <AddTaskModal show={addTaskModal} handleClose={() => toggleAddTaskModal(false)} />
        </div>
    );
};

export default Dashboard;
