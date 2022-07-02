import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients-reducer";
import { objectIngredient } from "./object-ingredient-reducer";
import { orderReducer } from "./order-reducer";

export const rootReducer = combineReducers({
   ingredientsReducer,
   objectIngredient,
   orderReducer,
})