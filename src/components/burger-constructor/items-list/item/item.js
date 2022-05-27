import React, {useRef} from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './item.module.css'
import PropTypes from "prop-types";
import { ingredient } from "../../../../types/types";
import { useDispatch } from "react-redux";
import { DELETE, ORDER } from "../../../../services/actions/constructor";
import { DECREASE } from "../../../../services/actions/store";
import { useDrag, useDrop } from "react-dnd";

const Item = ({ item,index }) => {

	const dispatch = useDispatch();

	const ref = useRef(null);

	const [{ isDrag }, drag] = useDrag({
		type: 'constructorCard',
		item: {item: item, index: index}
	});

	const [, drop] = useDrop({
		accept: 'constructorCard',
		drop (item) {
			dispatch({
				type: ORDER,
				data: {
					from: item.app,
					to:   index
				}
			});
		}
	});

	const dragDropRef = drag(drop(ref));

	const removeItem = () => {
		const index = dragDropRef.current.getAttribute('app.js.js');

		dispatch({
			type: DELETE,
			data: +index
		});
		dispatch({
			type: DECREASE,
			data: item
		});
	};

	return (
		<div index={index} className={`${styles.item} ${ isDrag && styles.drag} ingredient`} draggable ref={dragDropRef}>
			<div>
				<DragIcon type = 'primary'/>
			</div>
			<ConstructorElement
				text      = {item.name}
				price     = {item.price}
				thumbnail = {item.image}
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