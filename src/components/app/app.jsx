import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';


const config = {
  url: 'https://norma.nomoreparties.space/api/ingredients',
}

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status)
}


function App() {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [isIngredientDetails, setIsIngredientDetails] = React.useState(false);
  const [data, setData] = useState([]);


  useEffect(() => {
    const getData = () => {
      fetch(config.url)
        .then(checkResponse)
        .then(res => setData(res.data))
        .catch(error => console.error(error))
    }
    getData()
  }, [])


  // Закрытие всех модалок
  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetails(false)
  };

  const openIngredientModal = () => {
    setIsIngredientDetails(true)
  }

  const openOrderModal = () => {

  }

  // Обработка нажатия Esc
  const handleEscKeydown = (e) => {
    e.key === "Escape" && closeAllModals();
  };


  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredientsData={data} openIngredientModal={openIngredientModal} />
        <BurgerConstructor ingredientsData={data} />
      </main>

      {isOrderDetailsOpened &&
        <Modal
          title="Детали заказа"
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <OrderDetails />
        </Modal>
      }

      {isIngredientDetails &&
        <Modal
          title=""
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <OrderDetails />
        </Modal>
      }

    </div>
  );
}

export default App;
