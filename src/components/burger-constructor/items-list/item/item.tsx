import React, {useRef} from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './item.module.css'
import { DELETE, ORDER } from "../../../../services/actions/constructor";
import { DECREASE } from "../../../../services/actions/store";
import { useDrag, useDrop, DragObjectFactory } from "react-dnd";
import { TIngredient } from "../../../../types/types";
import { useAppDispatch } from "../../../../hooks";


interface IItem {
	item:TIngredient;
	index:number;
}

const Item = ({ item, index }:IItem) => {

	const dispatch = useAppDispatch();

	const ref = useRef<HTMLHeadingElement>(null);

	const [{ isDrag }, drag] = useDrag({
		type: 'constructorCard',
		item: {item: item, index: index}
	}) as any;

	const [, drop] = useDrop({
		accept: 'constructorCard',
		drop (item:any) {
			dispatch({
				type: ORDER,
				data: {
					from: item.index,
					to:   index
				}
			} as any);
		}
	});

	const dragDropRef = drag(drop(ref));

	const removeItem = () => {
		const index = dragDropRef.current.getAttribute('itemID');

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
		<div itemID={index.toString()}
			 className={`${styles.item} ${ isDrag && styles.drag} ingredient`}
			 draggable
			 ref={dragDropRef}
		     data-test={item._id}
			 data-price={item.price}>
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

export default Item;