import { useMemo, useState, useCallback } from "react";
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
import { ADD_ITEM, MOVE_ITEM } from "../../services/actions/burger-constructor";
import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";


const BurgerConstructor = () => {
   const dispatch = useDispatch()
   const [totalPrice, setTotalPrice] = useState(0)

   const buns = useSelector(state => state.burgerConstructorReducer.buns)
   const mains = useSelector(state => state.burgerConstructorReducer.mains)

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

   //вычисление суммы заказа
   useMemo(() => {
      let sumMains = mains.reduce((acc, item) => acc + item.price, 0)
      let sumBuns = buns.price ? buns.price * 2 : 0
      setTotalPrice(sumMains + sumBuns)
   }, [mains, buns])


   const postOrder = () => {
      if (mains.length && buns.price > 0) {
         const orderArrIdAll = [...mains, buns, buns]
         dispatch(getOrderNumber(orderArrIdAll))
      } else {
         alert('не хватает либо булки, либо нет ингридиентов')
      }
   }

   const moveItem = useCallback((dragIndex, hoverIndex) => {
      dispatch({
         type: MOVE_ITEM,
         dragIndex,
         hoverIndex
      })
   }, [dispatch])

   return (
      <>
         <section ref={dropTarget} className={styles.section}>
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
                  {mains.map((item, index) =>
                     <div key={item.uuid}>
                        <BurgerConstructorList items={item} index={index} moveItem={moveItem} />
                     </div>
                  )}
               </div>

               <div ref={dropTarget} className={`${styles.bun}`}>
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

