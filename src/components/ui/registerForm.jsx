import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioFeld from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkField";

const RegisterForm = () => {
    const [data, setData] = useState({ email: "", password: "", profession: "", sex: "male", qualities: [] });
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();
    const [errors, SetErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
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
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите Вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message: "Вы не можете использовать сервис без лицензионного соглашения"
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
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Электронная почта" type="text" name="email" value={data.email} onChange={handleChange} error={errors.email} />
            <TextField label="Пароль" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
            <SelectField label="Выбери профессию" name="profession" defaultOption="Choose.." options={professions} onChange={handleChange} value={data.profession} error={errors.profession} />
            <RadioFeld label="Выберите Ваш пол" options={[{ name: "Male", value: "male" }, { name: "Female", value: "Female" }]} value={data.sex} name="sex" onChange={handleChange} />
            <MultiSelectField name="qualities" defaultValue={data.qualities} label="Выберите Ваши качества" options={qualities} onChange={handleChange} />
            <CheckBoxField value={data.licence} onChange={handleChange} name="licence" error={errors.licence}>Подтвердить лицензионное соглашение</CheckBoxField>
            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Submit</button>
        </form>
    );
};

export default RegisterForm;
