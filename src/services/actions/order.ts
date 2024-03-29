import { checkResponse, order as url } from "../urls";
import { TBurger } from "../reducers/constuctor";
import { TAppDispatch, TAppThunk } from "../store";

export const REQUEST = 'ORDER_REQUEST';
export const SUCCESS = 'ORDER_SUCCESS';
export const ERROR   = 'ORDER_ERROR';

export const postOrder: TAppThunk = (currentBurger:TBurger, token:string)  => {
	return async (dispatch:TAppDispatch) => {
		dispatch({type: REQUEST});

		const ingredients = (currentBurger?.ingredients &&
			Array.from(currentBurger.ingredients, item => item._id)) || [];

		currentBurger?.bun && ingredients.push(currentBurger.bun._id);

		fetch(url, {
			method: "POST",
			headers: {
				'authorization': `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ingredients: ingredients})
		}).then(checkResponse).then((result) => {
			if (result && result.success) {
				dispatch({
					type:   SUCCESS,
					number: result?.order?.number || 0
				});
			} else {
				dispatch({
					type: ERROR
				});
			}
		}).catch((e) => {
			dispatch({
				type: ERROR
			});
		});
	}
};
