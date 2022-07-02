import {
   GET_ORDER,
   GET_ORDER_SUCCESS,
   GET_ORDER_FAILED,
   NUMBER_NULL,
} from "../actions/order";


const initiaState = {
   numberOrder: null,
   ingrSpin: '',
   isOrderDetailsOpened: false,
}

export const orderReducer = (state = initiaState, action) => {
   //console.log('OrderAction>>>', action)

   switch (action.type) {
      case GET_ORDER:
         return {
            ...state,
            ingrSpin: true
         }
      case GET_ORDER_SUCCESS:
         return {
            ...state,
            numberOrder: action.order,
            ingrSpin: false,
            isOrderDetailsOpened: true,
         }
      case GET_ORDER_FAILED:
         return {
            ...state,
            loading: false,
            isOrderDetailsOpened: false,
         }
      case NUMBER_NULL:
         return {
            ...state,
            isOrderDetailsOpened: false,
            numberOrder: null
         }

      default:
         return state
   }
}