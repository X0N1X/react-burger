import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from './ingredient/ingredient'

import styles from './category.module.css';


class Category extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<>
				<span className={styles.title}>
						{this.props.group.text}
				</span>
				<ul className={styles.list}>

					{this.props.group.children.map((item) => (
						<Ingredient key={item._id} item={item}/>
					))}
				</ul>
			</>
		);
	}
}
export default Category;