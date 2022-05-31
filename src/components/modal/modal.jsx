import styles from './modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const modalsContainer = document.querySelector('#modals');

const Modal = ({ title, onOverlayClick, onEscKeydown, children }) => {

   useEffect(() => {
      document.addEventListener('keydown', onEscKeydown);

      return () => {
         document.removeEventListener('keydown', onEscKeydown);
      }
   }, [])

   return ReactDOM.createPortal(
      <>
         <div className={styles.modal}>
            <h3 className={styles.title}>{title}</h3>
            {children}
         </div>
         <div className={styles.closeIcon} onClick={onOverlayClick}>
            <CloseIcon type="primary" />
         </div>
         <ModalOverlay onClick={onOverlayClick} />
      </>,
      modalsContainer
   )
}


export default Modal

Modal.PropTypes = {
   title: PropTypes.string.isRequired,
   onOverlayClick: PropTypes.func.isRequired,
   onEscKeydown: PropTypes.func.isRequired,
   children: PropTypes.node.isRequired
}