import { getOrder } from "../../utils/api";
import { RESET_ITEM } from "./burger-constructor";
import { resetItemActionCreator } from "./burger-constructor";

export const GET_ORDER = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const NUMBER_NULL = 'NUMBER_NULL'


export function getOrderNumber(arr) {
   return function (dispatch) {
      dispatch({ type: GET_ORDER })

      getOrder(arr)
         .then(res => {
            if (res && res.success) {
               dispatch({ type: GET_ORDER_SUCCESS, order: res.order.number })
            } else {
               dispatch({ type: GET_ORDER_FAILED })
            }
         })
         .then(res => {
            dispatch(resetItemActionCreator())
         })
         .catch(err => {
            console.log(err)
            dispatch({ type: GET_ORDER_FAILED })
         })
   }
}