import React from 'react';
import Ingredient from './ingredient/ingredient'
import styles from './category.module.css';
import {group} from "../../../types/types";


class Category extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<>
				<span className = {styles.title}>
						{this.props.group.text}
				</span>
				<ul className = {styles.list}>
					{this.props.group.children.map((item) => (
						<Ingredient key = {item._id} item = {item}/>
					))}
				</ul>
			</>
		);
	}
}

Category.propTypes = {
	group: group
};

export default Category;