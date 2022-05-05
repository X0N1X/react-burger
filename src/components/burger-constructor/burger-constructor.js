import React, { useReducer } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ItemsList from './items-list/items-list'
import styles from './burger-constructor.module.css'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { BurgerContext } from "../../services/burgerContext";
import { checkResponse, order as url} from "../../services/urls";



const BurgerConstructor = props => {
	const cls = 'text text_type_digits-medium ' + styles.price_text,

		  [winVisible, setWinVisible] = React.useState(false),

		  {state, setState} = React.useContext(BurgerContext),

		  reducer = (/*price, action*/) => {
				// switch (action?.type) {
				// 	case "addIngredient":
				// 		return {...price, total: price.total + price.ingredient.price};
				// 	case "removeIngredient":
				// 		return {...price, total: state.total - price.ingredient.price};
				// 	default:
						const burger = state.order.currentBurger;
						return {total: burger ? burger.ingredients.reduce(
								(prevValue, currentValue) => prevValue + currentValue.price,
								(burger?.bun?.price * 2) || 0
							) : 0};
			   // }
		  },

		  [price, dispatch] = useReducer(reducer, {total:0}),

		  getOrder = () => {
			const ingredients = state.order?.currentBurger?.ingredients &&
				Array.from(state.order.currentBurger.ingredients, item => item._id);

			state.order?.currentBurger?.bun && ingredients.push(state.order.currentBurger.bun._id);

			setState({...state, order:{...state.order, hasError:false, loading:true}});

			fetch(url, {
				  method: "POST",
				  headers: {
					  "Content-Type": "application/json",
				  },
				  body: JSON.stringify({ingredients: ingredients})
			}).then(checkResponse).then((result) => {
				  if (result && result.success) {
					  setState({...state, order:{...state.order, number:result?.order?.number || 0,  hasError:false, loading:false}});
				  } else {
					  setState({...state, order:{...state.order, hasError:true, loading:false}});
				  }
			}).catch((e) => {
				  setState({...state, order:{...state.order, hasError:true, loading:false}});
			});
		  },

		  openWin = () => {
			  setWinVisible(true);
			  getOrder();
		  },

		  closeWin = () => {
			  setWinVisible(false)
		  };

	React.useEffect(()=>dispatch(),[state.order.currentBurger]);

	return (
		state.order.currentBurger ?
			<div className={styles.panel}>
			<ItemsList
				bun={state.order.currentBurger.bun}
				ingredients={state.order.currentBurger.ingredients}
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
				<OrderDetails loading={state.order.loading} hasError={state.order.hasError} number={state.order.number}/>
			</Modal>
		</div>
		:
		<div className={styles.panel}/>
	)
};

export default BurgerConstructor;