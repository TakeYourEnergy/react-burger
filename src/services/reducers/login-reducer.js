import {
   RECOVERY_PASSWORD_REQUEST,
   RECOVERY_PASSWORD_SUCCESS,
   RECOVERY_PASSWORD_FAILED,

   REGISTRATION_USER_REQUEST,
   REGISTRATION_USER_SUCCESS,
   REGISTRATION_USER_FAILED,

   GET_RESET_PASSWORD_REQUEST,
   GET_RESET_PASSWORD_SUCCESS,
   GET_RESET_PASSWORD_FAILED,

   GET_PROFILE_REQUEST,
   GET_PROFILE_SUCCESS,
   GET_PROFILE_FAILED,

   UPDATE_PROFILE_REQUEST,
   UPDATE_PROFILE_SUCCESS,
   UPDATE_PROFILE_FAILED,

   SIGNOUT_REQUEST,
   SIGNOUT_SUCCESS,
   SIGNOUT_FAILED,

   TOKEN_REQUEST,
   TOKEN_SUCCESS,
   TOKEN_FAILED,

   AUTHORIZATION_REQUEST,
   AUTHORIZATION_SUCCESS,
   AUTHORIZATION_FAILED
} from "../actions/login";

const initialState = {
   user: null,

   forgotPasswordRequest: false,
   forgotPasswordSuccess: false,
   forgotPasswordFailed: false,

   newUserRequest: false,
   newUserFailed: false,

   resetPasswordRequest: false,
   resetPasswordSuccess: false,
   resetPasswordFailed: false,

   getProfileRequest: false,
   getProfileFailed: false,
   answer: false,

   updateProfileRequest: false,
   updateProfileFailed: false,

   signOutRequest: false,
   signOutFailed: false,

   tokenRequest: false,
   tokenSuccess: false,
   tokenFailed: false,

   authorizationRequest: false,
   authorizationFailed: false
}



export const loginReducer = (state = initialState, action) => {

   switch (action.type) {
      case RECOVERY_PASSWORD_REQUEST:
         return {
            ...state,
            // Запрос начал выполняться
            forgotPasswordRequest: true,
            // Сбрасываем статус наличия ошибок от предыдущего запроса
            // на случай, если он был и завершился с ошибкой
            forgotPasswordFailed: false,
         }
      case RECOVERY_PASSWORD_SUCCESS:
         return {
            ...state,
            //Запрос выполнился успешно
            forgotPasswordSuccess: true,
            // Запрос закончил своё выполнение
            forgotPasswordRequest: false,
            forgotPasswordFailed: false,
         }
      case RECOVERY_PASSWORD_FAILED:
         return {
            ...state,
            // Запрос выполнился с ошибкой, 
            // выставляем соответствующие значения в хранилище
            forgotPasswordFailed: true,
            // Запрос закончил своё выполнение
            forgotPasswordRequest: false
         }

      case REGISTRATION_USER_REQUEST:
         return {
            ...state,
            newUserRequest: true,
            newUserFailed: false
         }
      case REGISTRATION_USER_SUCCESS:
         return {
            ...state,
            newUserRequest: false,
            newUserFailed: false,
            user: action.user
         }
      case REGISTRATION_USER_FAILED:
         return {
            newUserRequest: false,
            newUserFailed: true
         }

      case GET_RESET_PASSWORD_REQUEST:
         return {
            ...state,
            resetPasswordRequest: true,
            resetPasswordFailed: false
         }
      case GET_RESET_PASSWORD_SUCCESS:
         return {
            ...state,
            resetPasswordSuccess: true,
            resetPasswordRequest: false,
            resetPasswordFailed: false,
         }
      case GET_RESET_PASSWORD_FAILED:
         return {
            ...state,
            resetPasswordFailed: true,
            resetPasswordRequest: false
         }

      case GET_PROFILE_REQUEST:
         return {
            ...state,
            getProfileRequest: true,
            getProfileFailed: false,
            answer: false,
         }
      case GET_PROFILE_SUCCESS:
         return {
            ...state,
            getProfileRequest: false,
            getProfileFailed: false,
            user: action.user,
            answer: true,
         }
      case GET_PROFILE_FAILED:
         return {
            ...state,
            getProfileRequest: false,
            getProfileFailed: true,
            answer: false,
         }
      case UPDATE_PROFILE_REQUEST:
         return {
            ...state,
            updateProfileRequest: true,
            updateProfileFailed: false,
         }
      case UPDATE_PROFILE_SUCCESS:
         return {
            ...state,
            updateProfileRequest: false,
            user: action.user,
            updateProfileFailed: false,
         }
      case UPDATE_PROFILE_FAILED:
         return {
            ...state,
            updateProfileRequest: false,
            updateProfileFailed: true,
         }

      case SIGNOUT_REQUEST:
         return {
            ...state,
            signOutRequest: true,
            signOutFailed: false,
         }
      case SIGNOUT_SUCCESS:
         return {
            ...state,
            signOutRequest: false,
            signOutFailed: false,
            user: null
         }
      case SIGNOUT_FAILED:
         return {
            ...state,
            signOutRequest: false,
            signOutFailed: true,
         }

      case TOKEN_REQUEST:
         return {
            ...state,
            tokenRequest: true,
            tokenSuccess: false,
            tokenFailed: false,
         }
      case TOKEN_SUCCESS:
         return {
            tokenRequest: false,
            tokenSuccess: true,
            tokenFailed: false,
         }
      case TOKEN_FAILED:
         return {
            tokenRequest: false,
            tokenSuccess: false,
            tokenFailed: true,
         }

      case AUTHORIZATION_REQUEST:
         return {
            ...state,
            authorizationRequest: true,
            authorizationFailed: false
         }
      case AUTHORIZATION_SUCCESS:
         return {
            authorizationRequest: false,
            authorizationFailed: false,
            user: action.user
         }
      case AUTHORIZATION_FAILED:
         return {
            authorizationRequest: false,
            authorizationFailed: true,
         }
      default:
         return state
   }
}