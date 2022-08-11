import { useEffect } from 'react'
import styles from './feed.module.css'
import OrdersInformation from './orders-information/orders-information'
import OrdersAll from './orders-all/orders-all'
import { useDispatch, useSelector } from 'react-redux'
import { wsConnectionOpen, wsConnectionClosed } from '../../services/actions/wsAction'
import { Link, useLocation, useRouteMatch } from 'react-router-dom'


const Feed = () => {
   const { orders, wsConnected } = useSelector(state => ({
      orders: state.wsReducer.orders,
      wsConnected: state.wsReducer.wsConnected
   }))


   const dispatch = useDispatch();
   const location = useLocation();

   useEffect(() => {
      dispatch(wsConnectionOpen())

      return () => {
         dispatch(wsConnectionClosed())
      }
   }, [dispatch])


   return (
      <section className={styles.ordersFeed}>
         <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
         <div className={styles.container}>
            <div className={styles.ordersInformation}>
               {
                  orders && orders.map((order, index) => (
                     <Link
                        key={order._id}
                        className={styles.link}
                        to={{
                           pathname: `/feed/${order._id}`,
                           state: { background: location }
                        }}>

                        <OrdersInformation
                           orderCreatedAt={order.createdAt}
                           orderName={order.name}
                           orderNumber={order.number}
                           orderIngredients={order.ingredients}
                        />
                     </Link>
                  ))
               }
               <OrdersInformation />
            </div>
            <div className={styles.ordersAll}>
               <OrdersAll />
            </div>
         </div>
      </section>
   )
}

export default Feed