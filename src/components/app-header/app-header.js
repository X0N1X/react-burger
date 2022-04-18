import React from 'react';
import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from '../header-button/header-button';
import styles from './app-header.module.css';


class AppHeader extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {

		return (
			<header className={styles.header}>
				<HeaderButton
					icon       = {<BurgerIcon type={this.props.currentTab === 'constructor'?'primary':'secondary'}/>}
					tabName    = 'constructor'
					tabText    = 'Конструктор'
					currentTab = {this.props.currentTab}/>
				<HeaderButton
					icon       = {<ListIcon type={this.props.currentTab === 'orders'?'primary':'secondary'}/>}
					tabName    = 'orders'
					tabText    = 'Лента заказов'
					currentTab = {this.props.currentTab}/>
				<Logo />
				<HeaderButton
					icon       = {<ProfileIcon type={this.props.currentTab === 'profile'?'primary':'secondary'}/>}
					tabName    = 'profile'
					tabText    = 'Личный кабинет'
					currentTab = {this.props.currentTab}/>
			</header>
		)
	};
}

export default AppHeader;