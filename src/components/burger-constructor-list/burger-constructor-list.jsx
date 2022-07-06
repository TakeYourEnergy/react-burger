import { useContext, useEffect, useRef } from 'react';
import styles from './burger-constructor-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import { DELETE_ITEM } from '../../services/actions/burger-constructor';

const BurgerConstructorList = ({ item, index }) => {
   const dispatch = useDispatch();

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
            handleClose={() => {
               dispatch({
                  type: DELETE_ITEM,
                  payload: item
               })
            }}
         />
      </div>
   )
}

export default BurgerConstructorList

// BurgerConstructorList.propTypes = {
//    burgerIngr: PropTypes.arrayOf(menuItemPropTypes.isRequired).isRequired,
// }