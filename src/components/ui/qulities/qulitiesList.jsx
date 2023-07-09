import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQuality } from "../../../hooks/useQuality";

const QualitieList = ({ qualities }) => {
    const { isLoading } = useQuality();

    if (!isLoading) {
        return (qualities.map((qualities) => (
            <Qualitie key={qualities} id={qualities} />
        )));
    } else return "loading...";
};

QualitieList.propTypes = {
    qualities: PropTypes.arrayOf(PropTypes.string)
};

export default QualitieList;
