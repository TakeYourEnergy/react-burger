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

