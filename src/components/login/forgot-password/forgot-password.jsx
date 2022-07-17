import styles from './forgot-password.module.css'
import { useState } from 'react';
import {
   EmailInput,
   Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";



const ForgotPassword = () => {
   const [emailForgot, setEmailForgot] = useState('')


   const emailForgotInput = (e) => {
      setEmailForgot(e.target.value)
   }

   return (
      <div className={styles.container}>
         <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Восстановление пароля</h2>
         <form className={styles.form}>
            <div className='mb-6'>
               <EmailInput
                  placeholder={"Укажите email"}
                  name={"E-mail"}
                  onChange={emailForgotInput}
                  value={emailForgot}
                  error={false}
                  errorText={"Ошибка"}
                  size={"default"}
                  type={"email"}
               />
            </div>
            <Button disabled={!(emailForgot)} type="primary" size="medium" to='/reset-password'>Восстановить</Button>
         </form>
         <div className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>
            <p className={`${styles.question} text text_type_main-default text_color_inactive`}>Вспомнили пароль?</p>&nbsp;
            <Link className={styles.link} to='/login'>Войти</Link>
         </div>
      </div>
   )
}

export default ForgotPassword