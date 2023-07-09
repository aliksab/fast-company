import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Table from "../common/table/table";
import Bookmark from "../common/bookmark";
import Qualities from "./qulities/qulitiesList";
import Profession from "./profession";

const UserTable = ({ users, selectedSort, onSort, onDelete, onBookMark }) => {
    const columns = {
        name: { path: "name", name: "Имя", component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link> },
        qualities: { name: "Качества", component: (user) => (<Qualities qualities={user.qualities} />) },
        professions: { name: "Профессия", component: (user) => (<Profession id={user.profession} />) },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    id={user._id}
                    onBookmark={onBookMark}
                    status={user.bookmark}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };

    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} />
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookMark: PropTypes.func.isRequired
};

export default UserTable;
