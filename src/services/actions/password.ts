import { checkResponse, forgot as forgotUrl, reset as resetUrl } from "../urls";
import { TAppThunk } from "../store";

export const FORGOT_REQUEST = "PASSWORD_FORGOT_REQUEST";
export const FORGOT_SUCCESS = "PASSWORD_FORGOT_SUCCESS";
export const FORGOT_ERROR   = "PASSWORD_FORGOT_ERROR";
export const FORGOT_SET     = "PASSWORD_FORGOT_SET";

export const RESET_REQUEST = "PASSWORD_RESET_REQUEST";
export const RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const RESET_ERROR   = "PASSWORD_RESET_ERROR";
export const RESET_SET     = "PASSWORD_RESET_SET";

export const setPasswordForgot = (field:string, value:string):TAction => ({type: FORGOT_SET, field, value});
export const setPasswordReset  = (field:string, value:string):TAction => ({type: RESET_SET,  field, value});

export const passwordForgot: TAppThunk = () => {
	return async (dispatch: any, getState: any) => {
		dispatch({
			type: FORGOT_REQUEST
		});
		fetch(forgotUrl, {
			method: 'POST',
			mode:   'cors',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(getState().password.forgotForm),
		}).then(checkResponse).then(result => {
			if(result && result.success) {
				dispatch({
					type: FORGOT_SUCCESS,
				});
			} else {
				dispatch({
					type: FORGOT_ERROR
				})
			}
		}).catch((e) => {
			dispatch({type: FORGOT_ERROR});
		});
	}
};

export const passwordReset: TAppThunk = () => {
	return async (dispatch: any, getState: any) => {
		dispatch({type: RESET_REQUEST});
		fetch(resetUrl, {
			method: 'POST',
			mode:   'cors',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(getState().password.resetForm),
		}).then(checkResponse).then(result => {
			if(result && result.success) {
				dispatch({type: RESET_SUCCESS});
			} else {
				dispatch({type: RESET_ERROR});
			}
		}).catch((e) => {
			dispatch({type: RESET_ERROR});
		});
	}
};