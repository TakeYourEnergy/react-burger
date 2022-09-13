import { OPEN_MODAL_INGREDIENT, CLOSE_MODAL_INGREDIENT, TModalActions } from "../actions/object-ingredient"


type TInitialStateModal = {
   isOpened: boolean;
   idIngredients: string
}

const initialState: TInitialStateModal = {
   isOpened: false,
   idIngredients: ''
}

export const objectIngredient = (state = initialState, action: TModalActions) => {

   switch (action.type) {
      case OPEN_MODAL_INGREDIENT:
         return {
            ...state,
            isOpened: true,
            idIngredients: action.idIngredients
         }
         case CLOSE_MODAL_INGREDIENT: 
            return {
               ...state,
               isOpened: false,
               idIngredients: ''
            }

      default:
         return state
   }
}