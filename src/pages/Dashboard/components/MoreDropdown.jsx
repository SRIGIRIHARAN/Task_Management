import React, { forwardRef } from "react";
import { BsThreeDots } from "react-icons/bs";

const MoreDropdown = forwardRef(({ isOpen, onToggle, onEdit, onDelete }, ref) => {
  return (
    <div className="more-dropdown" ref={ref}>
      <button className="more-dropdown-btn" onClick={onToggle}>
        <BsThreeDots />
      </button>
      {isOpen && (
        <div className="more-dropdown-menu">
          <button className="more-dropdown-menu-item" onClick={onEdit}>
            Edit
          </button>
          <button
            className="more-dropdown-menu-item text-delete"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
});

export default MoreDropdown;
