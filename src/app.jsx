import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import UsersPage from "./layouts/users";
import NavBar from "./components/ui/navbar";
import Home from "./layouts/home";
import Login from "./layouts/login";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login/:type?" component={Login}/>
                <Route path="/users/:userId?/:edit?" component={UsersPage}/>
                <Redirect to="/"/>
            </Switch>
        </>
    );
}
export default App;
