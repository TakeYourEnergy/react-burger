import React, { useContext } from 'react';
import styles from './ingredient-list.module.css';
import Item from '../item/item';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/prop-types';
import { useSelector } from 'react-redux';

const IngredientList = React.forwardRef((props, ref) => {
   const data = useSelector(state => state.ingredientsReducer.ingredients)

   return (
      <>
         <h2 className="text text_type_main-medium mb-6" id={props.id} ref={ref}>{props.name}</h2>
         <div className={styles.items}>
            {data.map((item) => item.type === props.type && <Item key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} />)}
         </div>
      </>

   )
})

export default IngredientList;

IngredientList.propTypes = {
   menuItemPropTypes
}