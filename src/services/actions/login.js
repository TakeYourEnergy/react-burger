import { recoveryPassword } from "../../utils/api";
import { newUser } from "../../utils/api";
import { setCookie } from "../../components/login/cookie";
import { newPassword } from "../../utils/api";

//восстановление пароля (RECOVERY - восстановить) /forgot-password
export const RECOVERY_PASSWORD_REQUEST = "RECOVERY_PASSWORD_REQUEST";
export const RECOVERY_PASSWORD_SUCCESS = "RECOVERY_PASSWORD_SUCCESS";
export const RECOVERY_PASSWORD_FAILED = "RECOVERY_PASSWORD_FAILED";

//регистрация пользователя /register
export const REGISTRATION_USER_REQUEST = "REGISTRATION_USER_REQUEST";
export const REGISTRATION_USER_SUCCESS = "REGISTRATION_USER_SUCCESS";
export const REGISTRATION_USER_FAILED = "REGISTRATION_USER_FAILED";

//получение нового пароля /reset-password
export const GET_RESET_PASSWORD_REQUEST = "GET_RESET_PASSWORD_REQUEST";
export const GET_RESET_PASSWORD_SUCCESS = "GET_RESET_PASSWORD_SUCCESS";
export const GET_RESET_PASSWORD_FAILED = "GET_RESET_PASSWORD_FAILED";


//восстановление пароля (RECOVERY - восстановить)
export function recoveryPasswordEmail(email) {
   return function (dispatch) {
      dispatch({ type: RECOVERY_PASSWORD_REQUEST })

      recoveryPassword(email)
         .then(res => {
            if (res && res.success) {
               dispatch({ type: RECOVERY_PASSWORD_SUCCESS })
            } else {
               dispatch({ type: RECOVERY_PASSWORD_FAILED })
            }
         })
         .catch(err => {
            dispatch({ type: RECOVERY_PASSWORD_FAILED })
         })
   }
}


//регистрация пользователя
export function registrationUser(name, email, password) {
   return function (dispatch) {
      dispatch({ type: REGISTRATION_USER_REQUEST })

      newUser(name, email, password)
         .then(res => {
            if (res && res.success) {
               let authToken = res.accessToken.split('Bearer ')[1];
               if (authToken) {
                  // Сохраняем токен в куку 
                  setCookie('token', authToken);
               }
               localStorage.setItem('token', res.refreshToken);
               dispatch({
                  type: REGISTRATION_USER_SUCCESS,
                  user: res.user,
               });
            } else {
               dispatch({ type: REGISTRATION_USER_FAILED })
            }
         })
         .catch(err => {
            dispatch({ type: REGISTRATION_USER_FAILED })
         })
   }
}


///получение нового пароля /reset-password
export function getNewPassword(password, token) {
   return function (dispatch) {
      dispatch({ type: GET_RESET_PASSWORD_REQUEST })

      newPassword(password, token)
         .then(res => {
            if (res && res.success) {
               dispatch({
                  type: GET_RESET_PASSWORD_SUCCESS,
                  success: res.success,
                  message: res.message,
               })
            } else {
               dispatch({ type: GET_RESET_PASSWORD_FAILED })
            }
         })
         .catch(err => {
            dispatch({ type: GET_RESET_PASSWORD_FAILED })
         })
   }
}

