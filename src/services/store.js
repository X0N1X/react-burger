import { createStore, applyMiddleware, compose } from 'redux';
import { root } from './reducers/root';
import thunk from 'redux-thunk';

const composeEnhancers =
		  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(root, enhancer);