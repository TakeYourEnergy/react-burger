import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from './socketMiddleware/socketMiddleware';
import {
   WS_CONNECTION_START,
   WS_SEND_MESSAGE,
   WS_CONNECTION_SUCCESS,
   WS_CONNECTION_CLOSED,
   WS_CONNECTION_ERROR,
   WS_GET_MESSAGE
} from './actions/wsAction';
import { rootReducer } from './reducers/root-reducer';


//Чтобы подключиться к бэкенду для получения всех заказов
const wsOrders = 'wss://norma.nomoreparties.space/orders/all';

const wsActions = {
   wsInit: WS_CONNECTION_START,
   wsSendMessage: WS_SEND_MESSAGE,
   onOpen: WS_CONNECTION_SUCCESS,
   onClose: WS_CONNECTION_CLOSED,
   onError: WS_CONNECTION_ERROR,
   onMessage: WS_GET_MESSAGE
}



const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
   : compose



export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsOrders, wsActions))));