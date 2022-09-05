import React, { LegacyRef } from 'react';
import styles from './ingredient-list.module.css';
import Item from '../item/item';
import { useAppSelector } from '../../utils/types';

interface IIngredientList {
   id: string;
   name: string;
   type: string
}

const IngredientList = React.forwardRef((props: IIngredientList, ref: LegacyRef<HTMLDivElement>) => {
   const data = useAppSelector(state => state.ingredientsReducer.ingredients)

   return (
      <>
         <h2 className="text text_type_main-medium mb-6" id={props.id} >{props.name}</h2>
         <div ref={ref} className={styles.items}>
            {data.map((item) => item.type === props.type && <Item item={item} key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} />)}
         </div>
      </>

   )
})

export default IngredientList;
