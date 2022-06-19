import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './item.module.css';
import React from 'react';
import PropTypes from 'prop-types';


const Item = ({ name, image, price, openIngredientModal, id }) => {

   const [count, setCount] = React.useState(0)

   return (
      <div className={styles.item} onClick={() => { setCount(count + 1); openIngredientModal(id) }}>
         <img className={styles.image} src={image} alt={name} />
         <div className={styles.boxPrice}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type="primary" />
         </div>
         <div className={styles.name}>
            <p className="text text_type_main-default">{name}</p>
         </div>
         {count > 0 && <Counter count={count} size="default" />}
      </div>
   )
}

export default Item

Item.propTypes = {
   openIngredientModal: PropTypes.func.isRequired,
   id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   image: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
}