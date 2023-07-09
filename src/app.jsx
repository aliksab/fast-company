import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import UsersPage from "./layouts/users";
import NavBar from "./components/ui/navbar";
import Home from "./layouts/home";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";

function App() {
    return (
        <>
            <NavBar />
            <QualityProvider>
                <ProfessionProvider>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login/:type?" component={Login}/>
                        <Route path="/users/:userId?/:edit?" component={UsersPage}/>
                        <Redirect to="/"/>
                    </Switch>
                </ProfessionProvider>
            </QualityProvider>
            <ToastContainer />
        </>
    );
}

export default App;
