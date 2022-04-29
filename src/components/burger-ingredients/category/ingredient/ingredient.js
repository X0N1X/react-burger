import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import {ingredient} from "../../../../types/types";
import Modal from "../../../modal/modal"
import IngredientDetails from "../../../ingredients-details/ingredients-details"



const Ingredient = (props) => {
	const cls = 'text text_type_digits-small ' + styles.price_text,

		  [winVisible, setWinVisible] = React.useState(false),

		  openWin = () => {
			  setWinVisible(true)
		  },
		  closeWin = () => {
			  setWinVisible(false)
		  };

	return (
		<>
			<li className={styles.ingredient} onClick={openWin}>
				<img className={styles.image} src={props.item.image} alt={props.item.name}/>
				<span className={styles.price}>
					<p className={cls}>
						{props.item.price}
					</p>
					<CurrencyIcon type="primary"/>
				</span>
				{props.item.name}
			</li>

			<Modal
				visible      = {winVisible}
				title        = "Детали ингридиента"
				onClickClose = {closeWin}>
					<IngredientDetails {...props.item} />
			</Modal>
		</>
	);
};

Ingredient.propTypes = {
	item: ingredient.isRequired
};

export default Ingredient;