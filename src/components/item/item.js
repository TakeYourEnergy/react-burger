import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './item.module.css';
import React from 'react';

const Item = ({ name, image, price }) => {

   const [count, setCount] = React.useState(0)

   return (
      <div className={styles.item} onClick={() => setCount(count + 1)}>
         <img className={styles.image} src={image} alt={name} />
         <div className={styles.boxPrice}>
            <p className='text text_type_main-default mr-2'>{price}</p>
            <CurrencyIcon type="primary" />
         </div>
         <div className={styles.name}>
            <p className="text text_type_main-default">{name}</p>
         </div>
         {count > 0 && <Counter count={count} size="default" />}
      </div>
   )
}

export default Item