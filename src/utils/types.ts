
import { WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_ERROR, WS_USER_CONNECTION_START, WS_USER_CONNECTION_SUCCESS, WS_USER_GET_MESSAGE, WS_USER_SEND_MESSAGE } from "../services/actions/ws-user-action";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from "../services/actions/wsAction";


//Тип для всех ингредиентов
export type TIngredient = {
   calories: number;
   carbohydrates: number;
   fat: number;
   image: string;
   image_large: string;
   image_mobile: string;
   name: string;
   price: number;
   proteins: number;
   type: 'bun' | 'main' | 'sauce';
   __v: number;
   _id: string;
   uuid?: string;
   count: number;
   id: string;
};

//тип для регистрации
export type TUser = {
   success: boolean;
   user: {
      email: string;
      name: string;
   };
   accessToken: string;
   refreshToken: string;
}

//для WS
export type TOrderDetails = {
   ingredients: Array<string>;
   name: string;
   _id: string;
   status: string;
   number: number;
   createdAt: string;
   id?: string;

   updatedAt?: string;
   price?: number;
};
//для WS
export type TOrder = {
   orders: TOrderDetails[];
   success: boolean;
   total: number;
   totalToday: number;
};

//типы для middleware
export type TWsUserMiddleware = {
   wsInitWithToken: typeof WS_USER_CONNECTION_START;
   wsSendMessage: typeof WS_USER_SEND_MESSAGE;
   onOpen: typeof WS_USER_CONNECTION_SUCCESS;
   onClose: typeof WS_USER_CONNECTION_CLOSED;
   onError: typeof WS_USER_CONNECTION_ERROR;
   onMessage: typeof WS_USER_GET_MESSAGE;
}

export type TWsMiddleware = {
   wsInit: typeof WS_CONNECTION_START;
   wsSendMessage: typeof WS_SEND_MESSAGE;
   onOpen: typeof WS_CONNECTION_SUCCESS;
   onClose: typeof WS_CONNECTION_CLOSED;
   onError: typeof WS_CONNECTION_ERROR;
   onMessage: typeof WS_GET_MESSAGE;
}