import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';



//!onClickClose - это колбэк для клика по подложке, который закрывает модальное окно
const ModalOverlay = ({ onClickClose }) => {
   return (
      <div className={styles.overlay} onClick={onClickClose} />
   )
}

export default ModalOverlay

// ModalOverlay.PropTypes = {
//    onClickClose: PropTypes.func.isRequired
// }