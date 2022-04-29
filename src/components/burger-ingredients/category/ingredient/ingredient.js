import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import {ingredient} from "../../../../types/types";


const Ingredient = (props) => {
	const cls = 'text text_type_digits-small ' + styles.price_text;

	return (
		<li className = {styles.ingredient}>
			<img className = {styles.image} src = {props.item.image} alt = {props.item.name}/>
			<span className = {styles.price}>
				<p className = {cls}>
					{props.item.price}
				</p>
				<CurrencyIcon type = "primary"/>
			</span>
			{props.item.name}
		</li>
	);
};

Ingredient.propTypes = {
	item: ingredient.isRequired
};

export default Ingredient;