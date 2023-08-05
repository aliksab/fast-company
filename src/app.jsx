import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import UsersPage from "./layouts/users";
import NavBar from "./components/ui/navbar";
import Home from "./layouts/home";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./layouts/logOut";

function App() {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <QualityProvider>
                    <ProfessionProvider>
                        <Switch>
                            <ProtectedRoute path="/users/:userId?/:edit?" component={UsersPage}/>
                            <Route path="/login/:type?" component={Login}/>
                            <Route path="/logout" exact component={Logout}/>
                            <Route path="/" exact component={Home}/>
                            <Redirect to="/"/>
                        </Switch>
                    </ProfessionProvider>
                </QualityProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
