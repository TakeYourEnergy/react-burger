import { useSelector } from 'react-redux'
import styles from './modal-information-about-order.module.css'
import { useParams, useRouteMatch } from 'react-router-dom';
import { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient, useAppSelector } from '../../utils/types';


const ModalInformationAboutOrder = () => {
   const { id } = useParams<{ id: string }>();

   //data - все ингредиенты
   //orders - все заказы
   const { orders, data, myOrders } = useAppSelector(state => ({
      orders: state.wsReducer.orders,
      data: state.ingredientsReducer.ingredients,
      myOrders: state.wsUserReducer.orders
   }))

   const profileOrdersPath = '/profile/orders/:id'


   let match = useRouteMatch()
   let isProfileOrdersPath = match.path === profileOrdersPath

   let usedOrders = isProfileOrdersPath ? myOrders : orders;

   //заказ по id
   const order = useMemo(() => {
      if (usedOrders) {
         return usedOrders.find((order) => order._id === id)
      }
   }, [usedOrders, id]);


   //уникальные id
   const uniqueArrWithOrdersId = [...new Set(order?.ingredients)]
   //ингредиенты в соответсвии с уникальными id
   const uniqueArrWithIngredients = uniqueArrWithOrdersId.map(id => data.find(ingredient => ingredient._id === id))

   //подсчет одинаковых id в массиве order.ingredients
   const countId: any = useMemo(() => {
      if (order) {
         const objWithId = order.ingredients.reduce<Record<string, number>>((acc, item) => {
            if (!acc[item]) {
               acc[item] = 1;
            } else {
               acc[item] += 1;
            }
            return acc;
         }, {})
         return objWithId
      }

   }, [order])


   const date = (str: string) => {
      return new Date(str).toLocaleString();
   }


   const fullPrice = useMemo(() => {
      if (order && data) {
         const arrWithIngr = order.ingredients.map(id => {
            return data.find(ing => ing._id === id)
         })
         const sum = arrWithIngr.reduce((acc, item: any) => {
            return acc + item.price
         }, 0)
         return sum
      }
   }, [order, data])


   return (
      <>
         {order && (
            <div className={styles.page}>
               <p className={`${styles.number} text text_type_digits-default mb-10`}>#{order.number}</p>
               <h3 className="text text_type_main-medium mb-3">{order.name}</h3>
               <p className={`${styles.status} text text_type_main-default mb-15`}>
                  {order?.status === 'done' ? 'Выполнен' :
                     order?.status === 'pending' ? 'Готовится' :
                        order?.status === 'created' ? 'Создан' : 'Выполнен'}
               </p>
               <p className={`${styles.compound} text text_type_main-medium mb-6`}>Состав:</p>
               <div className={styles.box}>
                  {
                     uniqueArrWithIngredients.map((item: any, index) => {
                        return (
                           <div className={styles.container} key={index}>
                              <div className={styles.info}>
                                 <div>
                                    <img className={styles.image} src={item?.image} alt={item?.name} />
                                 </div>
                                 <p className={`${styles.title} text_type_main-default ml-4 `}>{item?.name}</p>
                              </div>
                              <div className={styles.price}>
                                 <p className={'text text_type_digits-default mr-2 '}>
                                    {countId[item._id]}&nbsp;x
                                 </p>
                                 <p className={'text text_type_digits-default mr-2 '}>
                                    {item?.price}
                                 </p>
                                 <CurrencyIcon type="primary" />
                              </div>
                           </div>
                        )
                     })
                  }
               </div>
               <div className={styles.dateAndFullPrice}>
                  <p className={`text text_type_main-default text_color_inactive`}>{date(order.createdAt)}</p>
                  <div className={styles.fullPrice}>
                     <p className={`${styles.price}text text_type_digits-default mr-2`}>{fullPrice}</p>
                     <CurrencyIcon type="primary" />
                  </div>
               </div>
            </div>
         )}
      </>
   )



}


export default ModalInformationAboutOrder