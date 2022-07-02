import { useMemo, useState } from "react";
import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrder } from "../../utils/api";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import Spinner from "../spinner/spinner";
import { useSelector, useDispatch } from 'react-redux';
import { getOrderNumber } from "../../services/actions/order";

const BurgerConstructor = () => {

   const data = useSelector(state => state.ingredientsReducer.ingredients)
   const bunId = useSelector(state => state.ingredientsReducer.ingredients.find(item => item.name === 'Краторная булка N-200i'))
   //console.log('data>>>', data)

   const [totalPrice, setTotalPrice] = useState(0)
   const [order, setOrder] = useState({ orderId: null, loading: false })
   const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);

   const dispatch = useDispatch()
   //const state = useSelector(state => console.log(state))

   useMemo(() => {
      let sum = data.reduce((acc, item) => {
         return item.type !== 'bun'
            ? acc += item.price
            : item.name === 'Краторная булка N-200i' ? acc += 2 * item.price : acc
      }, 0)
      setTotalPrice(sum)
   }, [data])

   const closeModalOrder = () => {
      setIsOrderDetailsOpened(false);
   }

   const openOrderModal = () => {
      setIsOrderDetailsOpened(true)
   }

   const dataId = data.map(item => item._id) //без одной булки
   //console.log('dataID>>>', dataId)

   const showLoading = () => {
      setOrder({
         ...order,
         loading: true
      })
   }


   const postOrder = () => {
      showLoading()

      if ({ ...bunId }._id !== 'undefined') {
         const orderArrIdAll = [...dataId, { ...bunId }._id]
         dispatch(getOrderNumber(orderArrIdAll))
      }

      getOrder(dataId)
         .then(res => setOrder({ orderId: res.order.number, loading: false }))
         .catch(err => console.error(err))
         .finally(() => openOrderModal())
   }

   return (
      <>
         <section className={styles.section}>
            <BurgerConstructorList />
            <div className={styles.ordering}>
               <p className={`${styles.text} text text_type_digits-medium mr-10`}>{totalPrice}<CurrencyIcon type="primary" /></p>
               <Button onClick={() => postOrder()} type="primary" size="large">Оформить заказ</Button>
            </div>
         </section>
         {order.loading && <Spinner />}
         {isOrderDetailsOpened &&
            <Modal
               onCloseOrder={closeModalOrder}
               title=''
            >
               <OrderDetails order={order.orderId} />
            </Modal>
         }
      </>
   )
}

export default BurgerConstructor

