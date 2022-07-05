import { useContext, useEffect } from 'react';
import styles from './burger-constructor-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/prop-types';
import { useSelector } from 'react-redux';

const BurgerConstructorList = () => {
   // const data = useSelector(state => state.ingredientsReducer.ingredients)
   // const bun = { ...data[0] }

   return (

      <div className={styles.main} >
         <DragIcon type="main" />
         <ConstructorElement
            text="dsadasd"
            price={50}
         //thumbnail={item.image_mobile}
         />
      </div>

   )
}

export default BurgerConstructorList

// BurgerConstructorList.propTypes = {
//    burgerIngr: PropTypes.arrayOf(menuItemPropTypes.isRequired).isRequired,
// }