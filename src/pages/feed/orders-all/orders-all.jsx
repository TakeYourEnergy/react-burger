import styles from './orders-all.module.css'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

const OrdersAll = () => {
   const { orders, total, totalToday } = useSelector(state => ({
      orders: state.wsReducer.orders,
      total: state.wsReducer.total,
      totalToday: state.wsReducer.totalToday
   }))


   const doneOrders = useMemo(() => {
      if (orders) {
         return orders.filter(item => item.status === 'done').filter((_, index) => index < 6)
      }
   }, [orders])

   const noDoneOrders = useMemo(() => {
      if (orders) {
         return orders.filter(item => item.status !== 'done')
      }
   }, [orders])


   return (
      <div className={styles.container}>
         <div className={styles.readyAndInWork}>
            <div className={styles.ready}>
               <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
               {
                  doneOrders &&
                  doneOrders.map(item => (
                     <div className={`${styles.readyNumber} text text_type_digits-default mb-2`} key={item.number}>{item.number}</div>
                  ))
               }
            </div>
            <div className={styles.inWork}>
               <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
               {
                  noDoneOrders &&
                  noDoneOrders.map(item => (
                     <div className={`text text_type_digits-default mb-2`} key={item.number}>{item.number}</div>
                  ))
               }
            </div>
         </div>
         <div className={styles.readyAllTime}>
            <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
            <div>
               {
                  total && total !== 0 &&
                  <p className={`${styles.totalNumber} text text_type_digits-large `}>{total}</p>
               }
            </div>
         </div>
         <div className={styles.readyToday}>
            <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
            <div>
               {
                  totalToday && totalToday !== 0 &&
                  <p className={`${styles.totalToday} text text_type_digits-large `}>{totalToday}</p>
               }
            </div>
         </div>
      </div>
   )
}

export default OrdersAll