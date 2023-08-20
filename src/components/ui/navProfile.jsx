import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen(prev => !prev);
    };
    if (!currentUser) return "Loading";
    return (
        <div className="dropDown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img src={currentUser.image}
                    alt=""
                    height="30"
                    className="img-responsive rounded-circle" />
            </div>
            <div className={"dropdown-menu" + (isOpen ? " show" : "")}>
                <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
                <Link to={`/logout`} className="dropdown-item">Logout</Link>
            </div>
        </div>
    );
};

export default NavProfile;
