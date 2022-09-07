import IngredientDetails from "../../components/ingredient-details/ingredient-details"
import styles from './ingredientPages.module.css'


const IngredientPages = () => {
   return (
      <div className={styles.page}>
         <h1 className='text text_type_main-large mt-20'>Детали ингредиента</h1>
         <IngredientDetails />
      </div>

   )
}

export default IngredientPages