import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ _id, color, name }) => {
    return (
        <td key={_id} className={"mx-1 badge bg-" + color}>
            {name}
        </td>
    );
};

Qualitie.propTypes = {
    _id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Qualitie;
