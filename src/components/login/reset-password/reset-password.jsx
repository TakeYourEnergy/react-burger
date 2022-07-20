import styles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewPassword } from '../../../services/actions/login';

const ResetPassword = () => {
   const [passwordInput, setPasswordInput] = useState('')
   const [tokenFromLetter, setTokenFromLettert] = useState('')
   const dispatch = useDispatch()

   const emailInputReset = (e) => {
      setPasswordInput(e.target.value)
   }

   const tokenFromLetterInput = (e) => {
      setTokenFromLettert(e.target.value)
   }

   const resetPasswordForm = (e) => {
      e.preventDefault();
      dispatch(getNewPassword(passwordInput, tokenFromLetter))

   }

   return (
      <div className={styles.container}>
         <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Восстановление пароля</h2>
         <form className={styles.form} onSubmit={resetPasswordForm}>
            <div className='mb-6'>
               <Input
                  placeholder='Введите новый пароль'
                  name={"password"}
                  onChange={emailInputReset}
                  value={passwordInput}
                  size={"default"}
                  errorText={"Ошибка"}
                  error={false}
                  icon={'ShowIcon'}
               />
            </div>
            <div className='mb-6'>
               <Input
                  placeholder='Введите код из письма'
                  onChange={tokenFromLetterInput}
                  value={tokenFromLetter}
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
