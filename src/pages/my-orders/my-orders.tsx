import styles from './my-orders.module.css'
import { NavLink, useLocation, Route, Switch } from "react-router-dom"
import { logOut } from '../../services/actions/login'
import { useEffect } from 'react'
import { wsUserConnectionStart } from '../../services/actions/ws-user-action'
import { wsUserConnectionClosed } from '../../services/actions/ws-user-action'
import PageCardOrder from '../page-card-order/page-card-order'
import { useAppDispatch, useAppSelector } from '../../services/store'


interface ILocation {
   background: {
      pathname: string;
      search: string;
      hash: string;
      state: null;
      key: string;
   }
   from: string;
   state?: object;
};

export const MyOrders = () => {
   const dispatch = useAppDispatch()
   const location = useLocation<ILocation>()
   const background = location.state?.background
   const getRefreshToken = localStorage.getItem('token')


   useEffect(() => {
      dispatch(wsUserConnectionStart())

      return () => {
         dispatch(wsUserConnectionClosed())
      }
   }, [dispatch])

   const myOrders = useAppSelector(state => state.wsUserReducer.orders)

   //выход из профиля
   const signOutProfile = () => {
      dispatch(logOut(getRefreshToken))
   }

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
         <Switch location={background || location}>
            <Route exact path='/profile/orders'>
               <div className={styles.box}>
                  <div className={`${styles.item} pl-2 pr-2`}>
                     <PageCardOrder />
                  </div>
               </div>
            </Route>
         </Switch>
      </div >
   )
}


export default MyOrders