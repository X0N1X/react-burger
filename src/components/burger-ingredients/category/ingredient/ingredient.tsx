import React from 'react';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';
import {TIngredient} from "../../../../types/types";

export interface IIngredient {
	item:  TIngredient & {
		used?: number;
	}
}

const Ingredient = ({ item }:IIngredient) => {
	const cls = 'text text_type_digits-small ' + styles.price_text,

		  location = useLocation(),

		  [, dragRef] = useDrag({
			  type: 'ingredient',
			  item: item
		  });

	return (
		<Link className={styles.link}
			to    = {'/ingredients/' + item._id}
			state = {{background: location}}
		>

			<li className={styles.ingredient}
				draggable
				ref={dragRef}
			>
				{item.used && item.used > 0 ? <Counter count={item.used} size="default" /> : null}
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
		</Link>
	);
};

export default Ingredient;