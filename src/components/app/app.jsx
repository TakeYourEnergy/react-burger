import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css'
import { BurgerContext } from '../../services/burger-context';
import { getIngredients } from '../../utils/api';


function App() {
  const [data, setData] = useState([]);


  useEffect(() => {
    getIngredients()
      .then(res => setData(res.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerContext.Provider value={data}>
          <BurgerIngredients />
          <BurgerConstructor />
        </BurgerContext.Provider>
      </main>
    </div>
  );
}

export default App;
