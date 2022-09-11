import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

const IngredientDetails = () => {
   const { id } = useParams<{ id: string }>();

   const { isOpened, data } = useAppSelector(state => ({
      isOpened: state.objectIngredient.isOpened,
      data: state.ingredientsReducer.ingredients
   }))

   const elem = data.find((item) => {
      return item._id === id
   })
   return (
      <>
         {elem && (
            <div className={styles.page}>
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
            </div>
         )}

      </>
   )
}

export default IngredientDetails

