import React from 'react';
import Ingredient from './ingredient/ingredient'
import styles from './category.module.css';
import { group } from "../../../types/types";


const Category = (props) => {
	return (
		<>
			<span className = {`${styles.title} category`} id={props.group.name}>
					{props.group.text}
			</span>
			<ul className = {styles.list}>
				{props.group.children.map((item) => (
					<Ingredient key = {item._id} item = {item}/>
				))}
			</ul>
		</>
	);

};

Category.propTypes = {
	group: group
};

export default Category;