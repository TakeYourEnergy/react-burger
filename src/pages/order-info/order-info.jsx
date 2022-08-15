import { useDispatch } from 'react-redux';
import { wsConnectionOpen, wsConnectionClosed } from '../../services/actions/wsAction';
import { useEffect } from 'react';
import ModalInformationAboutOrder from '../modal-information-about-order/modal-information-about-order';
import styles from './order-info.module.css'


const OrderInfo = () => {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(wsConnectionOpen())

      return () => {
         dispatch(wsConnectionClosed())
      }
   }, [dispatch])

   return (
      <div className={styles.modalInfo}>
         <ModalInformationAboutOrder />
      </div>
   )
}

export default OrderInfo