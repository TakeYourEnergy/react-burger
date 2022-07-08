import { useRef, useEffect, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientList from "../ingredient-list/ingredient-list";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from "react-intersection-observer";
import { CLOSE_MODAL_INGREDIENT } from "../../services/actions/object-ingredient";
import { NUMBER_NULL } from "../../services/actions/order";

const BurgerIngredients = () => {

   const [current, setCurrent] = useState('rolls')

   const [rollsRef, inViewBuns] = useInView({ threshold: 0.3 })
   const [saucesRef, inViewSauces] = useInView({ threshold: 0.3 })
   const [toppingsRef, inViewToppings] = useInView({ threshold: 0.3 })

   const isOpened = useSelector((state) => state.objectIngredient.isOpened)

   const dispatch = useDispatch()

   const onClose = () => {
      dispatch({ type: CLOSE_MODAL_INGREDIENT })
      //dispatch({ type: NUMBER_NULL })
   }

   useEffect(() => {
      if (inViewBuns) { setCurrent('rolls') }
      else if (inViewSauces) { setCurrent('sauces') }
      else if (inViewToppings) { setCurrent('toppings') }
   }, [inViewBuns, inViewSauces, inViewToppings])

   const setScroll = (value) => {
      document.getElementById(value).scrollIntoView({ behavior: "smooth", block: 'start' })
   }

   return (
      <>
         <section className={styles.section}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={styles.tabs}>
               <div className={styles.tab}>
                  <Tab value="rolls" active={current === 'rolls'} onClick={() => setScroll('rolls')}>Булки</Tab>
               </div>
               <div className={styles.tab}>
                  <Tab value="sauces" active={current === 'sauces'} onClick={() => setScroll('sauces')}>Соусы</Tab>
               </div>
               <div className={styles.tab}>
                  <Tab value="toppings" active={current === 'toppings'} onClick={() => setScroll('toppings')}>Начинки</Tab>
               </div>
            </div>
            <div className={styles.ingredients} id='ingredients'>
               <IngredientList id='rolls' name='Булки' type='bun' ref={rollsRef} />
               <IngredientList id='sauces' name='Соусы' type='sauce' ref={saucesRef} />
               <IngredientList id='toppings' name='Начинки' type='main' ref={toppingsRef} />
            </div>
         </section>

         {isOpened &&
            <Modal
               title="Детали ингредиента" onClose={onClose}
            >
               <IngredientDetails />
            </Modal>
         }
      </>
   )
}

export default BurgerIngredients
