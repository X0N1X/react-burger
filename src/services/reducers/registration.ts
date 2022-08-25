import { REQUEST, SUCCESS, ERROR, SET } from "../actions/registration";

type TRegistration = {
	loading:  boolean;
	hasError: boolean;
	form: {
		name:     string;
		email:    string;
		password: string;
	}
};

const initState:TRegistration = {
	loading:  false,
	hasError: false,
	form: {
		name:     '',
		email:    '',
		password: ''
	}
};

export const registration = (state = initState, action:TAction): TRegistration => {
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