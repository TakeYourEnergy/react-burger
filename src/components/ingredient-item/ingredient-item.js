import styles from './ingredient-item.module.css';
import data from '../../utils/data';
import Item from '../item/item';
import PropTypes from 'prop-types';


const IngredientItem = (props) => {
   return (
      <>
         <h2 className="text text_type_main-medium mb-6" id={props.id}>{props.name}</h2>
         <div className={styles.items}>
            {data.map((item) => item.type === props.type && <Item key={item._id} name={item.name} image={item.image} price={item.price} />)}
         </div>
      </>

   )
}

export default IngredientItem;

IngredientItem.propTypes = {
   id: PropTypes.string,
   name: PropTypes.string,
   type: PropTypes.string
}