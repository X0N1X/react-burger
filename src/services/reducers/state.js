import { CHANGE_GROUP, CHANGE_TAB } from '../actions/state'

const initState = {
	tab:   'constructor',
	group: 'bun'
};


export const state = (state = initState, action) => {
	switch (action.type) {
		case CHANGE_GROUP:
			return {...state, group:action.data};
		case CHANGE_TAB:
			return {...state, tab:action.data};
		default:
			return state;
	}
};