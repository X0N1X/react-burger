import React, {DetailedHTMLProps, SyntheticEvent, UIEventHandler} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Category from './category/category'
import styles from './burger-ingredients.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {CHANGE_GROUP} from "../../services/actions/state";

const BurgerIngredients = () => {

	const dispatch = useAppDispatch();

	const { store, loading, hasError } = useAppSelector(state=>state.store);

	const { group } = useAppSelector(state=>state.state);

	const titleCls = 'text text_type_main-large ' + styles.title;

	const scrollHandler = (e: SyntheticEvent) => {
		const target: HTMLElement = e.target as HTMLElement;
		const top: number = target.scrollTop;

		const categories = Array.from(target.querySelectorAll<HTMLElement>('span.category'));

		const points = categories.map((item, index) => {
			return categories[index].offsetTop;
		});

		const index = points.findIndex(point => top+200 < point);

		dispatch({type:CHANGE_GROUP, data:categories[index !== -1 ? (index === 0 ? 0 : index - 1) : categories.length - 1].id});

	};

	const handleChangeTab = (tab: any) => {

		dispatch({type:CHANGE_GROUP, data:tab});

		const element = document.getElementById(tab);
		if (element) element.scrollIntoView({ behavior: 'smooth' });
	};

	if (hasError) {
		return (
			<div className={styles.panel}>
				<p className = {titleCls}>
					'Ошибка заргузки данных. Перезагрузите сайт.'
				</p>
			</div>
		)
	}

	return ( !loading ?
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
					value   = "main"
					active  = {group === 'main'}
					onClick = {handleChangeTab}
				>
					Начинки
				</Tab>
				<Tab
					value   = "sauce"
					active  = {group === 'sauce'}
					onClick = {handleChangeTab}
				>
					Соусы
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
		</div> : null
	)
};

export default BurgerIngredients;