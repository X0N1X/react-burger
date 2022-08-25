import {REQUEST, SUCCESS, ERROR, INCREASE, DECREASE } from '../actions/store'
import { TGroup, TIngredient } from "../../types/types";

export interface IStore {
	store:      TGroup[];
	raw:        TIngredient[];
	loading:    boolean;
	hasError:   boolean;
}

const initState: IStore = {
	store:       [],
	raw:         [],
	loading:    false,
	hasError:   false
};

const getGroups = (store:TIngredient[]) => {
	const groups: TGroup[] = [];

	store.forEach(item => {
		const index = groups.findIndex(group => group.name === item.type);

		item.used = 0;

		if (index >= 0) {
			groups[index].children.push(item);

		} else {
			let text = '';
			switch (item.type) {
				case 'bun':
					text = 'Булки';
					break;
				case 'sauce':
					text = 'Соусы';
					break;
				case 'main':
					text = 'Начинки';
					break;
			}

			groups.push({
				name:     item.type,
				text:     text,
				children: [item]
			});
		}
	});
	return groups;
};

export const store = (state = initState, action:TAction): IStore => {
	switch (action.type) {
		case REQUEST:
			return {
				...state,
				loading:  true,
				hasError: false
			};
		case SUCCESS:
			return {
				...state,
				store:    getGroups(action.data),
				raw:      action.data,
				loading:  false,
				hasError: false
			};
		case ERROR:
			return {
				...state,
				loading:  false,
				hasError: true
			};
		case INCREASE:
			if (action.data.type === 'bun') {
				return {
					...state,
					store: state.store.map((group) => {
						if (group.name === 'bun') {
							return {...group, children: group.children.map((item) => {
									return {...item, used:item._id === action.data._id ? 2 : 0}
								})
							}
						} else {
							return {...group};
						}
					})
				};
			} else {
				return {
					...state,
					store: state.store.map((group) => {
						return {...group, children: group.children.map((item) => {
							return {...item, used:item._id === action.data._id ? (item.used ? ++item.used: 1) : item.used}
						})
					}})
				};
			}
		case DECREASE:
			if (action.data.type === 'bun') {
				return state;
			} else {
				return {
					...state,
					store: state.store.map((group) => {
						return {...group, children: group.children.map((item) => {
								return {...item, used:item._id === action.data._id ? (item.used ? --item.used:0) : item.used}
							})
						}})
				};
			}
		default:
			return state;
	}
};