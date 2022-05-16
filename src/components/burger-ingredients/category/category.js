import React from 'react';
import Ingredient from './ingredient/ingredient'
import styles from './category.module.css';
import { group } from "../../../types/types";


const Category = ({ group }) => {
	return (
		<>
			<span className = {`${styles.title} category`} id={group.name}>
					{group.text}
			</span>
			<ul className = {styles.list}>
				{group.children.map((item) => (
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