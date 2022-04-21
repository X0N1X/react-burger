import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './items-list.module.css'
import PropTypes from "prop-types";
import {ingredient} from "../../../types/types";


class ItemsList extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<div className = {styles.list}>
				<div style={{marginLeft:32}}>
					<ConstructorElement
						type      = "top"
						isLocked  = {true}
						text      = {this.props.bun.name + ' (верх)'}
						price     = {this.props.bun.price}
						thumbnail = {this.props.bun.image}
					/>
				</div>
				<div className = {styles.items}>
					{this.props.ingredients.map((item, index) => (
						<div key={index} className={styles.item}>
							<div style={{width:32}}>
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
				<div style={{marginLeft:32}}>
					<ConstructorElement
						type      = "bottom"
						isLocked  = {true}
						text      = {this.props.bun.name + ' (низ)'}
						price     = {this.props.bun.price}
						thumbnail = {this.props.bun.image}
					/>
				</div>
			</div>
		);
	}
}

ItemsList.propTypes = {
	bun:         ingredient.isRequired,
	ingredients: PropTypes.arrayOf(ingredient).isRequired,
};

export default ItemsList;