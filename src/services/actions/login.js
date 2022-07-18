import { recoveryPassword } from "../../utils/api";

//восстановление пароля (RECOVERY - восстановить)
export const RECOVERY_PASSWORD_REQUEST = "RECOVERY_PASSWORD_REQUEST";
export const RECOVERY_PASSWORD_SUCCESS = "RECOVERY_PASSWORD_SUCCESS";
export const RECOVERY_PASSWORD_FAILED = "RECOVERY_PASSWORD_FAILED";


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
