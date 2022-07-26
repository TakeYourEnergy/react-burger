import styles from "./authorization.module.css";
import { useState } from "react";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";

import {
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

const Authorization = () => {
  const [emailAuthorization, setEmailAuthorization] = useState("");
  const [passwordAuthorization, setPasswordAuthorization] = useState("");
  const location = useLocation();

  const { user } = useSelector(state => ({
    user: state.loginReducer.user
  }))

  const onChangeInput = (e) => {
    setEmailAuthorization(e.target.value);
  };

  const onChangePassword = (e) => {
    setPasswordAuthorization(e.target.value);
  };

  if (user) {
    return (
      <Redirect to={location?.state?.from || '/'} />
    );
  }


  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium">Вход</h2>

      <form className={styles.form}>
        <div className="mt-6 mb-6">
          <EmailInput
            placeholder={"E-mail"}
            name={"E-mail"}
            onChange={onChangeInput}
            value={emailAuthorization}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            type={"email"}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            name={"password"}
            onChange={onChangePassword}
            value={passwordAuthorization}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            placeholder={"Пароль"}
            type={"password"}
          />
        </div>
        <Button
          type="primary"
          size="medium"
          disabled={!(emailAuthorization && passwordAuthorization)}
        >
          Войти
        </Button>
      </form>

      <div
        className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}
      >
        <p className={styles.question}>Вы — новый пользователь?</p>&nbsp;
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </div>
      <div
        className={`${styles.text} text text_type_main-default text_color_inactive mt-4`}
      >
        <p className={styles.question}>Забыли пароль?</p>&nbsp;
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
};

export default Authorization;
