import { useMemo, useState, useCallback } from "react";
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import Spinner from "../spinner/spinner";
import { getOrderNumber, numberNull } from "../../services/actions/order";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";
import { useHistory } from "react-router-dom";
import { addItem, moveItemActionCreator } from "../../services/actions/burger-constructor";
import { TIngredient } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../services/store";


const BurgerConstructor = () => {
   const dispatch = useAppDispatch()
   const [totalPrice, setTotalPrice] = useState(0)

   const { buns, mains, user } = useAppSelector(state => ({
      buns: state.burgerConstructorReducer.buns,
      mains: state.burgerConstructorReducer.mains,
      user: state.loginReducer.user
   }))


   const orderLoading = useAppSelector(state => state.orderReducer.ingrSpin)
   const isOrderDetailsOpened = useAppSelector(state => state.orderReducer.isOrderDetailsOpened)

   const [, dropTarget] = useDrop({
      accept: "item",
      drop({ item }: { item: TIngredient }) {
         dispatch(addItem(item))
      },
   });

   const onClose = () => {
      dispatch(numberNull())
   }

   //вычисление суммы заказа
   useMemo(() => {
      let sumMains = mains.reduce((acc, item) => acc + item.price, 0)
      let sumBuns = buns.price ? buns.price * 2 : 0
      setTotalPrice(sumMains + sumBuns)
   }, [mains, buns])

   const history = useHistory();

   const postOrder = () => {
      if (user) {
         if (mains.length && buns.price > 0) {
            const orderArrIdAll = [...mains, buns, buns]
            dispatch(getOrderNumber(orderArrIdAll))
         } else {
            alert('не хватает либо булки, либо нет ингредиентов')
         }
      } else {
         history.push('/login')
      }

   }

   const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
      dispatch(moveItemActionCreator(dragIndex, hoverIndex))
   }, [dispatch])

   return (
      <>
         <section ref={dropTarget} className={styles.section}>
            <div className={styles.box}>
               <div className={`${styles.bun}`}>
                  {buns.type ? (<ConstructorElement
                     type="top"
                     isLocked={true}
                     text={`${buns.name} (верх)`}
                     price={buns.price}
                     thumbnail={buns.image}
                  />) :
                     <p className="text text_type_digits-default text_color_inactive pt-8 pl-3">Перенесите булку</p>}
               </div>

               <div className={styles.item}>
                  {mains.length > 0 ? (mains.map((item, index) =>
                     <div key={item.uuid}>
                        <BurgerConstructorList items={item} index={index} moveItem={moveItem} />
                     </div>
                  )) :
                     <p className="text text_type_digits-default text_color_inactive pt-8 pb-8 pl-10">Перенесите начинки и соусы</p>}
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
               title='' onClose={onClose}
            >
               <OrderDetails />
            </Modal>
         }
      </>
   )
}

export default BurgerConstructor

