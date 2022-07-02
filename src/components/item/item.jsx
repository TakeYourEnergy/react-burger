import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './item.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'
import { OPEN_MODAL_INGREDIENT } from '../../services/actions/object-ingredient';


const Item = ({ name, image, price, id }) => {
   const dispatch = useDispatch()

   const openIngredientModal = () => {
      dispatch({ type: OPEN_MODAL_INGREDIENT, idIngredients: id })
   }

   const [count, setCount] = React.useState(0)

   return (
      <div className={styles.item} onClick={() => { setCount(count + 1); openIngredientModal() }}>
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
   id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   image: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
}