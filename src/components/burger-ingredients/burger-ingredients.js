import React from 'react';
import {Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Category from './category/category'

import styles from './burger-ingredients.module.css';

class BurgerIngredients extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentTab: 'bun'
		}
	}

	handleChangeTab = (tab) => {};// {this.setState(oldState => ({...oldState, currentTab:tab}))};

	render() {


		return (
			<div style={{width:600, height:'calc(100vh-88px)'}}>
				<p className="text text_type_main-large" style={{marginTop:40, marginBottom:20}}>Собирите бургер</p>
				<header style={{ display: 'flex', paddingBottom:40 }}>
					<Tab
						value = "bun"
						active  = {this.state.currentTab === 'bun'}
						onClick = {this.handleChangeTab}
					>
						Булки
					</Tab>
					<Tab
						value = "sauce"
						active  = {this.state.currentTab === 'sauce'}
						onClick = {this.handleChangeTab}
					>
						Соусы
					</Tab>
					<Tab
						value = "main"
						active  = {this.state.currentTab === 'main'}
						onClick = {this.handleChangeTab}
					>
						Начинки
					</Tab>
				</header>
				<section className={styles.section}>
					{this.props.store.map((group, index) => (
						<Category group={group} key={index} currentTab={this.state.currentTab}/>
					))}
				</section>
			</div>
		)
	}
}
export default BurgerIngredients;