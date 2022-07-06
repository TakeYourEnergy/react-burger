import { useContext, useEffect, useRef } from 'react';
import styles from './burger-constructor-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/prop-types';
import { useSelector } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";

const BurgerConstructorList = ({ item, index }) => {
   // const data = useSelector(state => state.ingredientsReducer.ingredients)
   // const bun = { ...data[0] }

   const [, drop] = useDrop({
      accept: 'item',
      hover(item, monitor) {
         console.log(item)
      }
   })

   return (

      <div ref={drop} className={styles.main} >
         <DragIcon type="main" />
         <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image}
         />
      </div>

   )
}

export default BurgerConstructorList

// BurgerConstructorList.propTypes = {
//    burgerIngr: PropTypes.arrayOf(menuItemPropTypes.isRequired).isRequired,
// }