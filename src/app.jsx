import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import UsersPage from "./layouts/users";
import NavBar from "./components/ui/navbar";
import Home from "./layouts/home";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);
    return (
        <>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <ProtectedRoute path="/users/:userId?/:edit?" component={UsersPage}/>
                    <Route path="/login/:type?" component={Login}/>
                    <Route path="/logout" exact component={Logout}/>
                    <Route path="/" exact component={Home}/>
                    <Redirect to="/"/>
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
