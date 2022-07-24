import styles from './profile.module.css';
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Button, Input, EmailInput, PasswordInput, } from "@ya.praktikum/react-developer-burger-ui-components";
import { getProfileData } from '../../services/actions/login';
import { useDispatch, useSelector } from 'react-redux';


const Profile = () => {
   const [nameProfile, setNameProfile] = useState('')
   const [emailProfile, setEmailProfile] = useState('')
   const [passwordProfile, setPasswordProfile] = useState('')
   //const [form, setFormValue] = useState({ name: "", email: "", password: "" });

   const dispatch = useDispatch();
   const { user, answer } = useSelector(state => ({
      user: state.loginReducer.user,
      answer: state.loginReducer.answer
   }))


   const onChangeInputNameProfile = (e) => {
      setNameProfile(e.target.value)
   }

   const onChangeInputEmailProfile = (e) => {
      setEmailProfile(e.target.value)
   }

   const onChangeInputPasswordProfile = (e) => {
      setPasswordProfile(e.target.value)
   }

   useEffect(() => {
      dispatch(getProfileData())
      // if (answer) {
      //    setFormValue({ name: user.name, email: user.email, password: "" });
      // }
   }, [dispatch])

   return (
      <div className={styles.profile}>
         <nav className={styles.navigation}>
            <ul className={styles.list}>
               <li className={styles.item}>
                  <NavLink
                     className={`${styles.link} text text_type_main-medium`}
                     activeClassName={styles.activeLink} exact to='/profile'>
                     <p className="text text_type_main-medium">Профиль</p>
                  </NavLink>
               </li>
               <li className={styles.item}>
                  <NavLink
                     activeClassName={styles.activeLink}
                     className={`${styles.link} text text_type_main-medium`} exact to='/profile/orders'>
                     <p className="text text_type_main-medium">История заказов</p>
                  </NavLink>
               </li>
               <li className={styles.item}>
                  <NavLink
                     activeClassName={styles.activeLink}
                     className={`${styles.link} text text_type_main-medium`} exact to='/login' >
                     <p className="text text_type_main-medium">Выход</p>
                  </NavLink>
               </li>
            </ul>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
               В этом разделе вы можете &nbsp; изменить свои персональные данные
            </p>
         </nav>
         <form className={styles.form} name="register" >
            <div className={styles.inp}>
               <Input
                  type={'text'}
                  placeholder={'Имя'}
                  value={nameProfile}
                  onChange={onChangeInputNameProfile}
                  name={'name'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'}
                  icon={'EditIcon'}
               />
            </div>
            <div className={styles.inp}>
               <EmailInput
                  type={'email'}
                  placeholder={'Логин'}
                  value={emailProfile}
                  onChange={onChangeInputEmailProfile}
                  name={'email'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'}
               />
            </div>
            <div className={styles.inp}>
               <PasswordInput
                  type={'email'}
                  placeholder={'Логин'}
                  value={passwordProfile}
                  onChange={onChangeInputPasswordProfile}
                  name={'email'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'}
               />
            </div>
            <div className={styles.buttons}>
               <Button type="secondary" size="medium">Отмена</Button>
               <Button disabled={!(nameProfile && emailProfile && passwordProfile)} type="primary" size="medium">Сохранить</Button>
            </div>
         </form >
      </div >
   )
}

export default Profile