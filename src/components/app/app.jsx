import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css'
import { BurgerContext } from '../../services/burger-context';
import { getIngredients } from '../../utils/api';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Spinner from '../spinner/spinner';


function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    getIngredients()
      .then(res => setData(res.data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className={styles.page}>
      <AppHeader />
      {isLoading ?
        <Spinner /> :
        <main className={styles.main}>
          <BurgerContext.Provider value={data}>
            <BurgerIngredients />
            <BurgerConstructor />
          </BurgerContext.Provider>
        </main>}
    </div>
  );
}

export default App;
