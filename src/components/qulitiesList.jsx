import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

const QualitieList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qualities) => (
                <Qualitie key={qualities._id} {...qualities} />
            ))}
        </>
    );
};

QualitieList.propTypes = {
    qualities: PropTypes.array
};

export default QualitieList;
