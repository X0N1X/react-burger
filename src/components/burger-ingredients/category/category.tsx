import React from 'react';
import Ingredient from './ingredient/ingredient'
import styles from './category.module.css';
import { TGroup } from "../../../types/types";


const Category = ({ group }: {group:TGroup}) => {
	const items = group.children;

	return (
		<>
			<span className = {`${styles.title} category`} id={group.name}>
					{group.text}
			</span>
			<ul className = {styles.list}>
				{items.map((item) => (
					<Ingredient key = {item._id} item = {item}/>
				))}
			</ul>
		</>
	);

};

export default Category;