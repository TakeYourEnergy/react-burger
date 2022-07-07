import { useRef } from 'react';
import styles from './burger-constructor-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/prop-types';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import { DELETE_ITEM } from '../../services/actions/burger-constructor';

const BurgerConstructorList = ({ items, index, moveItem }) => {
   const dispatch = useDispatch();

   const [{ isDragging }, drag] = useDrag({
      type: 'ing',
      item: () => {
         return { index }
      },
      collect: (monitor) => ({
         isDragging: monitor.isDragging(),
      }),
   })
   const [, drop] = useDrop({
      accept: 'ing',
      hover: (item, monitor) => {
         if (!ref.current) {
            return
         }
         const dragIndex = item.index
         const hoverIndex = index

         if (dragIndex === hoverIndex) {
            return
         }
         // прямоугольник на экране
         const hoverBoundingRect = ref.current?.getBoundingClientRect()
         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
         const clientOffset = monitor.getClientOffset()
         const hoverClientY = clientOffset.y - hoverBoundingRect.top

         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
         }
         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
         }
         moveItem(dragIndex, hoverIndex)

         item.index = hoverIndex
      }
   })
   const opacity = isDragging ? 0 : 1
   const ref = useRef(null)
   drag(drop(ref));

   return (
      <div className={styles.main} style={{ opacity }} ref={ref}>
         <DragIcon type="main" />
         <ConstructorElement
            text={items.name}
            price={items.price}
            thumbnail={items.image}
            handleClose={() => {
               dispatch({
                  type: DELETE_ITEM,
                  payload: items
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