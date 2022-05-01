import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from './button/header-button';
import styles from './app-header.module.css';
import PropTypes from 'prop-types';


const AppHeader = (props) => {

	return (
		<header className={styles.header}>
			<HeaderButton
				icon       = {<BurgerIcon type = {props.currentTab === 'constructor' ? 'primary' : 'secondary'}/>}
				tabName    = 'constructor'
				tabText    = 'Конструктор'
				currentTab = {props.currentTab}/>
			<HeaderButton
				icon       = {<ListIcon type = {props.currentTab === 'orders' ? 'primary' : 'secondary'}/>}
				tabName    = 'orders'
				tabText    = 'Лента заказов'
				currentTab = {props.currentTab}/>
			<Logo />
			<HeaderButton
				icon       = {<ProfileIcon type = {props.currentTab === 'profile' ? 'primary' : 'secondary'}/>}
				tabName    = 'profile'
				tabText    = 'Личный кабинет'
				currentTab = {props.currentTab}/>
		</header>
	)
};

AppHeader.propTypes = {
	currentTab: PropTypes.string.isRequired
};

export default AppHeader;