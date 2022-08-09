import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink, useRouteMatch, Link } from 'react-router-dom';

const AppHeader = () => {

   //чтобы закрашивать иконку в нужный нам цвет при активной и неактивной ссылке
   const isConstructor = !!useRouteMatch({ path: "/", exact: true });
   const isOrders = !!useRouteMatch({ path: '/profile/orders', exact: true });
   const isProfile = !!useRouteMatch({ path: '/profile', exact: true });


   return (
      <header className={styles.header}>
         <div className={styles.constructorAndTape}>
            <ul className={styles.list}>
               <li className={`${styles.item} mr-2`}>
                  <NavLink className={`${styles.link} text text_type_main-default`} activeClassName={styles.activeLink} exact to='/'>
                     <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
                     <p className='pl-2'>Конструктор</p>
                  </NavLink>
               </li>
               <li className={styles.item}>
                  <NavLink className={`${styles.link} text text_type_main-default`} activeClassName={styles.activeLink} exact to='/feed'>
                     <ListIcon type={isOrders ? 'primary' : 'secondary'} />
                     <p className='pl-2'>Лента заказов</p>
                  </NavLink>
               </li>
            </ul>
         </div>
         <Link to='/' >
            <Logo />
         </Link>
         <div className={styles.personal}>
            <NavLink className={`${styles.link} text text_type_main-default`} activeClassName={styles.activeLink} exact to='/profile'>
               <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
               <p className='pl-2'>Личный кабинет</p>
            </NavLink>
         </div>
      </header>
   )
}



export default AppHeader
