import { REQUEST, SUCCESS, ERROR, SET } from "../actions/registration";

const initState = {
	loading:  false,
	hasError: false,
	form: {
		name:     '',
		email:    '',
		password: ''
	}
};

export const registration = (state = initState, action) => {
	switch (action.type) {

		case REQUEST:
			return {...state, loading:  true, hasError: false};
		case SUCCESS:
			return {
				...state,
				loading:  false,
				hasError: false,
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