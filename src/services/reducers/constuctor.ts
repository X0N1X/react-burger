import { ADD, DELETE, RESET, ORDER } from '../actions/constructor'
import {TIngredient} from "../../types/types";

export type TBurger = {
	bun: TIngredient | null,
	ingredients: TIngredient[];
}

export type TCurrentBurger = {
	currentBurger: TBurger
}

const initState:TCurrentBurger = {
	currentBurger: {
		bun:         null,
		ingredients: []
	}
};

/**
 * Перемещение элемегнов в массиве
 * @param t - массив
 * @param i - индекс откуда
 * @param y - индекс куда
 * @return {*[]}
 */
const move = (t:TIngredient[], i:number, y:number) => [
	...t.slice(0,y<=i?y:i),
	y<=i?t[i]:null,
	...t.slice(y<=i?y:i+1,y<=i?i:y+1),
	y>i?t[i]:null,
	...t.slice(y<=i?i+1:y+1)
].filter(k=>k!==null);

export const burger = (state = initState, action:TAction) => {
	switch (action.type) {

		case ADD:
			if (action.data.type === 'bun') {
				return {
					...state,
					currentBurger:{
						...state.currentBurger, bun: action.data
					}
				};
			} else {
				return {
					...state,
					currentBurger: {
						...state.currentBurger,
						ingredients: [...state.currentBurger.ingredients, {...action.data, uuid:action.uuid}]
					}
				}
			}

		case DELETE:
			return {
				...state,
				currentBurger: {
					...state.currentBurger,
					ingredients: [
						...state.currentBurger.ingredients.slice(0, action.data),
						...state.currentBurger.ingredients.slice(action.data + 1)
					]
				}
			};

		case ORDER:
			return {
			... state,
				currentBurger: {
					...state.currentBurger,
					ingredients: move(state.currentBurger.ingredients, action.data.from, action.data.to)
				}
			};

		case RESET:
			return initState;

		default:
			return state;
	}
};