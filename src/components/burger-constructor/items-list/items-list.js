import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './items-list.module.css'
import PropTypes from "prop-types";
import {ingredient} from "../../../types/types";


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
			<div className = {styles.items}>
				{props.ingredients.map((item, index) => (
					<div key={index} className={styles.item}>
						<div className={styles.icon_container}>
							<DragIcon type = 'primary'/>
						</div>
						<ConstructorElement
							text      = {item.name}
							price     = {item.price}
							thumbnail = {item.image}
						/>
					</div>
				))}
			</div>
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
	ingredients: PropTypes.arrayOf(ingredient).isRequired,
};

export default ItemsList;