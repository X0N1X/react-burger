import { setCookie, checkResponse, login as url} from "../urls";
import { GET_SUCCESS } from "./user";
import { TAppDispatch, TAppThunk } from "../store";
import { TLoginForm } from "../reducers/login";

export const REQUEST = 'LOGIN_REQUEST';
export const SUCCESS = 'LOGIN_SUCCESS';
export const ERROR   = 'LOGIN_ERROR';
export const SET     = 'LOGIN_SET';

export const setLogin = (field:string, value:string):TAction  => ({type: SET, field, value});

export const login: TAppThunk = (form:TLoginForm) => {
	return async (dispatch:TAppDispatch) => {
		dispatch({type: REQUEST});
		fetch(url, {
			method:  'POST',
			mode:    'cors',
			headers: {
				"Content-Type": "application/json",
			},
			body:    JSON.stringify(form),
		}).then(checkResponse).then(result => {
			if (result && result.success) {
				let accessToken = result.accessToken.split("Bearer ")[1];
				setCookie("accessToken", accessToken, { path: '/' });
				localStorage.setItem("refreshToken", result.refreshToken);
				dispatch({type: SUCCESS, user: result.user});
				dispatch({type: GET_SUCCESS, name: result.user.name, email: result.user.email});
			} else {
				dispatch({type: ERROR});
			}
		}).catch((e) => {
			dispatch({type: ERROR});
		});
	}
};

