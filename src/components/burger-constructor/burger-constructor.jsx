import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { menuItemPropTypes } from "../../utils/prop-types";

const BurgerConstructor = (props) => {
   return (
      <section className={styles.section}>
         <BurgerConstructorList />
         <div className={styles.ordering}>
            <p className={`${styles.text} text text_type_digits-medium mr-10`}>610<CurrencyIcon type="primary" /></p>
            <Button onClick={() => props.openOrderModal()} type="primary" size="large">Оформить заказ</Button>
         </div>
      </section>
   )
}

export default BurgerConstructor

BurgerConstructor.propTypes = {
   openOrderModal: PropTypes.func.isRequired,
}