const config = {
   url: 'https://norma.nomoreparties.space/api'
}


const checkResponse = (res) => {
   return res.ok ? res.json() : Promise.reject(res.status)
}

export const getIngredients = () => {
   return fetch(`${config.url}/ingredients`)
      .then(checkResponse)
}

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