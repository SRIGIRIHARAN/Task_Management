import React, { forwardRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import editIcon from '../../../assests/images/edit-icon.svg';
import deleteIcon from '../../../assests/images/delete-icon.svg';

const MoreDropdown = forwardRef(({ isOpen, onToggle, onEdit, onDelete }, ref) => {
  return (
    <div className="more-dropdown" ref={ref}>
      <button className="more-dropdown-btn" onClick={onToggle}>
        <BsThreeDots />
      </button>
      {isOpen && (
        <div className="more-dropdown-menu">
          <button className="more-dropdown-menu-item" onClick={onEdit}>
            <img src={editIcon} width={16} height={16} alt="Edit_Icon" />
            Edit
          </button>
          <button
            className="more-dropdown-menu-item text-delete"
            onClick={onDelete}
          >
            <img src={deleteIcon} width={16} height={16} alt="Delete_Icon" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
});

export default MoreDropdown;
