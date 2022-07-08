import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './item.module.css';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'
import { OPEN_MODAL_INGREDIENT } from '../../services/actions/object-ingredient';
import { useDrag } from "react-dnd";


const Item = ({ name, image, price, id, item }) => {
   const dispatch = useDispatch()

   const [, dragRef] = useDrag({
      type: 'item',
      item: { item }
   })

   let count = 0
   const buns = useSelector(state => state.burgerConstructorReducer.buns)
   const mains = useSelector(state => state.burgerConstructorReducer.mains)
   
   mains.forEach(element => {
      if (item._id === element._id) {
         count++
      }
   });
   if (buns._id === item._id) {
      count++
   }

   const openIngredientModal = () => {
      dispatch({ type: OPEN_MODAL_INGREDIENT, idIngredients: id })
   }

   return (
      <div ref={dragRef} className={styles.item} onClick={() => { openIngredientModal() }}>
         <img className={styles.image} src={image} alt={name} />
         <div className={styles.boxPrice}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type="primary" />
         </div>
         <div className={styles.name}>
            <p className="text text_type_main-default">{name}</p>
         </div>
         {<Counter count={count} size="default" />}
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