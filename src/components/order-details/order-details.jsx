import styles from './order-details.module.css';
import done from '../../images/done.svg'


const OrderDetails = ({order}) => {
   return (
      <>
         <p className={styles.number}>{order}</p>
         <p className={`"text text_type_main-default text_color_inactive" ${styles.ident}`}>идентификатор заказа</p>
         <img className={styles.img} src={done} alt="done" />
         <p className={`"text text_type_main-default text_color_inactive" ${styles.status}`}>Ваш заказ начали готовить</p>
         <p className={`"text text_type_main-default text_color_inactive" ${styles.text}`}>Дождитесь готовности на орбитальной станции</p>
      </>
   )
}

export default OrderDetails