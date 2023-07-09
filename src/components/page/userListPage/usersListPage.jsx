import React, { useState, useEffect } from "react";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import { paginate } from "../../../utils/paginate";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchUser, setSearchUser] = useState("");
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    const { users } = useUser();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        }, []);
    const handleDelete = (userId) => {
        // setUsers((prev) => prev.filter((users) => users._id !== userId));
        console.log(userId);
        if (users.findIndex((user) => user._id === userId) <= (currentPage - 1) * pageSize) {
            if ((users.length - 1) <= (currentPage - 1) * pageSize) {
                setCurrentPage(currentPage - 1);
            };
        };
    };
    const handleToggleBookMark = (userId) => {
        const newArray = users.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        console.log(newArray);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchUser]);
    const handleProfessionSelected = item => {
        setSearchUser("");
        setSelectedProf(item);
    };
    const handleSearch = ({ target }) => {
        setSelectedProf(undefined);
        setSearchUser(target.value);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filterUsers = selectedProf ? users.filter((user) => user.profession._id === selectedProf._id) : users;
    const filteredUsers = searchUser ? users.filter(user => user.name.toLowerCase().includes(searchUser)) : filterUsers;
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
                <input type="text" onChange={handleSearch} placeholder="Search" className="form-control" value={searchUser} />
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

export default UsersListPage;
