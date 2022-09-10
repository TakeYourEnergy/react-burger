import styles from './profile.module.css';
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, FC, ChangeEvent, SyntheticEvent, FormEvent } from 'react';
import { Button, Input, EmailInput, PasswordInput, } from "@ya.praktikum/react-developer-burger-ui-components";
import { getProfileData } from '../../services/actions/login';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileData } from '../../services/actions/login';
import { logOut } from '../../services/actions/login';
import { wsUserConnectionStart, wsUserConnectionClosed } from '../../services/actions/ws-user-action';
import { useAppDispatch, useAppSelector } from '../../utils/types';

const Profile: FC = () => {
   const location = useLocation()
   const getRefreshToken = localStorage.getItem('token')

   const dispatch = useAppDispatch();

   const { user, answer } = useAppSelector(state => ({
      user: state.loginReducer.user,
      answer: state.loginReducer.answer
   }))

   const [nameProfile, setNameProfile] = useState(`${user?.name}`)
   const [emailProfile, setEmailProfile] = useState(`${user?.email}`)
   const [passwordProfile, setPasswordProfile] = useState('')

   const onChangeInputNameProfile = (e: ChangeEvent<HTMLInputElement>) => {
      setNameProfile(e.target.value)
   }

   const onChangeInputEmailProfile = (e: ChangeEvent<HTMLInputElement>) => {
      setEmailProfile(e.target.value)
   }

   const onChangeInputPasswordProfile = (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordProfile(e.target.value)
   }

   //отредактирует информацию на экране профиля и нажмёт «Сохранить»
   const submitProfile = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch(updateProfileData(emailProfile, nameProfile, passwordProfile))
   }

   useEffect(() => {
      dispatch(getProfileData())
   }, [dispatch])

   //выход из профиля
   const signOutProfile = () => {
      dispatch(logOut(getRefreshToken))
   }

   //кнопка отмены -  возвращает информацию о пользователе к исходному значению до редактирования
   const cancellation = (e: SyntheticEvent<Element, Event>) => {
      e.preventDefault()
      user && setNameProfile(user.name)
      user && setEmailProfile(user.email)
      setPasswordProfile('')
   }

   useEffect(() => {
      dispatch(wsUserConnectionStart())

      return () => {
         dispatch(wsUserConnectionClosed())
      }
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
                     activeClassName={styles.activeLink} onClick={signOutProfile}
                     className={`${styles.link} text text_type_main-medium`} exact to='/login' >
                     <p className="text text_type_main-medium">Выход</p>
                  </NavLink>
               </li>
            </ul>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
               В этом разделе вы можете &nbsp; изменить свои персональные данные
            </p>
         </nav>
         <form className={styles.form} name="register" onSubmit={submitProfile}>
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
                  value={emailProfile}
                  onChange={onChangeInputEmailProfile}
                  name={'email'}
                  size={'default'}
               />
            </div>
            <div className={styles.inp}>
               <PasswordInput
                  value={passwordProfile}
                  onChange={onChangeInputPasswordProfile}
                  name={'email'}
                  size={'default'}
               />
            </div>
            <div className={styles.buttons}>
               <Button type="secondary" size="medium" onClick={cancellation}>Отмена</Button>
               <Button disabled={!(nameProfile && emailProfile && passwordProfile)} type="primary" size="medium">Сохранить</Button>
            </div>
         </form >
      </div >
   )
}

export default Profile