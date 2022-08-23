import React from 'react';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './items-list.module.css'
import Item from "./item/item";
import { TIngredient } from "../../../types/types";

type TItemsList = {
	bun: TIngredient,
	ingredients: TIngredient[]
}

const ItemsList = ({ bun, ingredients }:TItemsList) => {

	return (
		<div className = {styles.list}>
			{bun &&
				<div className={styles.bun_container}>
					<ConstructorElement
						type      = "top"
						isLocked  = {true}
						text      = {bun.name + ' (верх)'}
						price     = {bun.price}
						thumbnail = {bun.image}
					/>
				</div>
			}
			{ingredients &&
				<div className={styles.items}>
					{ingredients.map((item, index) => <Item key={index} item={item} index={index}/>)}
				</div>
			}
			{bun &&
				<div className={styles.bun_container}>
					<ConstructorElement
						type      = "bottom"
						isLocked  = {true}
						text      = {bun.name + ' (низ)'}
						price     = {bun.price}
						thumbnail = {bun.image}
					/>
				</div>
			}
		</div>
	);
};

export default ItemsList;