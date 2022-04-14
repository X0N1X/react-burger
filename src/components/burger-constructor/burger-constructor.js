import React from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

class BurgerConstructor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentTab: 'all'
		}
	}

	handleChangeTab = (tab) => {this.setState(oldState => ({...oldState, currentTab:tab}))};

	render() {


		return (
			<>
				<header style={{ display: 'flex' }}>
					<Tab
						value = "all"
						active  = {this.state.currentTab === 'all'}
						onClick = {this.handleChangeTab}
					>
						Все
					</Tab>
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
				<section>
					{this.props.store.map((group, index) => (
						<ul className="p-3" key = {index} style={{
								columnCount: 2,
								display: this.state.currentTab === 'all' || this.state.currentTab === group.name ? 'block' : 'none'}}>
							{group.text}
							{group.children.map((item) => (
								<li>
									<img src={item.image} alt={item.name}/>
									{item.price}
									<CurrencyIcon type="primary" />
									{item.name}
								</li>
							))}
						</ul>
					))}

				</section>
			</>
		)
	}
}

export default BurgerConstructor