import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from "../ingredient-item/ingredient-item";



const BurgerIngredients = () => {
   const [current, setCurrent] = React.useState('rolls')

   return (
      <section className={styles.section}>
         <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
         <div className={styles.tabs}>
            <Tab value="rolls" active={current === 'rolls'} onClick={setCurrent}>Булки</Tab>
            <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
            <Tab value="toppings" active={current === 'toppings'} onClick={setCurrent}>Начинки</Tab>
         </div>
         <div className={styles.ingredients}>
            <IngredientItem name='Булки' type='bun'/>
            <IngredientItem name='Соусы' type='sauce'/>
            <IngredientItem name='Начинки' type='main'/>
         </div>
      </section>

   )
}

export default BurgerIngredients
