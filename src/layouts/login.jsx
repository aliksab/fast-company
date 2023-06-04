import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");
    const toggleFormType = (params) => {
        setFormType(prev => prev === "register" ? "login" : "register");
    };

    return (
        <div className="container mt-5">
            <div className="row col-md-6 offset-md-3 shadow p-4">
                {formType === "register" ? <><h3 className="mb-4">Register</h3><RegisterForm /><p>Alreadu have account? <Link role="button" onClick={toggleFormType} to={`/login`}>Sign In</Link></p></> : <><h3 className="mb-4">Login</h3><LoginForm /><p>Dont have account? <Link role="button" onClick={toggleFormType} to={`/login/register`}>Sign Up</Link></p></>}
            </div>
        </div>
    );
};

export default Login;
