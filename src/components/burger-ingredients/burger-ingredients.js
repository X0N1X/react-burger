import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import Category from './category/category'
import styles from './burger-ingredients.module.css';
import {group} from "../../types/types";
import * as PropTypes from 'prop-types';

class BurgerIngredients extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentTab: 'bun'
		}
	}

	handleChangeTab = (tab) => {};// {this.setState(oldState => ({...oldState, currentTab:tab}))};

	render() {

		const titleCls = 'text text_type_main-large ' + styles.title;

		return (
			<div className={styles.panel}>
				<p className = {titleCls}>
					Собирите бургер
				</p>
				<header className={styles.header}>
					<Tab
						value   = "bun"
						active  = {this.state.currentTab === 'bun'}
						onClick = {this.handleChangeTab}
					>
						Булки
					</Tab>
					<Tab
						value   = "sauce"
						active  = {this.state.currentTab === 'sauce'}
						onClick = {this.handleChangeTab}
					>
						Соусы
					</Tab>
					<Tab
						value   = "main"
						active  = {this.state.currentTab === 'main'}
						onClick = {this.handleChangeTab}
					>
						Начинки
					</Tab>
				</header>
				<section className = {styles.section}>
					{this.props.store.map((group, index) => (
						<Category
							group      = {group}
							key        = {index}
							currentTab = {this.state.currentTab}
						/>
					))}
				</section>
			</div>
		)
	}
}

BurgerIngredients.propTypes = {
	store: PropTypes.arrayOf(group).isRequired
};

export default BurgerIngredients;