import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionsByIds, getProfessionsLoadingStatus } from "../../store/professions";

const Profession = ({ id }) => {
    const prof = useSelector(getProfessionsByIds(id));
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    if (!professionsLoading) {
        return <p>{prof.name}</p>;
    } else return "loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
