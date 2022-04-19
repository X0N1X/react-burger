import React from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './items-list.module.css'


class ItemsList extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<div className = {styles.list}>
				<div>
				<ConstructorElement
					type      = "top"
					isLocked  = {true}
					text      = {this.props.bun.name}
					price     = {this.props.bun.price}
					thumbnail = {this.props.bun.image}
				/>
				</div>
				<div className = {styles.items}>
					{this.props.ingredients.map((item, index) => (
						<ConstructorElement key={index}
							text      = {item.name}
							price     = {item.price}
							thumbnail = {item.image}
						/>
					))}
				</div>
				<ConstructorElement
					type      = "bottom"
					isLocked  = {true}
					text      = {this.props.bun.name}
					price     = {this.props.bun.price}
					thumbnail = {this.props.bun.image}
				/>
			</div>
		);
	}
}
export default ItemsList;