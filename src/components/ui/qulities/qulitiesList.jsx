import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useDispatch, useSelector } from "react-redux";
import { getQualitiesByIds, getQualitiesLoadingStatus, loadQualitiesList } from "../../../store/qualities";

const QualitieList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    if (isLoading) return "loading...";
    return (
        <>
            {qualitiesList.map((qualities) => (
                <Qualitie key={qualities._id} {...qualities} />
            ))}
        </>
    );
};

QualitieList.propTypes = {
    qualities: PropTypes.arrayOf(PropTypes.string)
};

export default QualitieList;
