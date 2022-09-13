import { TOrder } from "../../utils/types";

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';


//для создания объекта класса WebSocket
export const wsConnectionOpen = (): IWsConnectionOpen => {
   return {
      type: WS_CONNECTION_START
   }
}


//при успешном соединении
export const wsConnectionSuccess = (): IWsConnectionSuccess => {
   return {
      type: WS_CONNECTION_SUCCESS
   };
};

//в случае ошибки соединения
export const wsConnectionError = (): IWsConnectionError => {
   return {
      type: WS_CONNECTION_ERROR
   };
};

//при закрытии соединения
export const wsConnectionClosed = (): IWsConnectionClosed => {
   return {
      type: WS_CONNECTION_CLOSED
   };
};

//при получении сообщения от сервера
export const wsGetMessage = (message: TOrder): IWsGetMessage => {
   return {
      type: WS_GET_MESSAGE,
      payload: message
   };
};

//для отправки сообщений на сервер
export const wsSendMessage = (message: TOrder): IWsSendMessage => {
   return {
      type: WS_SEND_MESSAGE,
      payload: message
   };
};

interface IWsConnectionOpen {
   readonly type: typeof WS_CONNECTION_START
}

interface IWsConnectionSuccess {
   readonly type: typeof WS_CONNECTION_SUCCESS
}

interface IWsConnectionError {
   readonly type: typeof WS_CONNECTION_ERROR
}

interface IWsConnectionClosed {
   readonly type: typeof WS_CONNECTION_CLOSED
}

interface IWsGetMessage {
   readonly type: typeof WS_GET_MESSAGE;
   payload: TOrder
}

interface IWsSendMessage {
   readonly type: typeof WS_SEND_MESSAGE;
   payload: TOrder
}

export type TWsAction = 
   | IWsConnectionOpen
   | IWsConnectionSuccess
   | IWsConnectionError
   | IWsConnectionClosed
   | IWsGetMessage
   | IWsSendMessage
