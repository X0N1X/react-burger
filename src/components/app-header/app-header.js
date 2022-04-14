import React from 'react';
import { Logo, Tab, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

class AppHeader extends React.Component {
	constructor(props) {
		super(props);
	};

	handleChangeTab = (value) => {
		this.props.onChangeTab(value);
	};

	render() {
		return (
			<header style={{ display: 'flex' }}>
				<Tab
					value   = "constructor"
					active  = {this.props.currentTab === 'constructor'}
					onClick = {this.handleChangeTab}
				>
					<BurgerIcon type="primary" />
					<span className="p-3">
						Конструктор
					</span>
				</Tab>
				<Tab
					value   = "orders"
					active  = {this.props.currentTab === 'orders'}
					onClick = {this.handleChangeTab}
				>
					<ListIcon type="primary" />
					<span className="p-3">
						Лента заказов
					</span>
				</Tab>
				<Logo />
				<Tab
					value   = "profile"
					active  = {this.props.currentTab === 'profile'}
					onClick = {this.handleChangeTab}
				>
					<ProfileIcon type="primary" />
					<span className="p-3">
						Личный кабинет
					</span>
				</Tab>
			</header>
		)
	};
}

export default AppHeader;