import { GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from "../actions/order";


const initiaState = {
   numberOrder: null
}

export const orderReducer = (state = initiaState, action) => {
   console.log('OrderCction>>>', action)

   switch (action.type) {
      case GET_ORDER:
         return {
            ...state,
         }
      case GET_ORDER_SUCCESS: 
         return {
            ...state,
            numberOrder: action.order
         }
      case GET_ORDER_FAILED: 
         return {
            ...state,

         }
   
      default:
         return state
   }
}