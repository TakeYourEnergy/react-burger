import styles from './order-details.jsx';
import done from '../../images/done.svg'


const OrderDetails = () => {
   return (
      <>
         <p className={styles.number}>034536</p>
         <p className={styles.ident}>идентификатор заказа</p>
         <img src={done} alt="done" />
         <p className={styles.status}>Ваш заказ начали готовить</p>
         <p className={styles.text}>Дождитесь готовности на орбитальной станции</p>
      </>
   )
}

export default OrderDetails