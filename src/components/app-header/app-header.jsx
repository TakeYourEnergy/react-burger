import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink, Link } from 'react-router-dom';

const AppHeader = () => {

   return (
      <header className={styles.header}>
         <div className={styles.constructorAndTape}>
            <ul className={styles.list}>
               <li className={`${styles.item} mr-2`}>
                  <NavLink className={`${styles.link} text text_type_main-default`} activeClassName={styles.activeLink} exact to='/'>
                     <BurgerIcon type={"secondary"} />
                     <p className='pl-2'>Конструктор</p>
                  </NavLink>
               </li>
               <li className={styles.item}>
                  <a className={`${styles.link} text text_type_main-default`} href='1' onClick={(e) => e.preventDefault()}>
                     <ListIcon type={"secondary"} />
                     <p className='pl-2'>Лента заказов</p>
                  </a>
               </li>
            </ul>
         </div>
         <Logo />
         <div className={styles.personal}>
            <NavLink className={`${styles.link} text text_type_main-default`} activeClassName={styles.activeLink} exact to='/profile'>
               <ProfileIcon type={"secondary"} />
               <p className='pl-2'>Личный кабинет</p>
            </NavLink>
         </div>
      </header>
   )
}



export default AppHeader
