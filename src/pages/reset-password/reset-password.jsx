import styles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { getNewPassword } from '../../services/actions/login';
import { useAppDispatch, useAppSelector } from '../../services/store';

const ResetPassword = () => {
   const [passwordInput, setPasswordInput] = useState('')
   const [tokenFromLetter, setTokenFromLettert] = useState('')
   const dispatch = useAppDispatch()
   const location = useLocation()
   const frgt = location.state?.frgt

   const { resetPasswordSuccess, user } = useAppSelector(state => ({
      resetPasswordSuccess: state.loginReducer.resetPasswordSuccess,
      user: state.loginReducer.user
   }))

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

   if (resetPasswordSuccess) {
      return (
         <Redirect
            to={{
               pathname: "/login",
            }}
         />
      )
   }

   if (!frgt) {
      return <Redirect to='/forgot-password' />
   }

   if (user) {
      return <Redirect to='/' />
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
