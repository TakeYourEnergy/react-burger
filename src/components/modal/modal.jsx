import styles from './modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_MODAL_INGREDIENT } from '../../services/actions/object-ingredient';
import { NUMBER_NULL } from '../../services/actions/order';


const modalsContainer = document.querySelector('#modals');

const Modal = ({ title, children }) => {

   const dispatch = useDispatch()
   const onClose = () => {
      dispatch({ type: CLOSE_MODAL_INGREDIENT })
      dispatch({ type: NUMBER_NULL })
   }

   useEffect(() => {
      const handleEscKeydown = (e) => {
         e.key === "Escape" && onClose()
      }
      document.addEventListener('keydown', handleEscKeydown);

      return () => {
         document.removeEventListener('keydown', handleEscKeydown);
      }
   }, [])

   return ReactDOM.createPortal(
      <>
         <div className={styles.modal}>
            <h3 className={`text text_type_main-large ${styles.title}`}>{title}</h3>
            {children}
            <div className={styles.closeIcon} onClick={onClose}>
               <CloseIcon type="primary" />
            </div>
         </div>
         <ModalOverlay onClickClose={onClose} />
      </>,
      modalsContainer
   )
}


export default Modal

Modal.propTypes = {
   title: PropTypes.string.isRequired,
   children: PropTypes.node.isRequired
}