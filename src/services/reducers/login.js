import { REQUEST, SUCCESS, ERROR, SET } from "../actions/login";

const initState = {
	loading:  false,
	hasError: false,
	name:     '',
	email:    '',
	form: {
		password: '',
		email: ''
	}
};

export const login = (state = initState, action) => {
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