import { combineReducers } from 'redux';
import { state } from './state';
import { order } from './order';
import { store } from './store';
import { burger } from './constuctor';
import { ingredient } from './ingredient';

export const root = combineReducers({
	state,
	order,
	store,
	ingredient,
	burger
});
