import { getUser  } from "./user";
import { setCookie, checkResponse, registration as url, fetchWithRefreshToken } from "../urls";;

export const REQUEST = 'REGISTRATION_REQUEST';
export const SUCCESS = 'REGISTRATION_SUCCESS';
export const ERROR   = 'REGISTRATION_ERROR';
export const SET     = "REGISTRATION_SET";

export const setRegistration = (field, value) => ({type: SET, field, value});

export const registration = () => {

	return async (dispatch, getState) => {
		dispatch({type: REQUEST});
		fetchWithRefreshToken(url, {
			method: 'POST',
			mode:   'cors',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(getState().registration.form),
		}).then((result) => {
			if (result && result.success) {
				const accessToken = result.accessToken.split("Bearer ")[1];
				setCookie("accessToken", accessToken, { path: '/' });
				localStorage.setItem("refreshToken", result.refreshToken);

				dispatch(getUser());
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
