import styles from './forgot-password.module.css'
import { useCallback, useState } from 'react';
import {
   Button,
   Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { recoveryPasswordEmail } from '../../services/actions/login';
import { useDispatch, useSelector } from 'react-redux';



const ForgotPassword = () => {
   const [emailForgot, setEmailForgot] = useState('')
   const dispatch = useDispatch();
   const location = useLocation();

   //В случае успеха обращения к серверу на странице восстановления пользователь направляется на маршрут /reset-password
   const { forgotPasswordSuccess, user } = useSelector(state => ({
      forgotPasswordSuccess: state.loginReducer.forgotPasswordSuccess,
      user: state.loginReducer.user
   }))

   if (forgotPasswordSuccess) {
      return (
         <Redirect
            to={{
               pathname: "/reset-password",
               state: { frgt: location }
            }}
         />
      )
   }

   if (user) {
      return <Redirect to='/' />
   }


   const emailForgotInput = (e) => {
      setEmailForgot(e.target.value)
   }

   const forgotPasswordSubmit = (e) => {
      e.preventDefault();
      //диспачим введенное мыло, делая запрос к серверу
      dispatch(recoveryPasswordEmail(emailForgot))
      //обнуляем поле инпута
      setEmailForgot('')
   }

   return (
      <div className={styles.container}>
         <h2 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h2>
         <form className={styles.form} onSubmit={forgotPasswordSubmit}>
            <div className='mb-6'>
               <Input
                  placeholder={"Укажите email"}
                  name={"E-mail"}
                  onChange={emailForgotInput}
                  value={emailForgot}
                  error={false}
                  errorText={"Ошибка"}
                  size={"default"}
                  type={"text"}
               />
            </div>
            <Button disabled={!(emailForgot)} type="primary" size="medium">Восстановить</Button>
         </form>
         <div className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>
            <p className={`${styles.question} text text_type_main-default text_color_inactive`}>Вспомнили пароль?</p>&nbsp;
            <Link className={styles.link} to='/login'>Войти</Link>
         </div>
      </div>
   )
}

export default ForgotPassword