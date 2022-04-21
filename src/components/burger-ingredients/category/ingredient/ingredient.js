import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import {ingredient} from "../../../../types/types";


class Ingredient extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<li className = {styles.ingredient}>
				<img className = {styles.image} src = {this.props.item.image} alt = {this.props.item.name}/>
				<span className = {styles.price}>
					<p className = "text text_type_digits-small" style = {{marginRight:'8px'}}>
						{this.props.item.price}
					</p>
					<CurrencyIcon type = "primary"/>
				</span>
				{this.props.item.name}
			</li>
		);
	}
}

Ingredient.propTypes = {
	item: ingredient.isRequired
};

export default Ingredient;