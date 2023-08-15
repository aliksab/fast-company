import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const { currentUser } = useAuth();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getUser();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    async function getUser() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }
    function getUserById(id) {
        return users.find((u) => u._id === id);
    }
    useEffect(() => {
        if (!isLoading) {
            const newUsers = [...users];
            const indexUser = users.findIndex(u => u._id === currentUser._id);
            newUsers[indexUser] = currentUser;
            setUsers(newUsers);
        }
    }, [currentUser]);
    return (
        <UserContext.Provider value={ { users, getUserById } }>
            { !isLoading ? children : "Loading..." }
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default UserProvider;
