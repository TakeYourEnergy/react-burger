import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./registration.module.css";
import { useState } from "react";
import { registrationUser } from "../../../services/actions/login";
import { useDispatch, useSelector } from "react-redux";

const Registration = () => {
  const [nameRegistration, setNameRegistration] = useState("");
  const [emailRegistration, setEmailRegistration] = useState("");
  const [passwordRegistration, setPasswordRegistration] = useState("");
  const dispatch = useDispatch()
  //const selector = useSelector(state => console.log(state.loginReducer))

  const inputNameRegistration = (e) => {
    setNameRegistration(e.target.value);
  };

  const inputEmailRegistration = (e) => {
    setEmailRegistration(e.target.value);
  };

  const inputPasswordRegistration = (e) => {
    setPasswordRegistration(e.target.value);
  };

  const newUserRegistation = (e) => {
    e.preventDefault();
    dispatch(registrationUser(nameRegistration, emailRegistration, passwordRegistration));
  }

  return (
    <div className={styles.container}>
      <h2 className={`text text_type_main-medium pb-6`}>Регистрация</h2>

      <form className={styles.form} onSubmit={newUserRegistation}>
        <div className={styles.inp}>
          <Input
            placeholder={"Имя"}
            name={"name"}
            error={false}
            type={"text"}
            value={nameRegistration}
            onChange={inputNameRegistration}
            size={"default"}
            errorText={"Ошибка"}
          />
        </div>
        <div className={styles.inp}>
          <EmailInput
            placeholder={"E-mail"}
            name={"email"}
            type={"email"}
            value={emailRegistration}
            onChange={inputEmailRegistration}
            size={"default"}
            error={false}
            errorText={"Ошибка"}
          />
        </div>
        <div className={styles.inp}>
          <PasswordInput
            placeholder={"Пароль"}
            name={"password"}
            value={passwordRegistration}
            onChange={inputPasswordRegistration}
            size={"default"}
            error={false}
            errorText={"Ошибка"}
            type={"password"}
          />
        </div>
        <div>
          <Button
            disabled={
              !(nameRegistration && emailRegistration && passwordRegistration)
            }
            type="primary"
            size="medium"
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>

      <div
        className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}
      >
        <p className={styles.question}>Уже зарегистрированы?</p>&nbsp;
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Registration;
