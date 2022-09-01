import {
   GET_ORDER,
   GET_ORDER_SUCCESS,
   GET_ORDER_FAILED,
   NUMBER_NULL,
   TGetOrderActions,
} from "../actions/order";

type TInitialState = {
   numberOrder: number | null;
   ingrSpin: boolean | string;
   isOrderDetailsOpened: boolean
}

const initiaState: TInitialState = {
   numberOrder: null,
   ingrSpin: '',
   isOrderDetailsOpened: false,
}

export const orderReducer = (state = initiaState, action: TGetOrderActions): TInitialState => {

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
            ingrSpin: false,
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