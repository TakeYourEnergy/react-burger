import { TBurgerConstructor } from "../services/actions/burger-constructor";
import { TIngredients } from "../services/actions/ingredients";
import { TUserActions } from "../services/actions/login";
import { store } from "../services/store";
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { TModalActions } from "../services/actions/object-ingredient";
import { TGetOrderActions } from "../services/actions/order";
import { TwsUser } from "../services/actions/ws-user-action";


//тип, повторяющий структуру хранилища
export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TUserActions | TBurgerConstructor | TIngredients | TModalActions | TGetOrderActions | TwsUser

// Типизация thunk
export type AppThunk<ReturnType = void> = ActionCreator<
   ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;
// Теперь этот хук знает структуру хранилища
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// Хук не даст отправить экшен, который ему не знаком
export const useAppDispatch = () => useDispatch<AppDispatch & AppThunk>();


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

   currentTab?: number | undefined;
   count: number;
   id: string;
};

//тип для регистрации
export type TUser = {
   email: string;
   name: string;
}

//для WS-user
export type TOrderDetails = {
   ingredients: Array<string>;
   name: string;
   _id: string;
   status: string;
   number: number;
   createdAt: string;
   id?: string;
};
//для WS-user
export type TOrder = {
   orders: TOrderDetails[];
   success: boolean;
   total: number;
   totalToday: number;
};