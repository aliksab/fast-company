import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
            selectedSort.path += <i className="bi bi-caret-up-fill"></i>;
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const caretPanel = selectedSort.order === "asc" ? <i className="bi bi-caret-down-fill"/> : <i className="bi bi-caret-up-fill"/>;

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th key={column}
                        onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined }
                        { ...{ role: columns[column].path && "button" }} scope="col">
                        {columns[column].name}
                        {(selectedSort.path === columns[column].path) && (selectedSort.path !== undefined) ? caretPanel : null}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
