import React, {useRef} from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './item.module.css'
import PropTypes from "prop-types";
import { ingredient } from "../../../../types/types";
import { useDispatch } from "react-redux";
import { DELETE, ORDER } from "../../../../services/actions/constructor";
import { DECREASE } from "../../../../services/actions/store";
import { useDrag, useDrop } from "react-dnd";

const Item = (props) => {

	const dispatch = useDispatch();

	const ref = useRef(null);

	const removeItem = (e) => {
		const index = +e.currentTarget.closest('div.ingredient').getAttribute('index'),
			  item = props.ingredients[index];

		dispatch({
			type: DELETE,
			data: index
		});
		dispatch({
			type: DECREASE,
			data: item
		});
	};

	const [{ isDrag }, drag] = useDrag({
		type: 'constructorCard',
		item: {item: props.item, index: props.index}
	});

	const [, drop] = useDrop({
		accept: 'constructorCard',
		drop (item) {
			dispatch({
				type: ORDER,
				data: {
					from: item.index,
					to:   props.index
				}
			});
		}
	});

	const dragDropRef = drag(drop(ref));

	return (
		<div index={props.index} className={`${styles.item} ${ isDrag && styles.drag} ingredient`} draggable ref={dragDropRef}>
			<div>
				<DragIcon type = 'primary'/>
			</div>
			<ConstructorElement
				text      = {props.item.name}
				price     = {props.item.price}
				thumbnail = {props.item.image}
				handleClose = {removeItem}
			/>
		</div>
	)
};

Item.propTypes = {
	item:  ingredient.isRequired,
	index: PropTypes.number.isRequired
};

export default Item;