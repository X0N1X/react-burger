import React, { useReducer } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ItemsList from './items-list/items-list'
import styles from './burger-constructor.module.css'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import { postOrder } from '../../services/actions/order';
import { ADD, RESET } from "../../services/actions/constructor";
import { useDrop } from "react-dnd";
import { INCREASE } from "../../services/actions/store";
import { getIngredients } from "../../services/actions/store";
import { useNavigate } from "react-router-dom";
import { checkAccessToken } from "../../services/urls";

const BurgerConstructor = () => {
	const dispatch = useDispatch(),
		  navigate = useNavigate();

	const cls = 'text text_type_digits-medium ' + styles.price_text;

	const [winVisible, setWinVisible] = React.useState(false);

	const { order } = useSelector(state=>state);
	const { currentBurger } = useSelector(state=>state.burger);
	const { isAuth } = useSelector(state => state.user);

	const reducer = () => {
		const burger = currentBurger;
		return {total: (burger?.ingredients ? burger.ingredients.reduce(
			(prevValue, currentValue) => prevValue + currentValue.price,
			0) : 0) + (burger?.bun ? burger.bun.price * 2 : 0)};
	};

	const [price, calcPrice] = useReducer(reducer, {total:0});

	const openWin = () => {
		if (isAuth && checkAccessToken()) {
			setWinVisible(true);
			dispatch(postOrder(currentBurger));
		} else {
			navigate("/login");
		}
	};

	const closeWin = () => {
		setWinVisible(false);
		dispatch({
			type: RESET
		});
	};

	React.useEffect(()=>calcPrice(),[currentBurger]);

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop (item) {
			dispatch({
				type: ADD,
				data: item
			});
			dispatch({
				type: INCREASE,
				data: item
			});
		}
	});

	return (
		currentBurger && (currentBurger.bun || currentBurger.ingredients.length) ?
			<div className={styles.panel} ref={dropTarget}>
				<ItemsList
					bun={currentBurger.bun}
					ingredients={currentBurger.ingredients}
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
					<OrderDetails loading={order.loading} hasError={order.hasError} number={order.number}/>
				</Modal>
			</div>
		:
			<div className={styles.panel} ref={dropTarget}>
				Переместите сюда булку и ингредиетны
			</div>
	)
};

export default BurgerConstructor;