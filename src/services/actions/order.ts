import { getOrder } from "../../utils/api";
import { AppDispatch, AppThunk } from "../store";
import { resetItemActionCreator } from "./burger-constructor";

export const GET_ORDER: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const NUMBER_NULL: 'NUMBER_NULL' = 'NUMBER_NULL'

export interface IGetOrder {
   type: typeof GET_ORDER
}

export interface IGetOrderSuccess {
   type: typeof GET_ORDER_SUCCESS;
   order: number
}

export interface IGetOrderFailed {
   type: typeof GET_ORDER_FAILED
}

export interface INumberNull {
   type: typeof NUMBER_NULL
}

export type TGetOrderActions =
   | IGetOrder
   | IGetOrderSuccess
   | IGetOrderFailed
   | INumberNull


export const numberNull = () => {
   return {
      type: NUMBER_NULL
   }
}

export const getOrderNumber: AppThunk = (arr: Array<string>) => {
   return function (dispatch: AppDispatch) {
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