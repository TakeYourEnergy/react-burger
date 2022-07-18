import styles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ResetPassword = () => {
   const [passwordInput, setPasswordInput] = useState('')
   const [passwordFromLetter, setPasswordFromLettert] = useState('')

   const emailInputReset = (e) => {
      setPasswordInput(e.target.value)
   }

   const passwordFromLetterInput = (e) => {
      setPasswordFromLettert(e.target.value)
   }

   return (
      <div className={styles.container}>
         <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Восстановление пароля</h2>
         <form className={styles.form}>
            <div className='mb-6'>
               <PasswordInput
                  placeholder='Введите новый пароль'
                  name={"password"}
                  onChange={emailInputReset}
                  value={passwordInput}
                  size={"default"}
                  errorText={"Ошибка"}
                  error={false}
               />
            </div>
            <div className='mb-6'>
               <Input
                  placeholder='Введите код из письма'
                  onChange={passwordFromLetterInput}
                  value={passwordFromLetter}
                  type={"text"}
                  size={"default"}
                  error={false}
                  errorText={"Ошибка"}
               />
            </div>
            <Button disabled={!(passwordInput)} type="primary" size="medium">Сохранить</Button>
         </form>
         <div className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>
            <p className={`${styles.question} text text_type_main-default text_color_inactive`}>Вспомнили пароль?</p>&nbsp;
            <Link className={styles.link} to='/login'>Войти</Link>
         </div>
      </div>
   )
}

export default ResetPassword
