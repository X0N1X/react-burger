import {REQUEST, SUCCESS, ERROR, INCREASE, DECREASE } from '../actions/store'

const initState = {
	store:       [],
	loading:    false,
	hasError:   false
};

const getGroups = store => {
	const groups = [];

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

export const store = (state = initState, action) => {
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
				store:     getGroups(action.data),
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
							return {...item, used:item._id === action.data._id ? ++item.used : item.used}
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
								return {...item, used:item._id === action.data._id ? --item.used : item.used}
							})
						}})
				};
			}
		default:
			return state;
	}
};