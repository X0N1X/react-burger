import { ADD, DELETE, RESET, TMP, ORDER } from '../actions/constructor'

const initState = {
	currentBurger: {
		bun:         undefined,
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
const move = (t,i,y) => [
	...t.slice(0,y<=i?y:i),
	y<=i?t[i]:null,
	...t.slice(y<=i?y:i+1,y<=i?i:y+1),
	y>i?t[i]:null,
	...t.slice(y<=i?i+1:y+1)
].filter(k=>k!==null);

export const burger = (state = initState, action) => {
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
						ingredients: [...state.currentBurger.ingredients, action.data]
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
			return {...state, currentBurger: initState};

		case TMP:
			return {...state, currentBurger: action.data};

		default:
			return state;
	}
};