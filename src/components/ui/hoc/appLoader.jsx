import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from "../../../store/users";
import { useEffect } from "react";
import { loadProfessionsList } from "../../../store/professions";
import { loadQualitiesList } from "../../../store/qualities";

const AppLoader = ({ children }) => {
   const dispatch = useDispatch();
   const isLoggedIn = useSelector(getIsLoggedIn());
   const usersStatusLoading = useSelector(getUsersLoadingStatus());
   useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
    if (isLoggedIn) {
        dispatch(loadUsersList());
    };
   }, [isLoggedIn]);
   if (usersStatusLoading) return "Loading";
    return children;
};
AppLoader.propTyoes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default AppLoader;
