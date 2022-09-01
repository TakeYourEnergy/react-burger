import { TOrder } from "../../utils/types";

export const WS_USER_CONNECTION_START: 'WS_USER_CONNECTION_START' = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS: 'WS_USER_CONNECTION_SUCCESS' = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_CONNECTION_ERROR: 'WS_USER_CONNECTION_ERROR' = 'WS_USER_CONNECTION_ERROR';
export const WS_USER_CONNECTION_CLOSED: 'WS_USER_CONNECTION_CLOSED' = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_GET_MESSAGE: 'WS_USER_GET_MESSAGE' = 'WS_USER_GET_MESSAGE';
export const WS_USER_SEND_MESSAGE: 'WS_USER_SEND_MESSAGE' = 'WS_USER_SEND_MESSAGE';


interface IWsUserConnectionStart {
   readonly type: typeof WS_USER_CONNECTION_START
}

interface IWsUserConnectionSuccess {
   readonly type: typeof WS_USER_CONNECTION_SUCCESS
}

interface IWsUserConnectionClosed {
   readonly type: typeof WS_USER_CONNECTION_CLOSED
}

interface IWsUserGetMessage {
   readonly type: typeof WS_USER_GET_MESSAGE;
   payload: TOrder
}

interface TWsUserSendMessage {
   readonly type: typeof WS_USER_SEND_MESSAGE;
   payload: TOrder
}

interface TWsConnectionError {
   readonly type: typeof WS_USER_CONNECTION_ERROR
}

export const wsConnectionError = (): TWsConnectionError => {
   return {
      type: WS_USER_CONNECTION_ERROR
   }
}

export const wsUserConnectionStart = (): IWsUserConnectionStart => {
   return {
      type: WS_USER_CONNECTION_START
   };
};


export const wsUserConnectionSuccess = (): IWsUserConnectionSuccess => {
   return {
      type: WS_USER_CONNECTION_SUCCESS
   };
};

export const wsUserConnectionClosed = (): IWsUserConnectionClosed => {
   return {
      type: WS_USER_CONNECTION_CLOSED
   };
};


export const wsUserGetMessage = (order: TOrder): IWsUserGetMessage => {
   return {
      type: WS_USER_GET_MESSAGE,
      payload: order
   };
};


export const wsUserSendMessage = (order: TOrder): TWsUserSendMessage => {
   return {
      type: WS_USER_SEND_MESSAGE,
      payload: order
   };
};

export type TwsUser =
   | IWsUserConnectionStart
   | IWsUserConnectionSuccess
   | IWsUserConnectionClosed
   | IWsUserGetMessage
   | TWsUserSendMessage
   | TWsConnectionError

