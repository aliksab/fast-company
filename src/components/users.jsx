import React, { useState, useEffect } from "react";
import api from "../api";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import GroupList from "./groupList";
import { paginate } from "../utils/paginate";
import UserTable from "./usersTable";
import _ from "lodash";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
            api.professions.fetchAll().then((data) => setProfessions(data));
        });
    }, []);
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
    const handleSort = (item) => {
        setSortBy(item);
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelected = item => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf ? users.filter((user) => user.profession._id === selectedProf._id) : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList selectedItem={selectedProf} items={professions} onItemSelect={handleProfessionSelected} />
                    <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
                </div>
            )}
            <div className="d-flex flex-column w-100">
                <SearchStatus length={count} />
                {count > 0 && (
                    <UserTable users={userCrop} onSort={handleSort} selectedSort={sortBy} onDelete={handleDelete} onBookMark={handleToggleBookMark} />
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
