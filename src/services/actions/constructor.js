
export const ADD      = 'CONSTRUCTOR_ADD_INGREDIENT';
export const DELETE   = 'CONSTRUCTOR_DELETE_INGREDIENT';
export const RESET    = 'CONSTRUCTOR_RESET';
export const ORDER    = 'CONSTRUCTOR_CHANGE_ORDER';

export const TMP      = 'CONSTRUCTOR_TMP';

const getTmpBurger = store => {
	return {
		bun: store[0].children.find((item => item._id === '60d3b41abdacab0026a733c6')),
		ingredients: [
			store[1].children.find((item => item._id === '60d3b41abdacab0026a733c8')),
			store[1].children.find((item => item._id === '60d3b41abdacab0026a733c9')),
			store[1].children.find((item => item._id === '60d3b41abdacab0026a733cb')),
			store[2].children.find((item => item._id === '60d3b41abdacab0026a733cc')),
			store[1].children.find((item => item._id === '60d3b41abdacab0026a733d1')),
			store[1].children.find((item => item._id === '60d3b41abdacab0026a733d3'))
		]
	};
};

export const setTmpBurger = (store) => {

	return (dispatch) => {
		dispatch({type: TMP, data:getTmpBurger(store)});
	}
};
