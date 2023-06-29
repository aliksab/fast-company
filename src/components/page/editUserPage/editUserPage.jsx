import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioFeld from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";

const EditUserPage = () => {
  const [data, setData] = useState({ name: "", email: "", profession: "", sex: "male", qualities: [], licence: false });
  const { userId } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState({});

    const getProfessionById = id => {
      for (const profession of professions) {
        if (profession.value === id) {
          return {
            _id: profession.value,
            name: profession.label
          };
        }
      }
    };
    const getQualities = elements => {
      const qualitiesArray = [];
      for (const element of elements) {
        for (const quality in qualities) {
          if (element.value === qualities[quality].value) {
            qualitiesArray.push({
              _id: qualities[quality].value,
              name: qualities[quality].label,
              color: qualities[quality].color
            });
          };
        }
      }
      return qualitiesArray;
    };
    useEffect(() => {
      setLoading(true);
      api.users.getById(userId).then(({ profession, qualities, ...data }) =>
        setData(prevState => ({ ...prevState, ...data, qualities: qualities.map(qualitie => ({ label: qualitie.name, value: qualitie._id })), profession: profession._id })));
        api.professions.fetchAll().then(data => {
          const professionsList = Object.keys(data).map(profession => ({ name: data[profession].name, label: data[profession].name, value: data[profession]._id })); setProfessions(professionsList);
        });
        api.qualities.fetchAll().then(data => {
          const qualitiesList = Object.keys(data).map(qualitie => ({ value: data[qualitie]._id, label: data[qualitie].name, color: data[qualitie].color })); setQualities(qualitiesList);
        });
      }, []);

      useEffect(() => {
        if (data._id) {
          setLoading(false);
        }
      }, [data]);

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
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите Вашу профессию"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
      try {
        e.preventDefault();
        const { profession, qualities } = data;
        api.users.update(userId, {
          ...data,
          profession: getProfessionById(profession),
          qualities: getQualities(qualities)
        });
        history.replace(`/users/${userId}`);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className="container mt-5">
        <BackHistoryButton />
        <div className="row col-md-6 offset-md-3 shadow p-4">
          {!loading && Object.keys(professions).length > 0 ? <form onSubmit={handleSubmit}>
                <TextField label="Имя" name="name" value={data.name} onChange={handleChange} error={errors.name} />
                <TextField label="Электронная почта" type="text" name="email" value={data.email} onChange={handleChange} error={errors.email} />
                <SelectField label="Выбери профессию" name="profession" defaultOption="Choose.." options={professions} onChange={handleChange} value={data.profession} error={errors.profession} />
                <RadioFeld label="Выберите Ваш пол" options={[{ name: "Male", value: "male" }, { name: "Female", value: "Female" }]} value={data.sex} name="sex" onChange={handleChange} />
                <MultiSelectField name="qualities" defaultValue={data.qualities} label="Выберите Ваши качества" options={qualities} onChange={handleChange} />
                <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Обновить</button>
              </form>
              : <h3>Загрузка..</h3>}
        </div>
      </div>
    );
};

export default EditUserPage;
