import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Category from './category/category'
import styles from './burger-ingredients.module.css';
import { group } from "../../types/types";
import * as PropTypes from 'prop-types';

const BurgerIngredients = (props) => {

	const [currentTab, setCurrentTab] = React.useState('bun');

	const handleChangeTab = (tab) => {};// {this.setState(oldState => ({...oldState, currentTab:tab}))};

	const titleCls = 'text text_type_main-large ' + styles.title;

	return (
		<div className={styles.panel}>
			<p className = {titleCls}>
				Собирите бургер
			</p>
			<header className={styles.header}>
				<Tab
					value   = "bun"
					active  = {currentTab === 'bun'}
					onClick = {handleChangeTab}
				>
					Булки
				</Tab>
				<Tab
					value   = "sauce"
					active  = {currentTab === 'sauce'}
					onClick = {handleChangeTab}
				>
					Соусы
				</Tab>
				<Tab
					value   = "main"
					active  = {currentTab === 'main'}
					onClick = {handleChangeTab}
				>
					Начинки
				</Tab>
			</header>
			<section className = {styles.section}>
				{props.store.map((group, index) => (
					<Category
						group      = {group}
						key        = {index}
						currentTab = {currentTab}
					/>
				))}
			</section>
		</div>
	)
};

BurgerIngredients.propTypes = {
	store: PropTypes.arrayOf(group).isRequired
};

export default BurgerIngredients;