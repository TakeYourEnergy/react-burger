import styles from './orders-information.module.css'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import cheese from '../../../images/cheese.jpg'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


const OrdersInformation = ({ orderCreatedAt, orderName, orderNumber, orderIngredients, status }) => {
   console.log(status)
   //изменение даты
   const getFormatDate = (string) => {
      return new Date(string).toLocaleString();
   }

   const { data } = useSelector(state => ({
      data: state.ingredientsReducer.ingredients
   })) //ингридиенты в сторе

   //orderIngredients - id заказов
   //для каждого id заказа - нужно найти объект в сторе ингредиентов
   const filterData = useMemo(() => {
      if (orderIngredients) {
         return orderIngredients.map(id => {
            return data.filter(item => item._id === id)
         })
      }
   }, [orderIngredients])


   const totalPrice = useMemo(() => {
      if (orderIngredients) {
         return orderIngredients.reduce((acc, orderIngredient) => {
            const ing = data.find(item => orderIngredient === item._id)
            return ing ? acc + ing.price : acc
         }, 0)
      }
   }, [orderIngredients])


   return (
      <div className={`pt-6 pr-6 pl-6 pb-6 mb-6 ${styles.container}`}>
         <div className={`${styles.orderAndDate}`}>
            <p className="text text_type_digits-default">#{orderNumber}</p>
            <p className="text text_type_main-default text_color_inactive">{getFormatDate(orderCreatedAt)}</p>
         </div>
         <h3 className="text text_type_main-medium">{orderName}</h3>
         {
            status && status !== '' &&
            <p className={`text text_type_main-default ${styles.status}`}>
               {status === 'done' ? 'Выполнен' : status === 'pending' ? 'Готовится' : status === 'created' ? 'Создан' : 'Выполнен'}
            </p>
         }
         <div className={styles.ingredientsImagesAndPrices}>
            <ul className={styles.ingredientsImages}>
               {
                  filterData && orderIngredients && orderIngredients.length <= 5 &&
                  filterData.map((item, index) => (
                     <li className={styles.ingredient} key={index}>
                        <div className={styles.boxImage}>
                           <img className={styles.image} src={item[0].image} alt={item[0].name} />
                        </div>
                     </li>
                  ))
               }

               {
                  filterData && orderIngredients && orderIngredients.length > 6 && (
                     filterData.slice(0, 5).map((item, index) => (
                        <li className={styles.ingredient} key={index}>
                           <div className={styles.boxImage}>
                              <img className={styles.image} src={item[0].image} alt={item[0].name} />
                           </div>
                        </li>
                     ))
                  )
               }

               {
                  filterData && orderIngredients && orderIngredients.length > 6 && (
                     filterData.slice(5, 6).map((_, index) => (
                        <li className={styles.ingredient} key={index}>
                           <div className={styles.cheeseImage}>
                              <img className={styles.cheese} src={cheese} alt="illustration" />
                              <p className={`text text_type_main-default ${styles.number}`}>{`+${orderIngredients.length - 6}`}</p>
                           </div>
                        </li>
                     ))
                  )
               }
            </ul>
            <div className={styles.ingredientsPrices}>
               <p className="text text_type_digits-default mr-2">
                  {totalPrice}
               </p>
               <CurrencyIcon type="primary" />
            </div>
         </div>
      </div>
   )
}

export default OrdersInformation