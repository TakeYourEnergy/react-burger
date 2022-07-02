import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients-reducer";
import { objectIngredient } from "./object-ingredient-reducer";


export const rootReducer = combineReducers({
   ingredientsReducer,
   objectIngredient,
})