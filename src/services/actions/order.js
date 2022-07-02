import { getOrder } from "../../utils/api";

export const GET_ORDER = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export function getOrderNumber(arr) {
   return function(dispatch) {
      dispatch({type: GET_ORDER})

      getOrder(arr)
         .then(res => {
            if (res && res.success) {
               dispatch({type: GET_ORDER_SUCCESS, order: res.order.number})
            } else {
               dispatch({type: GET_ORDER_FAILED})
            }
         })
         .catch(err => {
            console.log(err)
            dispatch({type: GET_ORDER_FAILED})
         })
   }
}