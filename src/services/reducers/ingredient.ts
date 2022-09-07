import { OPEN, CLOSE } from "../actions/ingredient";
import { TIngredient } from "../../types/types";

type TIngredientWindow = {
	data:      TIngredient | {};
	isVisible: boolean;
}

export const initState: TIngredientWindow = {
	data:      {},
	isVisible: false
};

export const ingredient = (state = initState, action:TAction): TIngredientWindow => {
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