import { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Spinner from '../spinner/spinner';
import { useSelector, useDispatch } from 'react-redux'
import { getIngredientsData } from '../../services/actions/ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Authorization from '../../pages/authorization/authorization';
import Registration from '../../pages/registration/registration';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';



function App() {

  const stateToSpinner = useSelector(state => state.ingredientsReducer.ingrSpin)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getIngredientsData())
  }, [dispatch])

  return (
    <Router>
      <div className={styles.page}>
        <AppHeader />

        <Switch>
          <Route exact path="/">
            {stateToSpinner ?
              <Spinner /> :
              <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              </main>}
          </Route>
          <Route exact path="/login">
            <Authorization />
          </Route>
          <Route exact path="/register">
            <Registration />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route exact path='/reset-password'>
            <ResetPassword />
          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
