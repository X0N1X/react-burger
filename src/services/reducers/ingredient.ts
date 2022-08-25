import { OPEN, CLOSE } from "../actions/ingredient";

type TIngredientWindow = {
	data:      object;
	isVisible: boolean;
}

const initState: TIngredientWindow = {
	data: {},
	isVisible: false
};

export const ingredient = (state = initState, action:TAction) => {
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