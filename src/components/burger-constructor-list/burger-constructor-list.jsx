import styles from './burger-constructor-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerConstructorList = (props) => {
   return (
      <div className={styles.box}>
         <div className={styles.bun}>
            <ConstructorElement
               type="top"
               isLocked={true}
               text="Краторная булка N-200i (верх)"
               price={200}
               thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
            />
         </div>
         <div className={styles.item}>
            {props.burgerIngr.map(item => item.type === 'main' ?
               <div className={styles.main} key={item._id}>
                  <DragIcon type="main" />
                  <ConstructorElement
                     text={item.name}
                     price={item.price}
                     thumbnail={item.image_mobile}
                  />
               </div> :
               item.type === 'sause' &&
               <div className={styles.sause} key={item._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                     text={item.name}
                     price={item.price}
                     thumbnail={item.image_mobile}
                  />
               </div>
            )}
         </div>
         <div className={styles.bun}>
            <ConstructorElement
               type="bottom"
               isLocked={true}
               text="Краторная булка N-200i (низ)"
               price={200}
               thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
            />
         </div>
      </div>

   )

}

export default BurgerConstructorList

BurgerConstructorList.propTypes = {
   burgerIngr: PropTypes.arrayOf(PropTypes.object).isRequired,
}