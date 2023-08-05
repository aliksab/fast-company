import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import { useHistory } from "react-router-dom";
// import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioFeld from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useProfessions } from "../../../hooks/useProfession";
import { useQuality } from "../../../hooks/useQuality";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
  const { updateUser, currentUser } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { professions, isLoading: profIsLoading } = useProfessions();
  const { quality, isLoading: qualIsLoading } = useQuality();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({ name: currentUser.name, email: currentUser.email, profession: currentUser.profession, sex: "male", licence: false });
  const professionsList = professions.map(prof => ({ label: prof.name, value: prof._id }));
  const qualitiesList = quality.map(qual => ({ label: qual.name, value: qual._id }));
  const getQualities = elements => {
    const qualitiesArray = [];
    for (const element of elements) {
      for (const qual of quality) {
        if (qual._id === element) {
          qualitiesArray.push(qual);
          break;
        };
      }
    }
    return qualitiesArray;
  };
  useEffect(() => {
    if (!profIsLoading && !qualIsLoading && currentUser) {
      setData({
        ...currentUser,
        qualities: getQualities(currentUser.qualities).map(qual => ({
          label: qual.name,
          value: qual._id
        }))
      });
    }
  }, [profIsLoading, qualIsLoading, currentUser]);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        ...data,
        qualities: data.qualities.map(q => q.value)
      };
      updateUser(newData);
      history.replace(`/users/${currentUser._id}`);
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
              <SelectField label="Выбери профессию" name="profession" defaultOption="Choose.." options={professionsList} onChange={handleChange} value={data.profession} error={errors.profession} />
              <RadioFeld label="Выберите Ваш пол" options={[{ name: "Male", value: "male" }, { name: "Female", value: "Female" }]} value={data.sex} name="sex" onChange={handleChange} />
              <MultiSelectField name="qualities" defaultValue={data.qualities} label="Выберите Ваши качества" options={qualitiesList} onChange={handleChange} />
              <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Обновить</button>
            </form>
            : <h3>Загрузка..</h3>}
      </div>
    </div>
  );
};

export default EditUserPage;
