import React, { useState } from "react";
import api from "../api";
import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const count = users.length;
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
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);
    return (
        <>
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
            <Pagination
                itemCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default Users;
