import styles from './profile.module.css';
import { NavLink } from "react-router-dom";


const Profile = () => {
   return (
      <div className={styles.profile}>
         <nav className={styles.navigation}>
            <ul className={styles.list}>
               <li className={styles.item}>
                  <NavLink
                     className={`${styles.link} text text_type_main-medium`}
                     activeClassName={styles.linkActive} exact to='/profile'>
                     <p className="text text_type_main-medium">Профиль</p>
                  </NavLink>
               </li>
               <li className={styles.item}>
                  <NavLink
                     activeClassName={styles.linkActive}
                     className={`${styles.link} text text_type_main-medium`} to='/profile/orders'>
                     <p className="text text_type_main-medium">История заказов</p>
                  </NavLink>
               </li>
               <li className={styles.item}>
                  <NavLink
                     activeClassName={styles.linkActive}
                     className={`${styles.link} text text_type_main-medium`} to='/login' >
                     <p className="text text_type_main-medium">Выход</p>
                  </NavLink>
               </li>
            </ul>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
               В этом разделе вы можете изменить свои персональные данные
            </p>
         </nav>
      </div>
   )
}

export default Profile