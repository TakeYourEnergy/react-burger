import {
   WS_USER_CONNECTION_SUCCESS,
   WS_USER_CONNECTION_ERROR,
   WS_USER_CONNECTION_CLOSED,
   WS_USER_GET_MESSAGE,
   WS_USER_CONNECTION_START
} from "../actions/ws-user-action";


const initialState = {
   wsConnected: false,
   orders: [],
   total: 0,
   totalToday: 0
};


export const wsUserReducer = (state = initialState, action) => {
   switch (action.type) {
      case WS_USER_CONNECTION_SUCCESS:
         return {
            ...state,
            wsConnected: true
         };

      case WS_USER_CONNECTION_ERROR:
         return {
            ...state,
            wsConnected: false
         };

      case WS_USER_CONNECTION_CLOSED:
         return {
            ...state,
            wsConnected: false,
         };

      case WS_USER_GET_MESSAGE:
         return {
            ...state,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday
         };

      // case WS_USER_CONNECTION_START:
      //    return {
      //       ...state,
      //       wsConnected: true
      //    }
      default:
         return state;
   }
}