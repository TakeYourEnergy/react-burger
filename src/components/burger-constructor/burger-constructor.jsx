import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {
   return (
      <section className={styles.section}>
         <BurgerConstructorList burgerIngr={props.ingredientsData}/>
         <div className={styles.ordering}>
            <p className={`${styles.text} text text_type_digits-medium mr-10`}>610<CurrencyIcon type="primary"/></p>
            <Button onClick={() => props.openOrderModal()} type="primary" size="large">Оформить заказ</Button>
         </div>
      </section>
   )
}

export default BurgerConstructor

BurgerConstructor.propTypes = {
   ingredientsData: PropTypes.arrayOf(PropTypes.object).isRequired,
   openOrderModal: PropTypes.func.isRequired,
}