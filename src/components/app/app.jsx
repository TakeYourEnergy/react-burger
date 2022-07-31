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
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import Authorization from '../../pages/authorization/authorization';
import Registration from '../../pages/registration/registration';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import ProtectedRoute from '../../pages/protectedRoute/ProtectedRoute';
import { getCookie } from '../../pages/cookie';
import { getProfileData, updateToken } from '../../services/actions/login';
import Modal from '../modal/modal';
import { CLOSE_MODAL_INGREDIENT } from '../../services/actions/object-ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';


function App() {

  const stateToSpinner = useSelector(state => state.ingredientsReducer.ingrSpin)
  const dispatch = useDispatch();

  const { user, tokenSuccess } = useSelector(state => ({
    user: state.loginReducer.user,
    tokenSuccess: state.loginReducer.tokenSuccess
  }))

  const getRefreshToken = localStorage.getItem('token')

  const getAccessTokenFromCookie = getCookie('token') //document.cookie

  const history = useHistory()
  const location = useLocation()
  const background = location.state?.background

  const isOpened = useSelector((state) => state.objectIngredient.isOpened)
  console.log(isOpened)


  const onClose = () => {
    dispatch({ type: CLOSE_MODAL_INGREDIENT })
    history.goBack()
    //dispatch({ type: NUMBER_NULL })
  }

  useEffect(() => {
    dispatch(getIngredientsData())

    //запрос на получение или обновление данных о пользователе - при перезагрузке
    if (getRefreshToken && getAccessTokenFromCookie && !user) {
      dispatch(getProfileData())
    }
    //если токен из куки просрочился и есть второй — refreshToken, то получаем новый - accessToken
    if (!getAccessTokenFromCookie && getRefreshToken) {
      dispatch(updateToken())
    }
    //повторяем запрос на получение или обновление данных о пользователе
    if (tokenSuccess && getRefreshToken && getAccessTokenFromCookie) {
      dispatch(getProfileData())
    }
  }, [dispatch, user, getRefreshToken, getAccessTokenFromCookie, tokenSuccess])



  return (

    <div className={styles.page}>
      <AppHeader />

      <Switch location={background || location}>
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
        <Route
          path='/ingredients/:id'>
          <IngredientDetails />
        </Route>
        <ProtectedRoute exact path='/profile'>
          <Profile />
        </ProtectedRoute>
      </Switch>
      {/* Show the modal when a background page is set */}
      {background &&
        <Route exact path="/ingredients/:id">
          <Modal
            title="Детали ингредиента" onClose={onClose}
          >
            <IngredientDetails />
          </Modal>
        </Route>
      }

    </div>

  );
}

export default App;
