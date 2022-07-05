import { useMemo, useState } from "react";
import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import Spinner from "../spinner/spinner";
import { useSelector, useDispatch } from 'react-redux';
import { getOrderNumber } from "../../services/actions/order";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { ADD_ITEM } from "../../services/actions/burger-constructor";


const BurgerConstructor = () => {

   const buns = useSelector(state => state.burgerConstructorReducer.buns)
   const mains = useSelector(state => state.burgerConstructorReducer.mains)
   console.log(mains)



   const data = useSelector(state => state.ingredientsReducer.ingredients)
   const bunId = useSelector(state => state.ingredientsReducer.ingredients.find(item => item.name === 'Краторная булка N-200i'))
   //console.log('data>>>', data)

   const [totalPrice, setTotalPrice] = useState(0)

   const dispatch = useDispatch()
   const orderLoading = useSelector(state => state.orderReducer.ingrSpin)
   const isOrderDetailsOpened = useSelector(state => state.orderReducer.isOrderDetailsOpened)

   const [, dropTarget] = useDrop({
      accept: "item",
      drop({ item }) {
         dispatch({
            type: ADD_ITEM,
            payload: { ...item, uuid: uuidv4() }
         })
      },
   });


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
            <div className={styles.box}>
               <div className={`${styles.bun}`}>
                  {buns.type && <ConstructorElement
                     type="top"
                     isLocked={true}
                     text={`${buns.name} (верх)`}
                     price={buns.price}
                     thumbnail={buns.image}
                  />}
               </div>

               <div ref={dropTarget} className={styles.item}>
                  <div>
                     <BurgerConstructorList />
                  </div>
               </div>

               <div className={`${styles.bun}`}>
                  {buns.type && <ConstructorElement
                     type="bottom"
                     isLocked={true}
                     text={`${buns.name} (верх)`}
                     price={buns.price}
                     thumbnail={buns.image}
                  />}
               </div>

            </div>
            <div className={styles.ordering}>
               <p className={`${styles.text} text text_type_digits-medium mr-10`}>{totalPrice}<CurrencyIcon type="primary" /></p>
               <Button onClick={() => postOrder()} type="primary" size="large">Оформить заказ</Button>
            </div>
         </section>
         {orderLoading && <Spinner />}
         {
            isOrderDetailsOpened &&
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

