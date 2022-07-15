import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink, Link } from 'react-router-dom';

const AppHeader = () => {
   return (
      <header className={styles.header}>
         <div className={styles.constructorAndTape}>
            <ul className={styles.list}>
               <li className={`${styles.item} mr-2`}>
                  <Link className={styles.link} to='/'>
                     <BurgerIcon type="primary" />
                     <p className='text text_type_main-default pl-2'>Конструктор</p>
                  </Link>
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
            <Link className={styles.link} to='/login'>
               <ProfileIcon type="secondary" />
               <p className='text text_type_main-default text_color_inactive pl-2'>Личный кабинет</p>
            </Link>
         </div>
      </header>
   )
}



export default AppHeader
