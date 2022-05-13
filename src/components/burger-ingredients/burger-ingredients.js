import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Category from './category/category'
import styles from './burger-ingredients.module.css';
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_GROUP} from "../../services/actions/state";

const BurgerIngredients = () => {

	const dispatch = useDispatch();

	const { store } = useSelector(state=>state.store);

	const { group } = useSelector(state=>state.state);

	const handleChangeTab = (tab) => {};// {this.setState(oldState => ({...oldState, currentTab:tab}))};

	const titleCls = 'text text_type_main-large ' + styles.title;

	const scrollHandler = (e) => {
		const top = e.target.scrollTop;

		const categories = Array.from(e.target.querySelectorAll('span.category'));

		const points = categories.map((item, index) => {
			return categories[index].offsetTop;
		});

		const index = points.findIndex(point => top < point);

		dispatch({type:CHANGE_GROUP, data:categories[index !== -1 ? index : categories.length - 1].id});

	};

	return (
		<div className={styles.panel}>
			<p className = {titleCls}>
				Собирите бургер
			</p>
			<header className={styles.header}>
				<Tab
					value   = "bun"
					active  = {group === 'bun'}
					onClick = {handleChangeTab}
				>
					Булки
				</Tab>
				<Tab
					value   = "sauce"
					active  = {group === 'sauce'}
					onClick = {handleChangeTab}
				>
					Соусы
				</Tab>
				<Tab
					value   = "main"
					active  = {group === 'main'}
					onClick = {handleChangeTab}
				>
					Начинки
				</Tab>
			</header>
			<section className = {styles.section} onScroll={scrollHandler}>
				{store && store.length && store.map((group, index) => (
					<Category
						group = {group}
						key   = {index}
					/>
				))}
			</section>
		</div>
	)
};

export default BurgerIngredients;