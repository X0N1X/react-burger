import { setCookie, checkResponse, registration as url, fetchWithRefreshToken } from "../urls";
import { TAppDispatch, TAppThunk } from "../store";
import { GET_SUCCESS } from "./user";

export const REQUEST = 'REGISTRATION_REQUEST';
export const SUCCESS = 'REGISTRATION_SUCCESS';
export const ERROR   = 'REGISTRATION_ERROR';
export const SET     = "REGISTRATION_SET";

export const setRegistration = (field:string, value:string):TAction => ({type: SET, field, value});

export const registration: TAppThunk = (form) => {
	return async (dispatch:TAppDispatch) => {
		dispatch({type: REQUEST});
		fetchWithRefreshToken(url, {
			method: 'POST',
			mode:   'cors',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form),
		}).then((result) => {
			if (result && result.success) {
				const accessToken = result.accessToken.split("Bearer ")[1];
				setCookie("accessToken", accessToken, { path: '/' });
				localStorage.setItem("refreshToken", result.refreshToken);
				dispatch({type: GET_SUCCESS, name: result.user.name, email: result.user.email});
				dispatch({
					type: SUCCESS,
				});

			} else {
				dispatch({
					type: ERROR,
				});
			}
		}).catch((e) => {
			dispatch({
				type: ERROR
			});
		});
	}
};
