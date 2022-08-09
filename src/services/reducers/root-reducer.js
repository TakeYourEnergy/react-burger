import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients-reducer";
import { objectIngredient } from "./object-ingredient-reducer";
import { orderReducer } from "./order-reducer";
import { burgerConstructorReducer } from "./burger-constructor-reducer";
import { loginReducer } from "./login-reducer";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
   ingredientsReducer,
   objectIngredient,
   orderReducer,
   burgerConstructorReducer,
   loginReducer,
   wsReducer,
})