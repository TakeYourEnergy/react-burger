import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../../utils/types';


export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM'
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM'
export const MOVE_ITEM: 'MOVE_ITEM' = 'MOVE_ITEM'
export const RESET_ITEM: 'RESET_ITEM' = 'RESET_ITEM'



//!actionCreators
export const addItem = (item: TIngredient): IAddItemAction => {
   return {
      type: ADD_ITEM,
      payload: { ...item, uuid: uuidv4() }
   }
}

export const deleteItem = (item: TIngredient): IDeleteItemAction => {
   return {
      type: DELETE_ITEM,
      payload: item
   }
}

export const moveItemActionCreator = (dragIndex: number, hoverIndex: number): IMoveItemAction => {
   return {
      type: MOVE_ITEM,
      dragIndex,
      hoverIndex
   }
}

export const resetItemActionCreator = () => {
   return {
      type: RESET_ITEM
   }
}


//!типизация actions
export interface IAddItemAction {
   type: typeof ADD_ITEM;
   payload: TIngredient
}

export interface IDeleteItemAction {
   type: typeof DELETE_ITEM;
   payload: TIngredient
}

export interface IMoveItemAction {
   type: typeof MOVE_ITEM;
   dragIndex: number,
   hoverIndex: number
}

export interface IResetItemAction {
   type: typeof RESET_ITEM
}


//!Объединение в Union
export type TBurgerConstructor =
   | IAddItemAction
   | IDeleteItemAction
   | IMoveItemAction
   | IResetItemAction
