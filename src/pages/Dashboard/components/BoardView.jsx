import React, { useState, useEffect, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import editIcon from "../../../assests/images/edit-icon.svg";
import deleteIcon from "../../../assests/images/delete-icon.svg";

const BoardView = ({ handleOpen }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef({});


    const toggleDropdown = (taskId) => {
        setOpenDropdown((prev) => (prev === taskId ? null : taskId));
    };


    const handleClickOutside = (event) => {
        if (
            Object.values(dropdownRefs.current).some(
                (ref) => ref && ref.contains(event.target)
            )
        ) {
            return;
        }
        setOpenDropdown(null);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="board-view">
            <div className="row g-3 h-100">
                <div className="col-md-4">
                    <div className="board-view-inner">
                        <div className="board-view-inner-head">to-do</div>
                        <div className="board-view-inner-body">
                            {/* Task Card */}
                            <div className="board-view-task-card">
                                <div className="board-view-task-card-head">
                                    <h5 className="h-text-5">Task Title 1</h5>
                                    <div
                                        className="more-dropdown"
                                        ref={(el) => (dropdownRefs.current["task-1"] = el)}
                                    >
                                        <button
                                            className="more-dropdown-btn"
                                            onClick={() => toggleDropdown("task-1")}
                                        >
                                            <BsThreeDots />
                                        </button>
                                        {openDropdown === "task-1" && (
                                            <div className="more-dropdown-menu">
                                                <button className="more-dropdown-menu-item" onClick={() => handleOpen()}>
                                                    <img
                                                        src={editIcon}
                                                        width={16}
                                                        height={16}
                                                        alt="Edit_Icon"
                                                    />
                                                    Edit
                                                </button>
                                                <button className="more-dropdown-menu-item text-delete">
                                                    <img
                                                        src={deleteIcon}
                                                        width={16}
                                                        height={16}
                                                        alt="Delete_Icon"
                                                    />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="board-view-task-card-foot">
                                    <span className="s-text-3">Work</span>
                                    <span className="s-text-3">Today</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="board-view-inner">
                        <div className="board-view-inner-head in-progress">in-progress</div>
                        <div className="board-view-inner-body">
                            <div className="board-view-task-card">
                                <div className="board-view-task-card-head">
                                    <h5 className="h-text-5">Task Title 2</h5>
                                    <div
                                        className="more-dropdown"
                                        ref={(el) => (dropdownRefs.current["task-2"] = el)}
                                    >
                                        <button
                                            className="more-dropdown-btn"
                                            onClick={() => toggleDropdown("task-2")}
                                        >
                                            <BsThreeDots />
                                        </button>
                                        {openDropdown === "task-2" && (
                                            <div className="more-dropdown-menu">
                                                <button className="more-dropdown-menu-item" onClick={() => handleOpen()}>
                                                    <img
                                                        src={editIcon}
                                                        width={16}
                                                        height={16}
                                                        alt="Edit_Icon"
                                                    />
                                                    Edit
                                                </button>
                                                <button className="more-dropdown-menu-item text-delete">
                                                    <img
                                                        src={deleteIcon}
                                                        width={16}
                                                        height={16}
                                                        alt="Delete_Icon"
                                                    />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="board-view-task-card-foot">
                                    <span className="s-text-3">Work</span>
                                    <span className="s-text-3">Tomorrow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="board-view-inner">
                        <div className="board-view-inner-head completed">completed</div>
                        <div className="board-view-inner-body">
                            <div className="board-view-task-card">
                                <div className="board-view-task-card-head">
                                    <h5 className="h-text-5">Task Title 3</h5>
                                    <div
                                        className="more-dropdown"
                                        ref={(el) => (dropdownRefs.current["task-3"] = el)}
                                    >
                                        <button
                                            className="more-dropdown-btn"
                                            onClick={() => toggleDropdown("task-3")}
                                        >
                                            <BsThreeDots />
                                        </button>
                                        {openDropdown === "task-3" && (
                                            <div className="more-dropdown-menu">
                                                <button className="more-dropdown-menu-item" onClick={() => handleOpen()}>
                                                    <img
                                                        src={editIcon}
                                                        width={16}
                                                        height={16}
                                                        alt="Edit_Icon"
                                                    />
                                                    Edit
                                                </button>
                                                <button className="more-dropdown-menu-item text-delete">
                                                    <img
                                                        src={deleteIcon}
                                                        width={16}
                                                        height={16}
                                                        alt="Delete_Icon"
                                                    />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="board-view-task-card-foot">
                                    <span className="s-text-3">Work</span>
                                    <span className="s-text-3">Next Week</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardView;
