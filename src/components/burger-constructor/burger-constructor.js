import React from 'react';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ItemsList from './items-list/items-list'
import styles from './burger-constructor.module.css'
import {burger} from "../../types/types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";



const BurgerConstructor = props => {
	const cls = 'text text_type_digits-medium ' + styles.price_text,

		  [winVisible, setWinVisible] = React.useState(false),

		  getNumber = () => 123456789,

		  openWin = () => {
			  setWinVisible(true)
		  },

		  closeWin = () => {
			  setWinVisible(false)
		  };

	return (
		props.currentBurger ?
			<div className={styles.panel}>
			<ItemsList
				bun={props.currentBurger.bun}
				ingredients={props.currentBurger.ingredients}
			/>
			<div className={styles.total} onClick={openWin}>
				<div className={styles.price}>
					<p className={cls}>
						{props.currentBurger.total}
					</p>
					<CurrencyIcon type="primary"/>
				</div>
				<Button type="primary" size="large">
					Оформить заказ
				</Button>
			</div>
			<Modal visible={winVisible} onClickClose={closeWin}>
				<OrderDetails number={getNumber()}/>
			</Modal>
		</div>
		:
		<div className={styles.panel}/>
	)
};

BurgerConstructor.propTypes = {
	currentBurger: burger
};

export default BurgerConstructor;