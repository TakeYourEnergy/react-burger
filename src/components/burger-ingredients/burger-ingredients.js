import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from "../ingredient-item/ingredient-item";


const BurgerIngredients = () => {
   const [current, setCurrent] = React.useState('rolls')

   const scrollIntoViewAdd = (value) => {
      document.querySelector('#ingredients').querySelector(`#${value}`).scrollIntoView({
         behavior: 'smooth'
      })
   }

   return (
      <section className={styles.section}>
         <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
         <div className={styles.tabs}>
            <Tab value="rolls" active={current === 'rolls'} onClick={(value) => { setCurrent(value); scrollIntoViewAdd(value) }}>Булки</Tab>
            <Tab value="sauces" active={current === 'sauces'} onClick={(value) => { setCurrent(value); scrollIntoViewAdd(value) }}>Соусы</Tab>
            <Tab value="toppings" active={current === 'toppings'} onClick={(value) => { setCurrent(value); scrollIntoViewAdd(value) }}>Начинки</Tab>
         </div>
         <div className={styles.ingredients} id='ingredients'>
            <IngredientItem id='rolls' name='Булки' type='bun' />
            <IngredientItem id='sauces' name='Соусы' type='sauce' />
            <IngredientItem id='toppings' name='Начинки' type='main' />
         </div>
      </section>

   )
}

export default BurgerIngredients
