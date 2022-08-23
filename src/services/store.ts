import { createStore, applyMiddleware, compose } from 'redux';
import { root } from './reducers/root';
import thunk from 'redux-thunk';

import { socketMiddleware } from "./websocket";
import { WSActions } from "./actions/ws";

const composeEnhancers =
	// @ts-ignore
		  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			  // @ts-ignore
			  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			  : compose;


const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(WSActions)));

export const store = createStore(root, enhancer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

