import {createStore, applyMiddleware, compose, ActionCreator, Action} from 'redux';
import { root } from './reducers/root';
import thunk, { ThunkAction } from 'redux-thunk';

import { socketMiddleware } from "./websocket";
import { WSActions } from "./actions/ws";
import { TFeedOrderDetailActions } from "./actions/feedOrderDetail";


const composeEnhancers =
	// @ts-ignore
		  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			  // @ts-ignore
			  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			  : compose;


const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(WSActions)));

export const store = createStore(root, enhancer);

export type TApplicationActions =
	| TFeedOrderDetailActions
	| TAction

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
export type TAppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TApplicationActions>>;
