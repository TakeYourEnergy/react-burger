import { FC } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlay {
   onClickClose: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClickClose }) => {
   return (
      <div className={styles.overlay} onClick={onClickClose} />
   )
}

export default ModalOverlay

