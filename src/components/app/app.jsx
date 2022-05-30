import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css'


const config = {
  url: 'https://norma.nomoreparties.space/api/ingredients',
}

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status)
}


function App() {
  const [data, setData] = useState([])

  useEffect(() => {

    const getData = () => {
      fetch(config.url)
        .then(checkResponse)
        .then(res => setData(res.data))
        .catch(error => console.error(error))
    }
    getData()
  }, [])


  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredientsData={data}/>
        <BurgerConstructor ingredientsData={data}/>
      </main>

    </div>
  );
}

export default App;
