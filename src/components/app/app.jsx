import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Spinner from '../spinner/spinner';
import { useSelector, useDispatch } from 'react-redux'
import { getIngredientsData } from '../../services/actions/ingredients';

function App() {

  const stateToSpinner = useSelector(state => state.ingredientsReducer.ingrSpin)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getIngredientsData())
  }, [])

  return (
    <div className={styles.page}>
      <AppHeader />
      {stateToSpinner ?
        <Spinner /> :
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>}
    </div>
  );
}

export default App;
