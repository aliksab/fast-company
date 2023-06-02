import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input type={showPassword ? "text" : type} id={name} name={name} value={value} onChange={onChange} className={getInputClasses()} />
                {type === "password" && (
                    <button className="btn btn-secondary" type="button" onClick={toggleShowPassword}><i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i></button>
                )}
                {error && <p className="invalid-feedback">{error}</p>}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default TextField;
