import { UPDATE_ACCOUNT } from "../../apollo/updateAccount";
import InputComponent from "../../components/imput-component/InputComponent";
import styles from "../administrator/administrator.module.css";
import { FC, useCallback, useEffect, useState } from "react";
import { useFormCallback } from "../../utils/use-form-callback";
import { useMutation } from "@apollo/client";
import { TState } from "../../utils/typesTS";
import accountStore from "../../services/accountsStore";
import tasks from "../../img/tasks-ic-bl.svg";
import OutsideClickHandler from "react-outside-click-handler";
import Loader from "../../components/loader/Loader";

const AdministratorPage: FC = () => {
  const [updateAccount, { loading, error }] = useMutation(UPDATE_ACCOUNT);

  var userInfo = accountStore((state) => state);
  const [disabledMail, setDisableMail] = useState(true);
  const [disabledPass, setDisablePass] = useState(true);

  const disabledMailClick = () => {
    if (disabledMail) {
      setDisableMail(false);
    } else {
      setDisableMail(true);
    }
  };

  const disabledPassClick = () => {
    if (disabledPass) {
      setDisablePass(false);
    } else {
      setDisablePass(true);
    }
  };

 

  const submitCallback = useCallback((state: TState) => {
    updateAccount({
      variables: {
        email: state.Email,
        firstName: state.FirstName,
        middleName: state.GivenName,
        password: state.password,
        phoneNumber: state.phone_number,
        secondName: state.SecondName,
        userID: state.userID, //
      }
    }, );

    accountStore.setState(() => ({
      SecondName: state.SecondName,
      FirstName: state.FirstName,
      GivenName: state.GivenName,
      Email: state.Email,
      password: state.password,
      phone_number: state.phone_number,
      userID: state.userID, //
    }));
  }, [updateAccount]);

  const { state, setState, onChange, onSubmit } = useFormCallback(
    {
      SecondName: "",
      FirstName: "",
      GivenName: "",
      Email: "",
      password: "",
      phone_number: "",
      userID: "",
    },
    submitCallback
  );

  useEffect(() => {
    setState({
      SecondName: userInfo.SecondName,
      FirstName: userInfo.FirstName,
      GivenName: userInfo.GivenName,
      Email: userInfo.Email,
      password: "",
      phone_number: userInfo.phone_number,
      userID: userInfo.userID, //
    });
  },[setState , userInfo.Email, userInfo.FirstName, userInfo.GivenName, userInfo.SecondName, userInfo.phone_number,  userInfo.userID] );

  if (loading)
    return (
      <>
       <Loader />
      </>
    );

  if (error) return <>`Submission error! ${error.message}`</>;

  return (
    <div className="col-sm-12 p-0">
      <div className="row p-4 m-0">
        <div className="col-lg-6 col-sm-12">
          <form
            className="bgWhite rounded16 shadow w-100 p-4"
            onSubmit={onSubmit}
          >
            <div className="flexHoriz w-100">
              <h2 className="font24b textBlack mb-3"> Настройки профиля</h2>
            </div>

            <InputComponent
              type="text"
              onChange={onChange}
              value={state.SecondName || ""}
              children="Фамилия"
              name="SecondName"
              classCss="SecondName"
              id_name="SecondName"
            />

            <InputComponent
              type="text"
              onChange={onChange}
              value={state.FirstName || ""}
              children="Имя"
              name="FirstName"
              classCss="FirstName"
              id_name="FirstName"
            />

            <InputComponent
              type="text"
              onChange={onChange}
              value={state.GivenName || ""}
              children="Отчество"
              name="GivenName"
              classCss="MiddleName"
              id_name="GivenName"
            />

            <OutsideClickHandler
              onOutsideClick={() => {
                setDisableMail(true);
              }}
            >
              <div className={styles.divBut}>
                <InputComponent
                  type="email"
                  onChange={onChange}
                  disabled={disabledMail}
                  value={state.Email || ""}
                  children="E-mail"
                  name="Email"
                  classCss={disabledMail ? "email bgLightGrey" : "email"}
                  id_name="Email"
                />
                <button
                  className={styles.button}
                  onClick={disabledMailClick}
                  type="button"
                  title="редактировать"
                >
                  <img
                    src={tasks}
                    className="w24 reddishSvg mr-2 ml-2"
                    alt=""
                  ></img>
                </button>
              </div>
            </OutsideClickHandler>

            <OutsideClickHandler
              onOutsideClick={() => {
                setDisablePass(true);
              }}
            >
              <div className={styles.divBut}>
                <InputComponent
                  type={!disabledPass ? "text" : "password"}
                  disabled={disabledPass}
                  onChange={onChange}
                  value={state.password || ""}
                  children="Пароль"
                  name="password"
                  classCss={disabledPass ? "pass bgLightGrey" : "pass"}
                  id_name="password"
                />
                <button
                  className={styles.button}
                  onClick={disabledPassClick}
                  type="button"
                  title="редактировать"
                >
                  <img
                    src={tasks}
                    className="w24 reddishSvg mr-2 ml-2"
                    alt=""
                  ></img>
                </button>
              </div>
            </OutsideClickHandler>

            <InputComponent
              type="tel"
              onChange={onChange}
              value={state.phone_number || ""}
              children="Мобильный телефон"
              name="phone_number"
              classCss="email"
              id_name="phone_number"
            />

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

export default AdministratorPage;
