import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import UsersPage from "./layouts/usersPage";
import NavBar from "./components/navbar";
import Home from "./layouts/home";
import Login from "./layouts/login";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/users/:userId?" component={UsersPage}/>
                <Redirect to="/"/>
            </Switch>
        </>
    );
}
export default App;
