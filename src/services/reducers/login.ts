import { REQUEST, SUCCESS, ERROR, SET } from "../actions/login";

type TLogin = {
	loading:  boolean;
	hasError: boolean;
	auth:     boolean;
	name:     string;
	email:    string;
	form: {
		password: string;
		email:    string;
	}
}

const initState:TLogin = {
	loading:  false,
	hasError: false,
	auth:     false,
	name:     '',
	email:    '',
	form: {
		password: '',
		email: ''
	}
};

export const login = (state = initState, action:TAction): TLogin => {
	switch (action.type) {

		case REQUEST:
			return {...state, loading:  true, hasError: false};
		case SUCCESS:
			return {
				...state,
				loading:  false,
				hasError: false,
				auth:     true,
				name:     action.user.name,
				email:    action.user.email,
				form: {
					...initState.form
				}
			};
		case ERROR:
			return {...state, loading: false, hasError: true};
		case SET: {
			return {...state, form: {...state.form, [action.field]: action.value}};
		}
		default:
			return state;
	}
};