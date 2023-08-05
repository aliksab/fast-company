import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen(prev => !prev);
    };
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
