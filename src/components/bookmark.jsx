import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, onBookmark, id }) => {
    return (
        <button onClick={() => onBookmark(id)}>
            {status ? (<i className="bi bi-bookmark-fill"></i>) : (<i className="bi bi-bookmark"></i>)}
        </button>
    );
};
Bookmark.propTypes = {
    status: PropTypes.bool.isRequired,
    onBookmark: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default Bookmark;
