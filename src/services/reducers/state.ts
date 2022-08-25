import { CHANGE_GROUP, CHANGE_TAB } from '../actions/state'

type TState = {
	tab:   string;
	group: string;
}

const initState:TState = {
	tab:   'constructor.ts',
	group: 'bun'
};

export const state = (state = initState, action:TAction) => {
	switch (action.type) {
		case CHANGE_GROUP:
			return {...state, group:action.data};
		case CHANGE_TAB:
			return {...state, tab:action.data};
		default:
			return state;
	}
};