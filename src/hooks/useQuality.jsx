import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QualityContext = React.createContext();
export const useQuality = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [quality, setQuality] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getQualityList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function getQuality(id) {
        return quality.find((p) => p._id === id);
    }
    async function getQualityList() {
        try {
            const { content } = await qualityService.fetchAll();
            setQuality(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }
    return (
        <QualityContext.Provider value={ { isLoading, quality, getQuality } }>
           {children}
        </QualityContext.Provider>
    );
};
QualityProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
