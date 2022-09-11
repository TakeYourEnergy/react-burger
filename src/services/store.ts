import { compose, createStore, applyMiddleware, Action, ActionCreator } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { socketMiddleware } from './socketMiddleware/socketMiddleware';
import {
   WS_CONNECTION_START,
   WS_SEND_MESSAGE,
   WS_CONNECTION_SUCCESS,
   WS_CONNECTION_CLOSED,
   WS_CONNECTION_ERROR,
   WS_GET_MESSAGE,
   TWsAction
} from './actions/wsAction';
import { rootReducer } from './reducers/root-reducer';

import {
   WS_USER_CONNECTION_START,
   WS_USER_CONNECTION_SUCCESS,
   WS_USER_CONNECTION_ERROR,
   WS_USER_CONNECTION_CLOSED,
   WS_USER_GET_MESSAGE,
   WS_USER_SEND_MESSAGE,
   TwsUser
} from './actions/ws-user-action';
import { TWsMiddleware, TWsUserMiddleware } from '../utils/types';
import { TBurgerConstructor } from './actions/burger-constructor';
import { TIngredients } from './actions/ingredients';
import { TUserActions } from './actions/login';
import { TModalActions } from './actions/object-ingredient';
import { TGetOrderActions } from './actions/order';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';


//Чтобы подключиться к бэкенду для получения всех заказов
const wsOrders = 'wss://norma.nomoreparties.space/orders/all';
//Чтобы получить заказы конкретного пользователя
const wsUserUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions: TWsMiddleware = {
   wsInit: WS_CONNECTION_START,
   wsSendMessage: WS_SEND_MESSAGE,
   onOpen: WS_CONNECTION_SUCCESS,
   onClose: WS_CONNECTION_CLOSED,
   onError: WS_CONNECTION_ERROR,
   onMessage: WS_GET_MESSAGE
}


const wsUserActions: TWsUserMiddleware = {
   wsInitWithToken: WS_USER_CONNECTION_START,
   wsSendMessage: WS_USER_SEND_MESSAGE,
   onOpen: WS_USER_CONNECTION_SUCCESS,
   onClose: WS_USER_CONNECTION_CLOSED,
   onError: WS_USER_CONNECTION_ERROR,
   onMessage: WS_USER_GET_MESSAGE
};

//тип, повторяющий структуру хранилища
export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TUserActions | TBurgerConstructor | TIngredients | TModalActions | TGetOrderActions | TwsUser | TWsAction

// Типизация thunk
export type AppThunk<ReturnType = void> = ActionCreator<
   ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;

// Теперь этот хук знает структуру хранилища
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// Хук не даст отправить экшен, который ему не знаком
export const useAppDispatch = () => useDispatch<AppDispatch & AppThunk>();



declare global {
   interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
   }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsOrders, wsActions), socketMiddleware(wsUserUrl, wsUserActions))));