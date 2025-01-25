import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BsThreeDots } from "react-icons/bs";
import editIcon from "../../../assests/images/edit-icon.svg";
import deleteIcon from "../../../assests/images/delete-icon.svg";

const BoardView = ({ handleOpen }) => {
    const [tasks, setTasks] = useState({
        "to-do": [
            { id: "task-1", title: "Task Title 1", category: "Work", date: "Today" },
            { id: "task-2", title: "Task Title 2", category: "Work", date: "Today" },
        ],
        "in-progress": [
            { id: "task-3", title: "Task Title 3", category: "Work", date: "Tomorrow" },
            { id: "task-4", title: "Task Title 4", category: "Work", date: "Tomorrow" },
        ],
        completed: [
            { id: "task-5", title: "Task Title 5", category: "Work", date: "Next Week" },
            { id: "task-6", title: "Task Title 6", category: "Work", date: "Next Week" },
        ],
    });

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

        const sourceTasks = Array.from(tasks[source.droppableId]);
        const [movedTask] = sourceTasks.splice(source.index, 1);

        const newTasks = {
            ...tasks,
            [source.droppableId]: sourceTasks,
        };

        newTasks[destination.droppableId].splice(destination.index, 0, movedTask);

        setTasks(newTasks);
    };

    const renderTaskCard = (task, index, columnId) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
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
                                        onClick={() => handleOpen()}
                                    >
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
                                renderTaskCard(task, index, columnId)
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
                    {Object.entries(tasks).map(([columnId, columnTasks]) =>
                        renderColumn(columnId, columnTasks)
                    )}
                </div>
            </div>
        </DragDropContext>
    );
};

export default BoardView;
