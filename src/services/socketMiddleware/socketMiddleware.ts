import { getCookie } from "../../pages/cookie";
import { TWsMiddleware, TWsUserMiddleware } from "../../utils/types";
import { Middleware, MiddlewareAPI } from 'redux';


export const socketMiddleware = (wsUrl: string, wsActions: TWsUserMiddleware | TWsMiddleware): Middleware => {
   return (store: MiddlewareAPI) => {
      let socket: WebSocket | null = null;

      return next => (action) => {
         const { dispatch } = store;
         const { type, payload } = action;
         const { wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

         if (type === (wsActions as TWsUserMiddleware).wsInitWithToken) {
            const token = getCookie('token')
            if (token) {
               socket = new WebSocket(`${wsUrl}?token=${token}`);
            }
         }

         if (type === (wsActions as TWsMiddleware).wsInit) {
            socket = new WebSocket(wsUrl);
         }

         //открытие
         if (socket) {
            socket.onopen = event => {
               dispatch({ type: onOpen, payload: event });
            };
            //ошибка
            socket.onerror = event => {
               dispatch({ type: onError, payload: event });
            };
            //сообщение
            socket.onmessage = event => {
               const { data } = event;
               const parsedData = JSON.parse(data);
               const { success, ...restParsedData } = parsedData;

               dispatch({ type: onMessage, payload: restParsedData });
            };
            //закрытие
            socket.onclose = event => {
               dispatch({ type: onClose, payload: event });
            };

            if (type === wsSendMessage) {
               const message = { ...payload };
               socket.send(JSON.stringify(message));
            }
         }

         next(action);
      };
   };
};
