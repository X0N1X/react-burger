import React from 'react';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './items-list.module.css'
import PropTypes from "prop-types";
import { ingredient } from "../../../types/types";
import Item from "./item/item";

const ItemsList = (props) => {

	return (
		<div className = {styles.list}>
			<div className={styles.bun_container}>
				<ConstructorElement
					type      = "top"
					isLocked  = {true}
					text      = {props.bun.name + ' (верх)'}
					price     = {props.bun.price}
					thumbnail = {props.bun.image}
				/>
			</div>
			{props.ingredients &&
				<div className={styles.items}>
					{props.ingredients.map((item, index) => <Item key={index} item={item} index={index}/>)}
				</div>
			}
			<div className={styles.bun_container}>
				<ConstructorElement
					type      = "bottom"
					isLocked  = {true}
					text      = {props.bun.name + ' (низ)'}
					price     = {props.bun.price}
					thumbnail = {props.bun.image}
				/>
			</div>
		</div>
	);
};

ItemsList.propTypes = {
	bun:         ingredient.isRequired,
	ingredients: PropTypes.arrayOf(ingredient),
};

export default ItemsList;