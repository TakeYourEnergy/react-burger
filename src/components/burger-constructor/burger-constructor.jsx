import React, { useContext, useEffect, useMemo, useState } from "react";
import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { menuItemPropTypes } from "../../utils/prop-types";
import { BurgerContext } from '../../services/burger-context';

const BurgerConstructor = (props) => {
   const data = useContext(BurgerContext)

   const [totalPrice, setTotalPrice] = useState(0)
   useMemo(() => {
      let sum = data.reduce((acc, item) => {
         return item.type !== 'bun'
            ? acc += item.price
            : item.name === 'Краторная булка N-200i' ? acc += 2 * item.price : acc
      }, 0)
      setTotalPrice(sum)
   }, [data])

   return (
      <section className={styles.section}>
         <BurgerConstructorList />
         <div className={styles.ordering}>
            <p className={`${styles.text} text text_type_digits-medium mr-10`}>{totalPrice}<CurrencyIcon type="primary" /></p>
            <Button onClick={() => props.openOrderModal()} type="primary" size="large">Оформить заказ</Button>
         </div>
      </section>
   )
}

export default BurgerConstructor

BurgerConstructor.propTypes = {
   openOrderModal: PropTypes.func.isRequired,
}