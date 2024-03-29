import { FC, useRef } from 'react';
import styles from './burger-constructor-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";
import { deleteItem } from '../../services/actions/burger-constructor';
import { TIngredient } from '../../utils/types';
import type { Identifier, XYCoord } from 'dnd-core'
import { useAppDispatch } from '../../services/store';

interface IBurgerConstructorList {
   items: TIngredient;
   index: number;
   moveItem: (dragIndex: number, hoverIndex: number) => void
}

interface IDragItem {
   index: number;
   id: string;
   type: string;
}

const BurgerConstructorList: FC<IBurgerConstructorList> = ({ items, index, moveItem }) => {

   const dispatch = useAppDispatch();


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
      hover: (item: IDragItem, monitor) => {
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
         const hoverClientY = clientOffset!.y - hoverBoundingRect.top

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
   const ref = useRef<HTMLDivElement>(null)
   drag(drop(ref));

   return (
      <div className={styles.main} style={{ opacity }} ref={ref}>
         <DragIcon type="primary" />
         <ConstructorElement
            text={items.name}
            price={items.price}
            thumbnail={items.image}
            handleClose={() => {
               dispatch(deleteItem(items))
            }}
         />
      </div>
   )
}

export default BurgerConstructorList

