import { useDispatch } from 'react-redux';
import { wsConnectionOpen, wsConnectionClosed } from '../../services/actions/wsAction';
import { useEffect } from 'react';
import ModalInformationAboutOrder from '../modal-information-about-order/modal-information-about-order';
import styles from './order-info.module.css'
import { wsUserConnectionStart, wsUserConnectionClosed } from '../../services/actions/ws-user-action';


const OrderInfo = () => {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(wsConnectionOpen())
      dispatch(wsUserConnectionStart())

      return () => {
         dispatch(wsConnectionClosed())
         dispatch(wsUserConnectionClosed())
      }
   }, [dispatch])

   return (
      <div className={styles.modalInfo}>
         <ModalInformationAboutOrder />
      </div>
   )
}

export default OrderInfo