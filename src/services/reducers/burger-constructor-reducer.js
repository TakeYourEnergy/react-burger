import { ADD_ITEM, DELETE_ITEM, MOVE_ITEM } from "../actions/burger-constructor";


const initialState = {
   buns: [],
   mains: [],
}


export const burgerConstructorReducer = (state = initialState, action) => {

   switch (action.type) {
      case ADD_ITEM:
         if (action.payload.type === 'bun') {
            return {
               ...state,
               buns: action.payload
            }
         } else {
            return {
               ...state, 
               mains: [...state.mains, action.payload]
            }
         }
      default:
         return state
   }
}