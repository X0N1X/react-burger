import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from './button/header-button';
import styles from './app-header.module.css';
import { useMatch } from "react-router-dom";


const AppHeader = () => {

	const isMain    = !!useMatch({path: '/', exact: true}),
		  isProfile = !!useMatch('/profile'),
		  isOrders  = !!useMatch('/orders');

	return (
		<header className={styles.header}>
			<HeaderButton
				icon       = {<BurgerIcon type = {isMain ? 'primary' : 'secondary'}/>}
				active     =  {isMain}
				tabText    = 'Конструктор'
				path       = '/'/>
			<HeaderButton
				icon       = {<ListIcon type = {isOrders ? 'primary' : 'secondary'}/>}
				active     = {isOrders}
				tabText    = 'Лента заказов'
				path       = '/orders'/>
			<Logo />
			<HeaderButton
				icon       = {<ProfileIcon type = {isProfile ? 'primary' : 'secondary'}/>}
				active     = {isProfile}
				tabText    = 'Личный кабинет'
				path       = '/profile'/>
		</header>
	)
};

export default AppHeader;