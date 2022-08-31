export const OPEN_MODAL_INGREDIENT: 'OPEN_INGREDIENT_MODAL' = 'OPEN_INGREDIENT_MODAL';
export const CLOSE_MODAL_INGREDIENT: 'CLOSE_INGREDIENT_MODAL' = 'CLOSE_INGREDIENT_MODAL';


//!actionCreators
export const openModalIngredient = (id: string): IOpenModalAction => {
   return {
      type: OPEN_MODAL_INGREDIENT,
      idIngredients: id
   }
}

export const closeModalIngredient = (): ICloseModalAction => {
   return {
      type: CLOSE_MODAL_INGREDIENT
   }
}


//!типизация actions
export interface IOpenModalAction {
   type: typeof OPEN_MODAL_INGREDIENT;
   idIngredients: string;
}

export interface ICloseModalAction {
   type: typeof CLOSE_MODAL_INGREDIENT;
}

//!Объединение в Union
export type TModalActions =
   | IOpenModalAction
   | ICloseModalAction

