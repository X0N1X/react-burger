import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from './button/header-button';
import styles from './app-header.module.css';
import PropTypes from 'prop-types';


class AppHeader extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {

		return (
			<header className={styles.header}>
				<HeaderButton
					icon       = {<BurgerIcon type = {this.props.currentTab === 'constructor' ? 'primary' : 'secondary'}/>}
					tabName    = 'constructor'
					tabText    = 'Конструктор'
					currentTab = {this.props.currentTab}/>
				<HeaderButton
					icon       = {<ListIcon type = {this.props.currentTab === 'orders' ? 'primary' : 'secondary'}/>}
					tabName    = 'orders'
					tabText    = 'Лента заказов'
					currentTab = {this.props.currentTab}/>
				<Logo />
				<HeaderButton
					icon       = {<ProfileIcon type = {this.props.currentTab === 'profile' ? 'primary' : 'secondary'}/>}
					tabName    = 'profile'
					tabText    = 'Личный кабинет'
					currentTab = {this.props.currentTab}/>
			</header>
		)
	};
}

AppHeader.propTypes = {
	currentTab: PropTypes.string.isRequired
};

export default AppHeader;