import { OPEN, CLOSE } from "../actions/ingredient";

const initState = {
	data: {},
	isVisible: false
};

export const ingredient = (state = initState, action) => {
	switch (action.type) {
		case OPEN:
			return {
				data: action.data,
				isVisible: true
			};
		case CLOSE:
			return {
				data: {},
				isVisible: false
			};
		default:
			return state;
	}
};