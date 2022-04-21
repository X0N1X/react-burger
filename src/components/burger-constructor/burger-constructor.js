import React from 'react';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ItemsList from './items-list/items-list'
import styles from './burger-constructor.module.css'
import {burger} from "../../types/types";

class BurgerConstructor extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div style = {{width:600, marginTop:100}}>
				<ItemsList
					bun         = {this.props.currentBurger.bun}
					ingredients = {this.props.currentBurger.ingredients}
				/>
				<div className = {styles.total}>
					<div className = {styles.price}>
						<p className = "text text_type_digits-medium" style = {{marginRight:'8px'}}>
							{this.props.currentBurger.total}
						</p>
						<CurrencyIcon type = "primary"/>
					</div>
					<Button type = "primary" size = "large">
						Оформить заказ
					</Button>
				</div>
			</div>
		)
	}
}

BurgerConstructor.propTypes = {
	currentBurger: burger.isRequired
};

export default BurgerConstructor