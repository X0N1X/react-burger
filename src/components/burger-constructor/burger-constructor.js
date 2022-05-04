import React, { useReducer } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ItemsList from './items-list/items-list'
import styles from './burger-constructor.module.css'
import { burger } from "../../types/types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ConstructorContext } from "../../services/constructorContext";
import { order as url } from "../../services/urls";


function reducer(state, action) {
	switch (action.type) {
		case "addIngredient":
			return {...state, total: state.total + action.ingredient.price};
		case "removeIngredient":
			return {...state, total: state.total - action.ingredient.price};
		default:
			throw new Error(`Wrong type of action: ${action.type}`);
	}
}

const getTotalPrice = burger => {

	return {total: burger ? burger.ingredients.reduce(
		(prevValue, currentValue) => prevValue + currentValue.price,
		(burger?.bun?.price * 2) || 0
	) : 0};
};

const BurgerConstructor = props => {
	const cls = 'text text_type_digits-medium ' + styles.price_text,

		  [winVisible, setWinVisible] = React.useState(false),

		  [state, setState] = React.useState({
			 isLoading: false,
			 hasError:  false
		  }),

		  {order, setOrder} = React.useContext(ConstructorContext),

		  [price, dispatch] = useReducer(reducer, getTotalPrice(order.currentBurger)),

		  getOrder = () => {
			const ingredients = order?.currentBurger?.ingredients &&
				Array.from(order.currentBurger.ingredients, item => item._id);

			order?.currentBurger?.bun && ingredients.push(order.currentBurger.bun._id);

			setState({...state, hasError:false, isLoading:true});

			fetch(url, {
				  method: "POST",
				  headers: {
					  "Content-Type": "application/json",
				  },
				  body: JSON.stringify({ingredients: ingredients})
			}).then((response) => {
				  return response.ok ? response.json() : Promise.reject(response.status);
			}).then((result) => {
				  if (result && result.success) {

					  setOrder({...order, number:result?.order?.number || 0});
					  setState({...state, hasError:false, isLoading:false});
				  } else {
					  setState({...state, hasError:true, isLoading:false});
				  }
			}).catch((e) => {
				  setState({...state, hasError:true, isLoading:false});
			});
		  },

		  openWin = () => {
			  setWinVisible(true);
			  getOrder();
		  },

		  closeWin = () => {
			  setWinVisible(false)
		  };

	return (
		order.currentBurger ?
			<div className={styles.panel}>
			<ItemsList
				bun={order.currentBurger.bun}
				ingredients={order.currentBurger.ingredients}
			/>
			<div className={styles.total}>
				<div className={styles.price}>
					<p className={cls}>
						{price.total}
					</p>
					<CurrencyIcon type="primary"/>
				</div>
				<Button type="primary" size="large" onClick={openWin}>
					Оформить заказ
				</Button>
			</div>
			<Modal visible={winVisible} onClickClose={closeWin}>
				<OrderDetails loading={state.isLoading} hasError={state.hasError} number={order.number}/>
			</Modal>
		</div>
		:
		<div className={styles.panel}/>
	)
};

// BurgerConstructor.propTypes = {
// 	currentBurger: burger
// };

export default BurgerConstructor;