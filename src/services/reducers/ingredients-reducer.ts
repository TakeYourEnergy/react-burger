import { TIngredient } from "../../utils/types";
import {
   GET_INGREDIENTS,
   GET_INGREDIENTS_SUCCESS,
   GET_INGREDIENTS_FAILED,
   TIngredients
} from "../actions/ingredients";



type TInitialStateIngredient = {
   ingredients: TIngredient | [];
   ingredientsRequest: boolean;
   ingredientsFailed: boolean;
   ingredientsPending: boolean;
   ingrSpin: string | boolean;
}

const initialState: TInitialStateIngredient = {
   ingredients: [],
   ingredientsRequest: false,
   ingredientsFailed: false,
   ingredientsPending: true,
   ingrSpin: ''
}

export const ingredientsReducer = (state = initialState, action: TIngredients) => {

   switch (action.type) {
      case GET_INGREDIENTS:
         return {
            //запрос начал выполняться
            ...state,
            ingredientsRequest: true,
            ingredientsFailed: false,
            ingrSpin: true
         }
      case GET_INGREDIENTS_SUCCESS:
         return {
            ...state,
            // Запрос выполнился успешно, помещаем полученные данные в хранилище
            ingredients: action.ingredients,
            // Запрос закончил своё выполнение
            ingredientsRequest: true,
            ingredientsPending: false,
            ingrSpin: false
         }
      case GET_INGREDIENTS_FAILED:
         return {
            ...state,
            ingredientsFailed: true,
            ingredientsRequest: false,
         }

      default:
         return state
   }
}