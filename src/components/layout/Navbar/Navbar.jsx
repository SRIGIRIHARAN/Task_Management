import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from "../../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";
import task from '../../../assests/images/task.svg';
import profile from '../../../assests/images/profile.svg';
import logout from '../../../assests/images/logout_icon.svg';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const { user } = useAuth();
    const [dropdown, setDropdown] = useState(false);
    const location = useLocation();
    const dropdownRef = useRef(null);


    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <header className={`top-navbar ${location.pathname === "/login" ? "d-none" : ""}`}>
            <a href='/' className='logo'>
                <img src={task} width={32} height={32} className='mobile-hide' alt='Logo_Image' />
                TaskBuddy
            </a>
            <div className='profile-dropdown' ref={dropdownRef}>
                <button className='profile-dropdown-btn' onClick={() => toggleDropdown()}>
                    <img src={profile} width={36} height={36} alt='Profile_Image' />
                    <p className='mobile-hide'>{user?.displayName}</p>
                </button>
                {dropdown && (
                    <div className={`profile-dropdown-menu ${dropdown ? 'show' : ''}`} >
                        <button className='logout-btn' onClick={() => handleLogout()}>
                            <img src={logout} width={15} height={15} alt='Logout_Image' />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar