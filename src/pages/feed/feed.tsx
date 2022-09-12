import { useEffect } from 'react'
import styles from './feed.module.css'
import OrdersAll from './orders-all/orders-all'
import { wsConnectionOpen, wsConnectionClosed } from '../../services/actions/wsAction'
import PageCardOrder from '../page-card-order/page-card-order'
import { useAppDispatch } from '../../services/store'

const Feed = () => {
   const dispatch = useAppDispatch();

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
               <PageCardOrder />
            </div>
            <div className={styles.ordersAll}>
               <OrdersAll />
            </div>
         </div>
      </section>
   )
}

export default Feed