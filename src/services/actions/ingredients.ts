import { getIngredients } from "../../utils/api";
import { AppDispatch, TIngredient } from "../../utils/types";


export const GET_INGREDIENTS: "GET_INGREDIENTS" = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";


//!типизация actions
export interface IGetIngredients {
   type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsSuccess {
   type: typeof GET_INGREDIENTS_SUCCESS;
   ingredients: Array<TIngredient>
}

export interface IGetIngredientsFailed {
   type: typeof GET_INGREDIENTS_FAILED;
}

//!Объединение в Union
export type TIngredients =
   | IGetIngredients
   | IGetIngredientsSuccess
   | IGetIngredientsFailed


export function getIngredientsData() {
   return function (dispatch: AppDispatch) {
      dispatch({ type: GET_INGREDIENTS })

      getIngredients()
         .then(res => {
            if (res && res.success) {
               dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: res.data })
            } else {
               dispatch({ type: GET_INGREDIENTS_FAILED })
            }
         })
         .catch(err => {
            console.log(err)
            dispatch({ type: GET_INGREDIENTS_FAILED })
         })
   }
}