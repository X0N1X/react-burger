import { checkResponse, ingredients as url} from "../urls";
import { TAppDispatch, TAppThunk } from "../store";

export const REQUEST = 'STORE_REQUEST';
export const SUCCESS = 'STORE_SUCCESS';
export const ERROR   = 'STORE_ERROR';

export const INCREASE = 'STORE_INCREASE';
export const DECREASE = 'STORE_DECREASE';

export const getIngredients: TAppThunk = () => {
	return async (dispatch: TAppDispatch) => {
		dispatch({type: REQUEST});
		fetch(url).then(checkResponse).then((result) => {
			if (result && result.success) {
				dispatch({
					type: SUCCESS,
					data: result.data
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