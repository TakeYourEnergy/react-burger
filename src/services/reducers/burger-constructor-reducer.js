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
      case DELETE_ITEM:
         return {
            ...state,
            mains: [...state.mains].filter((item) => item.uuid !== action.payload.uuid)
         }
      case MOVE_ITEM: {
         const newList = state.mains;
         const dragItems = state.mains[action.dragIndex];
         newList.splice(action.dragIndex, 1);
         newList.splice(action.hoverIndex, 0, dragItems)
         
         //console.log('newList>>>', newList)
         
         return {
            ...state,
            mains: newList
         }
      }
      default:
         return state
   }
}