import { getCookie } from "../pages/cookie"
import { TIngredient, TOrderDetails, TUser } from "./types"

const config = {
   url: 'https://norma.nomoreparties.space/api'
}

const checkResponse = <T>(res: Response): Promise<T> => {
   return res.ok ? res.json() : Promise.reject(res.status)
}

type TgetIngredients = {
   data: TIngredient[],
   success: boolean;
}

//получение ингедиентов с сервера
export const getIngredients = () => {
   return fetch(`${config.url}/ingredients`)
      .then(res => checkResponse<TgetIngredients>(res))
}

type TGetOrder = {
   name: string;
   order: TOrderDetails;
   success: boolean;
}

//получение номера заказа
export const getOrder = (arr: Array<string>) => {
   return fetch(`${config.url}/orders`, {
      method: 'POST',
      headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + getCookie('token') },
      body: JSON.stringify({
         ingredients: arr,
      }),
   })
      .then(res => checkResponse<TGetOrder>(res))
}

type TRecoveryPassword = {
   success: boolean;
   message: string;
}

//запрос на восстановление пароля пользователя
export const recoveryPassword = (email: string) => {
   return fetch(`${config.url}/password-reset`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         email: email,
      }),
   })
      .then(res => checkResponse<TRecoveryPassword>(res))
}


//запрос на создание пользователя
export const newUser = (name: string, email: string, password: string) => {
   return fetch(`${config.url}/auth/register`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         email: email,
         password: password,
         name: name,
      }),
   })
      .then(res => checkResponse<TUser>(res))
}

type TNewPassword = {
   success: boolean;
   message: string;
}

// запрос на новый пароль
export const newPassword = (password: string, token: string) => {
   return fetch(`${config.url}/password-reset/reset`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         password: password,
         token: token
      }),
   })
      .then(res => checkResponse<TNewPassword>(res))
}

//эндпоинт получения данных о пользователе
export const getProfile = () => {
   return fetch(`${config.url}/auth/user`, {
      method: 'GET',
      headers: {
         "Content-Type": "application/json",
         Authorization: 'Bearer ' + getCookie('token')
      },
   })
      .then(res => checkResponse<TUser>(res))
}


//эндпоинт обновления данных о пользователе
export const getProfileUpdate = (email: string, name: string, password: string) => {
   return fetch(`${config.url}/auth/user`, {
      method: 'PATCH',
      headers: {
         "Content-Type": "application/json",
         Authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({
         email: email,
         name: name,
         password: password,
      }),
   })
      .then(res => checkResponse<TUser>(res))
}

type TSignOut = {
   success: boolean;
   message: string;
}

//выход из системы
export const signOut = (refreshToken: string) => {
   return fetch(`${config.url}/auth/logout`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         token: refreshToken
      }),
   })
      .then(res => checkResponse<TSignOut>(res))
}

//обновление токена
export const refreshToken = () => {
   return fetch(`${config.url}/auth/token`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
         Authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({
         token: localStorage.getItem('token')
      }),
   })
      .then(res => checkResponse<TUser>(res))
}

//запрос авторизации
export const authorizationLogin = (email: string, password: string) => {
   return fetch(`${config.url}/auth/login`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         email: email,
         password: password
      }),
   })
      .then(res => checkResponse<TUser>(res))
}