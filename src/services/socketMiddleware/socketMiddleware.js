import { getCookie } from "../../pages/cookie";


export const socketMiddleware = (wsUrl, wsActions) => {
   return store => {
      let socket = null;

      return next => action => {
         const { dispatch } = store;
         const { type, payload } = action;
         const { wsInit, wsInitWithToken, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

         if (type === wsInitWithToken) {
            const token = getCookie('token')
            if (token) {
               socket = new WebSocket(`${wsUrl}?token=${token}`);
            }
         } else if (type === wsInit) {
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
               const message = {...payload};
               socket.send(JSON.stringify(message));
            }
         }

         next(action);
      };
   };
};
