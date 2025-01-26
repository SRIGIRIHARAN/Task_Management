import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BsThreeDots } from "react-icons/bs";
import editIcon from "../../../assests/images/edit-icon.svg";
import deleteIcon from "../../../assests/images/delete-icon.svg";

const BoardView = ({ taskData, handleOpen, onTaskAdded }) => {
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

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) {
            return;
        }

        const updatedTask = { ...taskData.find((task) => task.id === draggableId), status: destination.droppableId };

        const updatedTasks = taskData.map((task) =>
            task.id === draggableId ? updatedTask : task
        );

    };

    const renderTaskCard = (task, index) => (
        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
            {(provided) => (
                <div
                    className="board-view-task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="board-view-task-card-head">
                        <h5 className="h-text-5">{task.title}</h5>
                        <div
                            className="more-dropdown"
                            ref={(el) => (dropdownRefs.current[task.id] = el)}
                        >
                            <button
                                className="more-dropdown-btn"
                                onClick={() => toggleDropdown(task.id)}
                            >
                                <BsThreeDots />
                            </button>
                            {openDropdown === task.id && (
                                <div className="more-dropdown-menu">
                                    <button
                                        className="more-dropdown-menu-item"
                                        onClick={() => handleOpen(task)}
                                    >
                                        <img
                                            src={editIcon}
                                            width={16}
                                            height={16}
                                            alt="Edit_Icon"
                                        />
                                        Edit
                                    </button>
                                    <button
                                        className="more-dropdown-menu-item text-delete"
                                        onClick={() => {
                                            const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
                                            const updatedTasks = existingTasks.filter(
                                                (t) => t.id !== task.id
                                            );
                                            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
                                            onTaskAdded();
                                        }}
                                    >
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
                        <span className="s-text-3">{task.category}</span>
                        <span className="s-text-3">{task.date}</span>
                    </div>
                </div>
            )}
        </Draggable>
    );

    const renderColumn = (columnId, columnTasks) => (
        <div className="col-md-4">
            <div className="board-view-inner">
                <div className={`board-view-inner-head ${columnId}`}>{columnId}</div>
                <Droppable droppableId={columnId}>
                    {(provided) => (
                        <div
                            className="board-view-inner-body"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {columnTasks.map((task, index) =>
                                renderTaskCard(task, index)
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board-view">
                <div className="row g-3 h-100">
                    {["to-do", "in-progress", "completed"].map((status) =>
                        renderColumn(
                            status,
                            taskData?.filter((task) => task.status === status)
                        )
                    )}
                </div>
            </div>
        </DragDropContext>
    );
};

export default BoardView;
