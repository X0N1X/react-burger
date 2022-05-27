import { combineReducers } from 'redux';
import { state }           from './state';
import { order }           from './order';
import { store }           from './store';
import { burger }          from './constuctor';
import { ingredient }      from './ingredient';
import { login }           from './login';
import { registration }    from './registration';
import { password }        from './password';
import { user }            from './user';

export const root = combineReducers({
	state,
	order,
	store,
	ingredient,
	burger,
	login,
	registration,
	password,
	user
});
