import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { BurgerContext } from '../../services/burger-context';
import { getIngredients } from '../../utils/api';


function App() {
  const [isIngredientDetails, setIsIngredientDetails] = React.useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = React.useState('')

  useEffect(() => {
    getIngredients()
      .then(res => setData(res.data))
      .catch(error => console.error(error))
  }, [])


  // Закрытие всех модалок
  const closeAllModals = () => {
    setIsIngredientDetails(false)
  };

  const openIngredientModal = (id) => {
    setIsIngredientDetails(true)
    setId(id)
  }

  // Обработка нажатия Esc
  const handleEscKeydown = (e) => {
    e.key === "Escape" && closeAllModals();
  };


  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerContext.Provider value={data}>
          <BurgerIngredients openIngredientModal={openIngredientModal} />
          <BurgerConstructor />
        </BurgerContext.Provider>
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
    </div>
  );
}

export default App;
