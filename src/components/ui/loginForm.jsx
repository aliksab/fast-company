import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkField";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/users";

const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, SetErrors] = useState({});
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введён некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать как минимум одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать как минимум одну цифру"
            },
            min: {
                message: "Пароль должен содержать как минимум 8 символов",
                value: 8
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        SetErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const redirect = history.push(history.location.state ? history.location.state.from.pathname : "/");
        dispatch(login({ payload: data, redirect }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Электронная почта" type="text" name="email" value={data.email} onChange={handleChange} error={errors.email} />
            <TextField label="Пароль" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
            <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">Оставаться в системе</CheckBoxField>
            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto" >Submit</button>
        </form>
    );
};

export default LoginForm;
