import React, { useContext, useEffect, useMemo, useState } from "react";
import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { menuItemPropTypes } from "../../utils/prop-types";
import { BurgerContext } from '../../services/burger-context';
import { getOrder } from "../../utils/api";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = () => {

   const data = useContext(BurgerContext)
   const [totalPrice, setTotalPrice] = useState(0)
   const [order, setOrder] = useState()
   const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);

   useMemo(() => {
      let sum = data.reduce((acc, item) => {
         return item.type !== 'bun'
            ? acc += item.price
            : item.name === 'Краторная булка N-200i' ? acc += 2 * item.price : acc
      }, 0)
      setTotalPrice(sum)
   }, [data])

   const closeModal = () => {
      setIsOrderDetailsOpened(false);
   }

   const openOrderModal = () => {
      setIsOrderDetailsOpened(true)
   }

   const dataId = data.map(item => item._id)

   const postOrder = () => {
      openOrderModal()
      getOrder(dataId)
         .then(res => setOrder(res.order.number))
         .catch(err => console.error(err))
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

         {isOrderDetailsOpened &&
            <Modal
               onOverlayClick={closeModal}
               onEscKeydown={(e) => e.key === "Escape" && closeModal()}
               title=''
            >
               <OrderDetails order={order} />
            </Modal>
         }
      </>
   )
}

export default BurgerConstructor

