import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';


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
  const [id, setId] = React.useState('')

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

  const openIngredientModal = (id) => {
    setIsIngredientDetails(true)
    setId(id)
  }

  const openOrderModal = () => {
    setIsOrderDetailsOpened(true)
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
        <BurgerConstructor ingredientsData={data} openOrderModal={openOrderModal} />
      </main>

      {isIngredientDetails &&
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <IngredientDetails data={data} id={id} />
        </Modal>
      }

      {isOrderDetailsOpened &&
        <Modal
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
          title=''
        >
          <OrderDetails />
        </Modal>
      }

    </div>
  );
}

export default App;
