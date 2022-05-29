import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css'

const AppHeader = () => {
   return (
      <header className={styles.header}>
         <div className={styles.constructorAndTape}>
            <ul className={styles.list}>
               <li className={`${styles.item} mr-2`}>
                  <a className={styles.link} href='1' onClick={(e) => e.preventDefault()}>
                     <BurgerIcon type="primary" />
                     <p className='text text_type_main-default pl-2'>Конструктор</p>
                  </a>
               </li>
               <li className={styles.item}>
                  <a className={styles.link} href='1' onClick={(e) => e.preventDefault()}>
                     <ListIcon type="secondary" />
                     <p className='text text_type_main-default text_color_inactive pl-2'>Лента заказов</p>
                  </a>
               </li>
            </ul>
         </div>
         <Logo />
         <div className={styles.personal}>
            <a className={styles.link} href='1' onClick={(e) => e.preventDefault()}>
               <ProfileIcon type="secondary" />
               <p className='text text_type_main-default text_color_inactive pl-2'>Личный кабинет</p>
            </a>
         </div>
      </header>
   )
}



export default AppHeader
