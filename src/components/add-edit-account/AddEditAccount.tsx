import React, { FC, useState } from "react";
import { useFormik } from "formik";
import { TState } from "../../utils/typesTS";
import InputComponent from "../../components/imput-component/InputComponent";
import { useMutation } from "@apollo/client";
import { UPDATE_ACCOUNT } from "../../apollo/QLAccount";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

type TPropsState = {
    card:boolean
}
type TProps = TPropsState & TState

interface Category {
  name: string; 
  key: string;
}


const AddEditAccount: FC<TProps> = ({card , Email , FirstName , SecondName , userID , phone_number , role , GivenName , password  }) => {
  
  const categories: Category[] = [
    { name: 'Менеджер', key: '50C5D24A-D585-473C-82B2-411DA4120FA5' },
    { name: 'Ответственный', key: 'B6FAFCA4-67E0-4CC6-ACE7-F285DEF6A0B6' },
    { name: 'Исполнитель', key: 'CD1FEC0D-7828-4C6A-8BE3-25EF9E1A12C3' }
    
];

const category = categories.find(cat => role?.includes(cat.name));
const categoryKey = category ? category.key : null;

const categoryIndex = categories.findIndex(cat => role?.includes(cat.name));



const [selectedCategories, setSelectedCategories] = useState<Category[]>(card ? [categories[categoryIndex]] : []);

const onCategoryChange = (e: CheckboxChangeEvent) => {
  let _selectedCategories = [...selectedCategories];

  if (e.checked)
      _selectedCategories.push(e.value);
  else
      _selectedCategories = _selectedCategories.filter(category => category.key !== e.value.key);

  setSelectedCategories(_selectedCategories);
 

};


    const navigate = useNavigate();
    
    const formik = useFormik<TState>({
    initialValues: {
      Email:card ? Email : "",
      FirstName:card ? FirstName :"",
      GivenName:card ? GivenName :"",
      SecondName:card? SecondName :"",
      phone_number:card? phone_number :"",
      password:card? "123456789" :"",
      role: card ? role : [],
      userID:card? userID :"",
   
    
    },
    onSubmit: (values) => {
        if(card){
    
    updateAccount({
        variables: {
          email: values.Email,
          firstName: values.FirstName,
          middleName: values.GivenName,
          password: values.password,
          phoneNumber: values.phone_number,
          secondName: values.SecondName,
          userID: values.userID,
          role:selectedCategories.map((item) =>(item.name)) //
        }
      }, );
        }
        else{
      alert(JSON.stringify(values, null, 2));
            }
    },
  });

  const [updateAccount, { loading:load_update, error:error_update }] = useMutation(UPDATE_ACCOUNT, {
    onCompleted: () => {
      navigate(-1);
    },});

  const GenPas = () => {
    var bigCases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var smallCases = "abcdefghijklmnopqrstuvwxyz";
    var numbers = "0123456789";
    var BigRand = bigCases[Math.floor(Math.random() * bigCases.length)];
    var smallRand = smallCases[Math.floor(Math.random() * smallCases.length)];
    var numbRand = ""; // Инициализация переменной numbRand
    for (var i = 0; i < 6; i++) {
      numbRand += numbers[Math.floor(Math.random() * numbers.length)];
    }
    var Gpass = BigRand + smallRand + numbRand; // Возвращаем сгенерированный пароль
    return Gpass;
  };
  if (load_update) return <Loader />;
  if (error_update) return <div>${error_update.message}</div>;

  return (
    <div className="col-sm-12 p-0">
      <div className="row p-4 m-0">
        <div className="col-lg-6 col-sm-12">
          <form
            className="bgWhite rounded16 shadow w-100 p-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="flexHoriz w-100">
              <h2 className="font24b textBlack mb-3">Добавить пользователя</h2>
            </div>

            <div className="flexHoriz justify-content-between mt-3">
              <div className="posRel w-48 mb-3">
                <InputComponent
                  type={"password"}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  children="Пароль"
                  name="password"
                  classCss={"pass"}
                  id_name="password"
                  required={true}
                />
              </div>
              <div className="posRel w-48 ml-3 mb-3">
                <button
                  className="btn btn1 h56 mr-2"
                  type="button"
                  onClick={() => {
                    formik.setFieldValue("password", GenPas());
                  }}
                >
                  <span>Сгенерировать пароль</span>
                </button>
              </div>
            </div>

            <InputComponent
              type="text"
              onChange={formik.handleChange}
              value={formik.values.SecondName}
              children="Фамилия"
              name="SecondName"
              classCss="SecondName"
              id_name="SecondName"
              required={true}
            />

            <InputComponent
              type="text"
              onChange={formik.handleChange}
              value={formik.values.FirstName}
              children="Имя"
              name="FirstName"
              classCss="FirstName"
              id_name="FirstName"
              required={true}
            />

            <InputComponent
              type="text"
              onChange={formik.handleChange}
              value={formik.values.GivenName}
              children="Отчество"
              name="GivenName"
              classCss="MiddleName"
              id_name="GivenName"
            />

            <InputComponent
              type="tel"
              onChange={formik.handleChange}
              value={formik.values.phone_number}
              children="Мобильный телефон"
              name="phone_number"
              classCss="email"
              id_name="phone_number"
              required={true}
            />

            <InputComponent
              type="email"
              onChange={formik.handleChange}
              value={formik.values.Email}
              children="E-mail"
              name="Email"
              classCss={"email"}
              id_name="Email"
              required={true}
            />



<div className="card flex justify-content-center">
            <div className="flex flex-column gap-3">
                {categories.map((category) => {
                    return (
                        <div key={category.key} className="flex align-items-center">
                            <Checkbox inputId={category.key} name="category" value={category} onChange={onCategoryChange} checked={selectedCategories.some((item) => item.key === category.key)} />
                            <label htmlFor={category.key} className="ml-2">
                                {category.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>



            <div className="row mt-3 mb-3">
              <div className="col-sm-12">
                <button className="btn btn1 h56 mr-2" type="submit">
                  <strong>Сохранить изменения</strong>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditAccount;
