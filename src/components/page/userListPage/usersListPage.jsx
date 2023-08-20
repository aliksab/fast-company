import React, { useState, useEffect } from "react";
import SearchStatus from "../../ui/searchStatus";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import { paginate } from "../../../utils/paginate";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const [selectedProf, setSelectedProf] = useState();
    const [searchUser, setSearchUser] = useState("");
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    const handleDelete = (userId) => {
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
    function filtersUsers(data) {
        const filteredUsers = searchUser ? data.filter(user => user.name.toLowerCase().includes(searchUser)) : filterUsers;
        return filteredUsers.filter((u) => u._id !== currentUserId);
    }
    const filteredUsers = filtersUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {professions && !professionsLoading && (
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
