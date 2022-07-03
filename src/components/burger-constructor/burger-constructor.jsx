import { useMemo, useState } from "react";
import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
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

   const dispatch = useDispatch()
   const orderLoading = useSelector(state => state.orderReducer.ingrSpin)
   const isOrderDetailsOpened = useSelector(state => state.orderReducer.isOrderDetailsOpened)

   useMemo(() => {
      let sum = data.reduce((acc, item) => {
         return item.type !== 'bun'
            ? acc += item.price
            : item.name === 'Краторная булка N-200i' ? acc += 2 * item.price : acc
      }, 0)
      setTotalPrice(sum)
   }, [data])

   const dataId = data.map(item => item._id) //без одной булки
   //console.log('dataID>>>', dataId)


   const postOrder = () => {
      if ({ ...bunId }._id !== 'undefined') {
         const orderArrIdAll = [...dataId, { ...bunId }._id]
         dispatch(getOrderNumber(orderArrIdAll))
      }
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
         {orderLoading && <Spinner />}
         {isOrderDetailsOpened &&
            <Modal
               title=''
            >
               <OrderDetails />
            </Modal>
         }
      </>
   )
}

export default BurgerConstructor

