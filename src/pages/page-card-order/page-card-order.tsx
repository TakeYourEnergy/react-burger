import { Link, useLocation, useRouteMatch } from 'react-router-dom'
import { useAppSelector } from '../../services/store';
import OrdersInformation from "../feed/orders-information/orders-information";
import styles from './page-card-order.module.css'

const PageCardOrder = () => {

   const { orders, myOrders } = useAppSelector(state => ({
      orders: state.wsReducer.orders,
      myOrders: state.wsUserReducer.orders
   }))
   const location = useLocation()
   const profileOrdersPath = '/profile/orders'

   let match = useRouteMatch()

   let isProfileOrdersPath = match.path === profileOrdersPath
   let ordersState = !isProfileOrdersPath ? orders : myOrders
   let initPath = !isProfileOrdersPath ? '/feed/' : '/profile/orders/'


   return (
      <>
         {
            ordersState && ordersState.map((order, index) => (
               <Link
                  key={order._id}
                  className={styles.link}
                  to={{
                     pathname: `${initPath}${order._id}`,
                     state: { background: location }
                  }}>

                  {
                     isProfileOrdersPath === false &&
                     <OrdersInformation
                        orderCreatedAt={order.createdAt}
                        orderName={order.name}
                        orderNumber={order.number}
                        orderIngredients={order.ingredients}
                        status={''}
                     />
                  }

                  {
                     isProfileOrdersPath === true &&
                     <OrdersInformation
                        orderCreatedAt={order.createdAt}
                        orderName={order.name}
                        orderNumber={order.number}
                        orderIngredients={order.ingredients}
                        status={order.status}
                     />
                  }
               </Link>
            ))
         }
      </>
   )
}


export default PageCardOrder