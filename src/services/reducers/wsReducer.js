import {
   WS_CONNECTION_SUCCESS,
   WS_CONNECTION_CLOSED,
   WS_CONNECTION_ERROR,
   WS_GET_MESSAGE,
   WS_CONNECTION_START
} from "../actions/wsAction";


const initialState = {
   wsConnected: false,
   orders: [],
   total: 0,
   totalToday: 0,
};


export const wsReducer = (state = initialState, action) => {
   switch (action.type) {
      // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
      // Установим флаг wsConnected в состояние true
      case WS_CONNECTION_SUCCESS:
         return {
            ...state,
            wsConnected: true
         };

      // Опишем обработку экшена с типом WS_CONNECTION_ERROR
      case WS_CONNECTION_ERROR:
         return {
            ...state,
            wsConnected: false
         };

      // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
      // Установим флаг wsConnected в состояние false
      case WS_CONNECTION_CLOSED:
         return {
            ...state,
            wsConnected: false
         };

      // Опишем обработку экшена с типом WS_GET_MESSAGE
      // Обработка происходит, когда с сервера возвращаются данные
      // В messages передадим данные, которые пришли с сервера
      case WS_GET_MESSAGE:
         return {
            ...state,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday
         };
      case WS_CONNECTION_START: 
         return {
            ...state,
            wsConnected: true,
         }
      default:
         return state;
   }
}; 