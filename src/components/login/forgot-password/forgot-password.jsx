import styles from './forgot-password.module.css'
import { useCallback, useState } from 'react';
import {
   Button,
   Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { recoveryPasswordEmail } from '../../../services/actions/login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



const ForgotPassword = () => {
   const [emailForgot, setEmailForgot] = useState('')
   const dispatch = useDispatch();
   const history = useHistory();

   //const passSuccess = useSelector(state => state.loginReducer.forgotPasswordSuccess)

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

   //!В случае успеха пользователь направляется на маршрут /reset-password
   // const resetPassword = useCallback(
   //    () => {
   //       history.replace({ pathname: '/reset-password' });
   //    },
   //    [history]
   // )

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