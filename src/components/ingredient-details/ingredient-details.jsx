import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const IngredientDetails = () => {
   const { id } = useParams();

   const data = useSelector(state => state.ingredientsReducer.ingredients)

   const elem = data.find((item) => {
      return item._id === id
   })
   return (
      <>
         <img className={styles.img} src={elem.image_large} alt="img" />
         <div className={styles.box}>
            <h3 className={`text text_type_main-medium ${styles.title}`}>{elem.name}</h3>
            <div className={styles.description}>
               <div className={styles.text}>
                  <p className={`text text_type_main-default ${styles.name}`}>Калории,ккал</p>
                  <p className={styles.number}>{elem.calories}</p>
               </div>
               <div className={styles.text}>
                  <p className={`text text_type_main-default ${styles.name}`}>Белки, г</p>
                  <p className={styles.number}>{elem.proteins}</p>
               </div>
               <div className={styles.text}>
                  <p className={`text text_type_main-default ${styles.name}`}>Жиры, г</p>
                  <p className={styles.number}>{elem.fat}</p>
               </div>
               <div className={styles.text}>
                  <p className={`text text_type_main-default ${styles.name}`}>Углеводы, г</p>
                  <p className={styles.number}>{elem.carbohydrates}</p>
               </div>
            </div>
         </div>
      </>
   )
}

export default IngredientDetails

