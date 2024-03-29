import { useRef, useEffect, useState, FC } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientList from "../ingredient-list/ingredient-list";
import { useInView } from "react-intersection-observer";

declare module 'react' {
   interface FunctionComponent<P = {}> {
      (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
   }
}

const BurgerIngredients: FC = () => {

   const [current, setCurrent] = useState('rolls')

   const [rollsRef, inViewBuns] = useInView({ threshold: 0.3 })
   const [saucesRef, inViewSauces] = useInView({ threshold: 0.3 })
   const [toppingsRef, inViewToppings] = useInView({ threshold: 0.3 })


   useEffect(() => {
      if (inViewBuns) { setCurrent('rolls') }
      else if (inViewSauces) { setCurrent('sauces') }
      else if (inViewToppings) { setCurrent('toppings') }
   }, [inViewBuns, inViewSauces, inViewToppings])

   const setScroll = (value: string) => {
      document.getElementById(value)?.scrollIntoView({ behavior: "smooth", block: 'start' })
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

      </>
   )
}

export default BurgerIngredients
