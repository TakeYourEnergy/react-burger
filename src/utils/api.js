import { getCookie } from "../pages/cookie"

const config = {
   url: 'https://norma.nomoreparties.space/api'
}

const checkResponse = (res) => {
   return res.ok ? res.json() : Promise.reject(res.status)
}

//получение ингедиентов с сервера
export const getIngredients = () => {
   return fetch(`${config.url}/ingredients`)
      .then(checkResponse)
}

//получение номера заказа
export const getOrder = (arr) => {
   return fetch(`${config.url}/orders`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         ingredients: arr,
      }),
   })
      .then(checkResponse)
}

//запрос на восстановление пароля пользователя
export const recoveryPassword = (email) => {
   return fetch(`${config.url}/password-reset`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         email: email,
      }),
   })
      .then(checkResponse)
}



//запрос на создание пользователя
export const newUser = (name, email, password) => {
   return fetch(`${config.url}/auth/register`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         email: email,
         password: password,
         name: name,
      }),
   })
      .then(checkResponse)
}


// запрос на новый пароль
export const newPassword = (password, token) => {
   return fetch(`${config.url}/password-reset/reset`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         password: password,
         token: token
      }),
   })
      .then(checkResponse)
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
      .then(checkResponse)
}


//эндпоинт обновления данных о пользователе
export const getProfileUpdate = (email, name, password) => {
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
      .then(checkResponse)
}

//выход из системы
export const signOut = (refreshToken) => {
   return fetch(`${config.url}/auth/logout`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         token: refreshToken
      }),
   })
      .then(checkResponse)
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
      .then(checkResponse)
}

//запрос авторизации
export const authorizationLogin = (email, password) => {
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
      .then(checkResponse)
}