import React from 'react';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import { ingredient } from "../../../../types/types";
import Modal from "../../../modal/modal"
import IngredientDetails from "../../../ingredients-details/ingredients-details"
import {useDispatch, useSelector} from "react-redux";
import { OPEN, CLOSE} from "../../../../services/actions/ingredient";
import { useDrag } from "react-dnd";


const Ingredient = ({ item }) => {
	const cls = 'text text_type_digits-small ' + styles.price_text,

		  dispatch = useDispatch(),

		  { isVisible } = useSelector(store => store.ingredient),

		  [, dragRef] = useDrag({
			  type: 'ingredient',
			  item: item
		  });

	return (
		<>

			<li className={styles.ingredient}
				onClick={()=>{ dispatch({type:OPEN, data:item})}}
				draggable
				ref={dragRef}
			>
				{item.used > 0 && <Counter count={item.used} size="default" />}
				<img className={styles.image}
					 src={item.image}
					 alt={item.name}
				/>
				<span className={styles.price}>
					<p className={cls}>
						{item.price}
					</p>
					<CurrencyIcon type="primary"/>
				</span>
				{item.name}
			</li>

			<Modal
				visible      = {isVisible}
				title        = "Детали ингридиента"
				onClickClose = {()=>{ dispatch({type:CLOSE})}}>
					<IngredientDetails />
			</Modal>
		</>
	);
};

Ingredient.propTypes = {
	item: ingredient.isRequired
};

export default Ingredient;