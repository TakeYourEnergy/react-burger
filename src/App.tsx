import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';


function App() {
  return (
    <>
      <AppHeader />
      <BurgerIngredients />
      <BurgerConstructor />
    </>
  );
}

export default App;
