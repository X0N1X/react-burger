import { FORGOT_REQUEST, FORGOT_SUCCESS, FORGOT_ERROR, FORGOT_SET } from "../actions/password";
import { RESET_REQUEST,  RESET_SUCCESS,  RESET_ERROR, RESET_SET }   from "../actions/password";

export type TForgotForm = {
	email: string;
}

export type TResetForm = {
	password: string;
	token:    string;
}

type TPassword = {
	forgotLoading:  boolean;
	forgotHasError: boolean;
	forgotSuccess:  boolean;
	forgotForm:     TForgotForm;
	resetLoading:   boolean;
	resetHasError:  boolean;
	resetSuccess:   boolean;
	resetForm:      TResetForm;
}

export const initState:TPassword = {
	forgotLoading:  false,
	forgotHasError: false,
	forgotSuccess:  false,
	forgotForm: {
		email:    ''
	},
	resetLoading:  false,
	resetHasError: false,
	resetSuccess:  false,
	resetForm: {
		password: '',
		token:    ''
	}
};

export const password = (state = initState, action:TAction): TPassword => {
	switch (action.type) {

		case FORGOT_REQUEST:
			return {...state, forgotLoading: true, forgotHasError: false, forgotSuccess: false};
		case FORGOT_SUCCESS:
			return {
				...state,
				forgotLoading:  false,
				forgotHasError: false,
				forgotSuccess:  true,
				forgotForm: {email: ''}
			};
		case FORGOT_ERROR:
			return {...state, forgotLoading: false, forgotHasError: true, forgotSuccess: false};
		case FORGOT_SET: {
			return {...state, forgotForm: {...state.forgotForm, [action.field]: action.value}};
		}

		case RESET_REQUEST:
			return {...state, resetLoading: true, resetHasError: false, resetSuccess: false};
		case RESET_SUCCESS:
			return {
				...state,
				resetLoading:  false,
				resetHasError: false,
				resetSuccess:  true,
				resetForm: {token: '', password: ''}
			};
		case RESET_ERROR:
			return {...state, resetLoading: false, resetHasError: true, resetSuccess: false};
		case RESET_SET: {
			return {...state, resetForm: {...state.resetForm, [action.field]: action.value}};
		}
		
		default:
			return state;
	}
};