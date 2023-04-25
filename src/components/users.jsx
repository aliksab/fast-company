import React, { useState, useEffect } from "react";
import api from "../api";
import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import GroupList from "./groupList";
import { paginate } from "../utils/paginate";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const [proffesions, setProffesions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handleDelete = (userId) => {
        setUsers((prev) => prev.filter((users) => users._id !== userId));
        if (users.findIndex((user) => user._id === userId) <= (currentPage - 1) * pageSize) {
            if ((users.length - 1) <= (currentPage - 1) * pageSize) {
                setCurrentPage(currentPage - 1);
            };
        };
    };
    const handleToggleBookMark = (userId) => {
        setUsers((prev) =>
            prev.map((user) =>
                user._id === userId
                    ? { ...user, bookmark: !user.bookmark }
                    : user
            )
        );
    };
    useEffect(() => {
        api.proffesions.fetchAll().then((data) => setProffesions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProffesionSelected = item => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf ? users.filter((user) => user.profession === selectedProf) : users;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {proffesions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList selectedItem={selectedProf} items={proffesions} onItemSelect={handleProffesionSelected} />
                    <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
                </div>
            )}
            <div className="d-flex flex-column w-100">
                <SearchStatus length={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User
                                    key={user._id}
                                    onDelete={handleDelete}
                                    onBookMark={handleToggleBookMark}
                                    {...user}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Users;
