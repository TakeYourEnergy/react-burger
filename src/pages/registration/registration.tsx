import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import styles from "./registration.module.css";
import { useState, ChangeEvent } from "react";
import { registrationUser } from "../../services/actions/login";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../utils/types";

const Registration = () => {
  const [nameRegistration, setNameRegistration] = useState("");
  const [emailRegistration, setEmailRegistration] = useState("");
  const [passwordRegistration, setPasswordRegistration] = useState("");
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => ({
    user: state.loginReducer.user
  }))

  const inputNameRegistration = (e: ChangeEvent<HTMLInputElement>) => {
    setNameRegistration(e.target.value);
  };

  const inputEmailRegistration = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailRegistration(e.target.value);
  };

  const inputPasswordRegistration = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordRegistration(e.target.value);
  };

  const newUserRegistation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registrationUser(nameRegistration, emailRegistration, passwordRegistration));
  }

  if (user) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    )
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
            name={"email"}
            value={emailRegistration}
            onChange={inputEmailRegistration}
            size={"default"}
          />
        </div>
        <div className={styles.inp}>
          <PasswordInput
            name={"password"}
            value={passwordRegistration}
            onChange={inputPasswordRegistration}
            size={"default"}
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
