import { recoveryPassword } from "../../utils/api";
import { newUser } from "../../utils/api";
import { setCookie } from "../../pages/cookie";
import { newPassword } from "../../utils/api";
import { getProfile } from "../../utils/api";
import { getProfileUpdate } from "../../utils/api";
import { signOut } from "../../utils/api";
import { deleteCookie } from "../../pages/cookie";
import { refreshToken } from "../../utils/api";
import { authorizationLogin } from "../../utils/api";
import { AppDispatch, AppThunk, TUser } from "../../utils/types";

//восстановление пароля (RECOVERY - восстановить) /forgot-password
export const RECOVERY_PASSWORD_REQUEST: "RECOVERY_PASSWORD_REQUEST" = "RECOVERY_PASSWORD_REQUEST";
export const RECOVERY_PASSWORD_SUCCESS: "RECOVERY_PASSWORD_SUCCESS" = "RECOVERY_PASSWORD_SUCCESS";
export const RECOVERY_PASSWORD_FAILED: "RECOVERY_PASSWORD_FAILED" = "RECOVERY_PASSWORD_FAILED";

//регистрация пользователя /register
export const REGISTRATION_USER_REQUEST: "REGISTRATION_USER_REQUEST" = "REGISTRATION_USER_REQUEST";
export const REGISTRATION_USER_SUCCESS: "REGISTRATION_USER_SUCCESS" = "REGISTRATION_USER_SUCCESS";
export const REGISTRATION_USER_FAILED: "REGISTRATION_USER_FAILED" = "REGISTRATION_USER_FAILED";

//получение нового пароля /reset-password
export const GET_RESET_PASSWORD_REQUEST: "GET_RESET_PASSWORD_REQUEST" = "GET_RESET_PASSWORD_REQUEST";
export const GET_RESET_PASSWORD_SUCCESS: "GET_RESET_PASSWORD_SUCCESS" = "GET_RESET_PASSWORD_SUCCESS";
export const GET_RESET_PASSWORD_FAILED: "GET_RESET_PASSWORD_FAILED" = "GET_RESET_PASSWORD_FAILED";

//получение данных о пользователе /profile
export const GET_PROFILE_REQUEST: "GET_PROFILE_REQUEST" = "GET_PROFILE_REQUEST";
export const GET_PROFILE_SUCCESS: "GET_PROFILE_SUCCESS" = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_FAILED: "GET_PROFILE_FAILED" = "GET_PROFILE_FAILED";

//обновления данных о пользователе
export const UPDATE_PROFILE_REQUEST: "UPDATE_PROFILE_REQUEST" = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS" = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILED: "UPDATE_PROFILE_FAILED" = "UPDATE_PROFILE_FAILED";

//выход из системы
export const SIGNOUT_REQUEST: "SIGNOUT_REQUEST" = "SIGNOUT_REQUEST";
export const SIGNOUT_SUCCESS: "SIGNOUT_SUCCESS" = "SIGNOUT_SUCCESS";
export const SIGNOUT_FAILED: "SIGNOUT_FAILED" = "SIGNOUT_FAILED";

//обновление токена
export const TOKEN_REQUEST: "TOKEN_REQUEST" = "TOKEN_REQUEST";
export const TOKEN_SUCCESS: "TOKEN_SUCCESS" = "TOKEN_SUCCESS";
export const TOKEN_FAILED: "TOKEN_FAILED" = "TOKEN_FAILED";

//запрос авторизации
export const AUTHORIZATION_REQUEST: "AUTHORIZATION_REQUEST" = "AUTHORIZATION_REQUEST";
export const AUTHORIZATION_SUCCESS: "AUTHORIZATION_SUCCESS" = "AUTHORIZATION_SUCCESS";
export const AUTHORIZATION_FAILED: "AUTHORIZATION_FAILED" = "AUTHORIZATION_FAILED";



//!типизация actions
//восстановление пароля (RECOVERY - восстановить) /forgot-password
export interface IRecoveryPasswordRequest {
   readonly type: typeof RECOVERY_PASSWORD_REQUEST
}
export interface IRecoveryPasswordSuccess {
   readonly type: typeof RECOVERY_PASSWORD_SUCCESS
}
export interface IRecoveryPasswordFailed {
   readonly type: typeof RECOVERY_PASSWORD_FAILED
}

//регистрация пользователя /register
export interface IRegistrationUserRequest {
   readonly type: typeof REGISTRATION_USER_REQUEST
}
export interface IRegistrationUserSuccess {
   readonly type: typeof REGISTRATION_USER_SUCCESS;
   readonly user: TUser
}
export interface IRegistrationUserFailed {
   readonly type: typeof REGISTRATION_USER_FAILED
}

//получение нового пароля /reset-password
export interface IGetResetPasswordRequest {
   readonly type: typeof GET_RESET_PASSWORD_REQUEST
}
export interface IGetResetPasswordSuccess {
   readonly type: typeof GET_RESET_PASSWORD_SUCCESS;
   success: boolean;
   message: string
}
export interface IGetResetPasswordFailed {
   readonly type: typeof GET_RESET_PASSWORD_FAILED
}

