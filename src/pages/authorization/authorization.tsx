import styles from "./authorization.module.css";
import { FC, useState, ChangeEvent } from "react";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { authorizationUser } from "../../services/actions/login";
import {
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../utils/types";

interface stateType {
  from: { pathname: string }
}


const Authorization: FC = () => {
  const [emailAuthorization, setEmailAuthorization] = useState("");
  const [passwordAuthorization, setPasswordAuthorization] = useState("");
  const location = useLocation<stateType>();
  const dispatch = useDispatch()

  const { user } = useAppSelector(state => ({
    user: state.loginReducer.user
  }))

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailAuthorization(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordAuthorization(e.target.value);
  };

  const submitAuthorization = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authorizationUser(emailAuthorization, passwordAuthorization));
  };

  if (user) {
    return (
      <Redirect to={location?.state?.from || '/'} />
    );
  }


  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium">Вход</h2>

      <form className={styles.form} onSubmit={submitAuthorization}>
        <div className="mt-6 mb-6">
          <EmailInput
            name={"E-mail"}
            onChange={onChangeInput}
            value={emailAuthorization}
            size={"default"}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            name={"password"}
            onChange={onChangePassword}
            value={passwordAuthorization}
            size={"default"}
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
