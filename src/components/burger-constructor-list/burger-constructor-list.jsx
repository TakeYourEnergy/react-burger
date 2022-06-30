import React, { useContext, useEffect } from 'react';
import styles from './burger-constructor-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/prop-types';
import { useSelector } from 'react-redux';

const BurgerConstructorList = () => {
   const data = useSelector(state => state.ingredientsReducer.ingredients)
   const bun = { ...data[0] }

   return (
      <div className={styles.box}>
         <div className={styles.bun}>
            {data.find((item) => item.name === 'Краторная булка N-200i') &&
               <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (вверх)`}
                  price={bun.price}
                  thumbnail={bun.image_mobile}
               />
            }
         </div>
         <div className={styles.item}>
            {data.map(item => item.type === 'main' ?
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
            {data.find((item) => item.name === 'Краторная булка N-200i') &&
               <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image_mobile}
               />
            }
         </div>
      </div>

   )

}

export default BurgerConstructorList

// BurgerConstructorList.propTypes = {
//    burgerIngr: PropTypes.arrayOf(menuItemPropTypes.isRequired).isRequired,
// }