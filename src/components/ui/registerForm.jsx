import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioFeld from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQuality } from "../../store/qualities";
import { getProfessions } from "../../store/professions";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({ email: "", password: "", profession: "", sex: "male", name: "", qualities: [] });
    const { signUp } = useAuth();
    const quality = useSelector(getQuality());
    const qualitiesList = quality.map((q) => ({ label: q.name, value: q._id }));
    const professions = useSelector(getProfessions());
    const professionsList = professions.map((p) => ({ label: p.name, value: p._id }));
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
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно содержать как минимум 3 символов",
                value: 3
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = { ...data, qualities: data.qualities.map(q => q.value) };
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            SetErrors(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Электронная почта" type="text" name="email" value={data.email} onChange={handleChange} error={errors.email} />
            <TextField label="Имя" type="text" name="name" value={data.name} onChange={handleChange} error={errors.name} />
            <TextField label="Пароль" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
            <SelectField label="Выбери профессию" name="profession" defaultOption="Choose.." options={professionsList} onChange={handleChange} value={data.profession} error={errors.profession} />
            <RadioFeld label="Выберите Ваш пол" options={[{ name: "Male", value: "male" }, { name: "Female", value: "Female" }]} value={data.sex} name="sex" onChange={handleChange} />
            <MultiSelectField name="qualities" defaultValue={data.qualities} label="Выберите Ваши качества" options={qualitiesList} onChange={handleChange} />
            <CheckBoxField value={data.licence} onChange={handleChange} name="licence" error={errors.licence}>Подтвердить лицензионное соглашение</CheckBoxField>
            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Submit</button>
        </form>
    );
};

export default RegisterForm;
