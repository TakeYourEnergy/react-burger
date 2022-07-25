import { recoveryPassword } from "../../utils/api";
import { newUser } from "../../utils/api";
import { setCookie } from "../../pages/cookie";
import { newPassword } from "../../utils/api";
import { getProfile } from "../../utils/api";
import { getProfileUpdate } from "../../utils/api";

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


//получение данных о пользователе /profile
export const GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_FAILED = "GET_PROFILE_FAILED";

//обновления данных о пользователе
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILED = "UPDATE_PROFILE_FAILED";


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

//получение данных о пользователе /profile
export function getProfileData() {
   return function (dispatch) {
      dispatch({ type: GET_PROFILE_REQUEST })

      getProfile()
         .then(res => {
            if (res && res.success) {
               dispatch({
                  type: GET_PROFILE_SUCCESS,
                  user: res.user
               })
            } else {
               dispatch({ type: GET_PROFILE_FAILED })
            }
         })
         .catch(err => {
            dispatch({ type: GET_PROFILE_FAILED })
         })
   }
}

//обновления данных о пользователе /profile
export function updateProfileData(email, name, password) {
   return function (dispatch) {
      dispatch({ type: UPDATE_PROFILE_REQUEST })

      getProfileUpdate(email, name, password)
         .then(res => {
            if (res && res.success) {
               dispatch({
                  type: UPDATE_PROFILE_SUCCESS,
                  user: res.user
               })
            } else {
               dispatch({ type: UPDATE_PROFILE_FAILED })
            }
         })
         .catch(err => {
            dispatch({ type: UPDATE_PROFILE_FAILED })
         })
   }
}