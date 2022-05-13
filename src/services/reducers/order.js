import {REQUEST, SUCCESS, ERROR} from '../actions/order'

const initState = {
	currentBurger: null,
	number:        0,
	loading:       false,
	hasError:      false
};

export const order = (state = initState, action) => {
	switch (action.type) {

		case REQUEST:
			return {...state, loading:  true, hasError: false};
		case SUCCESS:
			return {...state, loading: false, hasError: false, number: action.number};
		case ERROR:
			return {...state, loading: false, hasError: true};
		default:
			return state;
	}
};