//обновления данных о пользователе
export interface IUpdateProfileRequest {
   readonly type: typeof UPDATE_PROFILE_REQUEST;
}
export interface IUpdateProfileSuccess {
   readonly type: typeof UPDATE_PROFILE_SUCCESS;
   readonly user: TUser
}
export interface IUpdateProfileFailed {
   readonly type: typeof UPDATE_PROFILE_FAILED;
}

//выход из системы
export interface ISignoutRequest {
   readonly type: typeof SIGNOUT_REQUEST;
}
export interface ISignoutSuccess {
   readonly type: typeof SIGNOUT_SUCCESS;
}
export interface ISignoutFailed {
   readonly type: typeof SIGNOUT_FAILED;
}

//обновление токена
export interface ITokenRequest {
   readonly type: typeof TOKEN_REQUEST;
}
export interface ITokenSuccess {
   readonly type: typeof TOKEN_SUCCESS;
}
export interface ITokenFailed {
   readonly type: typeof TOKEN_FAILED;
}

//запрос авторизации
export interface IAuthorizationRequest {
   readonly type: typeof AUTHORIZATION_REQUEST;
}
export interface IAuthorizationSuccess {
   readonly type: typeof AUTHORIZATION_SUCCESS;
   readonly user: TUser
}
export interface IAuthorizationFailed {
   readonly type: typeof AUTHORIZATION_FAILED;
}

//получение данных о пользователе /profile
export interface IGetProfileRequest {
   readonly type: typeof GET_PROFILE_REQUEST;
}
export interface IGetProfileSuccess {
   readonly type: typeof GET_PROFILE_SUCCESS;
   readonly user: TUser
}
export interface IGetProfileFailed {
   readonly type: typeof GET_PROFILE_FAILED;
}

export type TUserActions =
   | IRecoveryPasswordRequest
   | IRecoveryPasswordSuccess
   | IRecoveryPasswordFailed
   | IRegistrationUserRequest
   | IRegistrationUserSuccess
   | IRegistrationUserFailed
   | IGetResetPasswordRequest
   | IGetResetPasswordSuccess
   | IGetResetPasswordFailed
   | IUpdateProfileRequest
   | IUpdateProfileSuccess
   | IUpdateProfileFailed
   | ISignoutRequest
   | ISignoutSuccess
   | ISignoutFailed
   | ITokenRequest
   | ITokenSuccess
   | ITokenFailed
   | IAuthorizationRequest
   | IAuthorizationSuccess
   | IAuthorizationFailed
   | IGetProfileRequest
   | IGetProfileSuccess
   | IGetProfileFailed



//восстановление пароля (RECOVERY - восстановить)
export const recoveryPasswordEmail: AppThunk = (email: string) => {
   return function (dispatch: AppDispatch) {
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
export const registrationUser: AppThunk = (name: string, email: string, password: string) => {
   return function (dispatch: AppDispatch) {
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
export const getNewPassword: AppThunk = (password: string, token: string) => {
   return function (dispatch: AppDispatch) {
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
export const getProfileData: AppThunk = () => {
   return function (dispatch: AppDispatch) {
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
export const updateProfileData: AppThunk = (email: string, name: string, password: string) => {
   return function (dispatch: AppDispatch) {
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

//выход из системы
export const logOut: AppThunk = (refreshToken: string) => {
   return function (dispatch: AppDispatch) {
      dispatch({ type: SIGNOUT_REQUEST })

      signOut(refreshToken)
         .then(res => {
            if (res && res.success) {
               localStorage.removeItem('token')
               deleteCookie('token')
               dispatch({
                  type: SIGNOUT_SUCCESS,
               })
            } else {
               dispatch({ type: SIGNOUT_FAILED })
            }
         })
         .catch(err => {
            dispatch({ type: SIGNOUT_FAILED })
         })
   }
}

//обновление токена
export const updateToken: AppThunk = () => {
   return function (dispatch: AppDispatch) {
      dispatch({ type: TOKEN_REQUEST })

      refreshToken()
         .then(res => {
            if (res && res.success) {
               let authToken = res.accessToken.split('Bearer ')[1]
               setCookie('token', authToken)
               localStorage.setItem('token', res.refreshToken)
               dispatch({ type: TOKEN_SUCCESS })
            } else {
               dispatch({ type: TOKEN_FAILED })
            }
         })
         .catch(err => {
            dispatch({ type: TOKEN_FAILED })
         })
   }
}

//запрос авторизации
export const authorizationUser: AppThunk = (email: string, password: string) => {
   return function (dispatch: AppDispatch) {
      dispatch({ type: AUTHORIZATION_REQUEST })

      authorizationLogin(email, password)
         .then(res => {
            if (res && res.success) {
               let authToken = res.accessToken.split('Bearer ')[1]
               setCookie('token', authToken)
               localStorage.setItem('token', res.refreshToken)
               dispatch({ type: AUTHORIZATION_SUCCESS, user: res.user })
            } else {
               dispatch({ type: AUTHORIZATION_FAILED })
            }
         })
         .catch(err => {
            dispatch({ type: AUTHORIZATION_FAILED })
         })
   }
}