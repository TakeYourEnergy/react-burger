import { getIngredients } from "../../utils/api";


export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function getIngredientsData() {
   return function (dispatch) {
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