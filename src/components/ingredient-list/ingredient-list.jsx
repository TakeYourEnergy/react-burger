import styles from './ingredient-list.module.css';
import Item from '../item/item';
import PropTypes from 'prop-types';
import React from 'react';


const IngredientList = React.forwardRef((props, ref) => {
   const dataArray = props.ingredientData
   return (
      <>
         <h2 className="text text_type_main-medium mb-6" id={props.id} ref={ref}>{props.name}</h2>
         <div className={styles.items}>
            {dataArray.map((item) => item.type === props.type && <Item key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} openIngredientModal={props.openIngredientModal} />)}
         </div>
      </>

   )
})

export default IngredientList;

IngredientList.propTypes = {
   id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   ingredientData: PropTypes.arrayOf(PropTypes.object).isRequired,
   openIngredientModal: PropTypes.func.isRequired
}