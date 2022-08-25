import {REQUEST, SUCCESS, ERROR} from '../actions/order'

type TCurrentOrder = {
	number?: number;
	loading: boolean;
	hasError: boolean;
}

const initState:TCurrentOrder = {
	number:        0,
	loading:       false,
	hasError:      false
};

export const order = (state = initState, action:TAction): TCurrentOrder => {
	switch (action.type) {

		case REQUEST:
			return {...state, loading:  true, hasError: false};
		case SUCCESS:
			return {...state, loading: false, hasError: false, number: action.number};
		case ERROR:
			return {...state, loading: false, hasError: true, number:0};
		default:
			return state;
	}
};