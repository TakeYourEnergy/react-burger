import styles from './modal.module.css';
import { FC, ReactNode, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModal {
   title: string;
   children?: ReactNode;
   onClose: () => void;
}

const modalsContainer = document.querySelector('#modals') as HTMLElement;

const Modal: FC<IModal> = ({ title, children, onClose }) => {

   useEffect(() => {
      const handleEscKeydown = (e: {key: string}) => {
         e.key === "Escape" && onClose()
      }
      document.addEventListener('keydown', handleEscKeydown);

      return () => {
         document.removeEventListener('keydown', handleEscKeydown);
      }
   }, [onClose])

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