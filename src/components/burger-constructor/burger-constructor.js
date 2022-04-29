import React from 'react';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ItemsList from './items-list/items-list'
import styles from './burger-constructor.module.css'
import {burger} from "../../types/types";

const BurgerConstructor = props => {

	const cls = 'text text_type_digits-medium ' + styles.price_text;
	return (props.currentBurger ?
		<div className={styles.panel}>
			<ItemsList
				bun         = {props.currentBurger.bun}
				ingredients = {props.currentBurger.ingredients}
			/>
			<div className = {styles.total}>
				<div className = {styles.price}>
					<p className = {cls}>
						{props.currentBurger.total}
					</p>
					<CurrencyIcon type = "primary"/>
				</div>
				<Button type = "primary" size = "large">
					Оформить заказ
				</Button>
			</div>
		</div>
			:
		<div className={styles.panel}/>
	)
};

BurgerConstructor.propTypes = {
	currentBurger: burger
};

export default BurgerConstructor;