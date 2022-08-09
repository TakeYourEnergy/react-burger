import styles from './orders-information.module.css'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';


const OrdersInformation = ({ orderCreatedAt, orderName, orderNumber, orderIngredients }) => {
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
   

   return (
      <div className={`pt-6 pr-6 pl-6 pb-6 mb-6 ${styles.container}`}>
         <div className={`${styles.orderAndDate}`}>
            <p className="text text_type_digits-default">#{orderNumber}</p>
            <p className="text text_type_main-default text_color_inactive">{getFormatDate(orderCreatedAt)}</p>
         </div>
         <h3 className="text text_type_main-medium mb-6">{orderName}</h3>
         <div className={styles.ingredientsImagesAndPrices}>
            <ul className={styles.ingredientsImages}>
               {
                  filterData && orderIngredients && orderIngredients.length <= 5 && orderIngredients.length > 0 &&
                  filterData.map((item, index) => (
                     <li className={styles.ingredient} key={index}>
                        <div className={styles.box}>
                           <div className={styles.boxImage}>
                              <img className={styles.image} src={item[0].image} alt={item[0].name} />
                           </div>
                        </div>
                     </li>
                  ))
               }
            </ul>
            <div className={styles.ingredientsPrices}></div>
         </div>
      </div>
   )
}

export default OrdersInformation