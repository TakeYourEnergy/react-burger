import React, { useRef, useEffect } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientList from "../ingredient-list/ingredient-list";
import PropTypes from 'prop-types';
import { menuItemPropTypes } from "../../utils/prop-types";

const BurgerIngredients = (props) => {
   const [current, setCurrent] = React.useState('rolls')

   const rollsRef = useRef(null)
   const saucesRef = useRef(null)
   const toppingsRef = useRef(null)

   useEffect(() => {
      switch (current) {
         case "rolls":
            rollsRef.current.scrollIntoView({ behavior: 'smooth' })
            break;
         case "sauces":
            saucesRef.current.scrollIntoView({ behavior: 'smooth' })
            break;
         case "toppings":
            toppingsRef.current.scrollIntoView({ behavior: 'smooth' })
            break;
      }
   }, [current])

   return (
      <section className={styles.section}>
         <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
         <div className={styles.tabs}>
            <div className={styles.tab}>
               <Tab value="rolls" active={current === 'rolls'} onClick={setCurrent}>Булки</Tab>
            </div>
            <div className={styles.tab}>
               <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
            </div>
            <div className={styles.tab}>
               <Tab value="toppings" active={current === 'toppings'} onClick={setCurrent}>Начинки</Tab>
            </div>
         </div>
         <div className={styles.ingredients} id='ingredients'>
            <IngredientList id='rolls' name='Булки' type='bun' ref={rollsRef} ingredientData={props.ingredientsData} openIngredientModal={props.openIngredientModal} />
            <IngredientList id='sauces' name='Соусы' type='sauce' ref={saucesRef} ingredientData={props.ingredientsData} openIngredientModal={props.openIngredientModal} />
            <IngredientList id='toppings' name='Начинки' type='main' ref={toppingsRef} ingredientData={props.ingredientsData} openIngredientModal={props.openIngredientModal} />
         </div>
      </section>

   )
}

export default BurgerIngredients


BurgerIngredients.propTypes = {
   ingredientsData: PropTypes.arrayOf(menuItemPropTypes.isRequired).isRequired,
   openIngredientModal: PropTypes.func.isRequired
}