import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./header-button.module.css";
import { NavLink } from "react-router-dom";


const HeaderButton = ({ icon, tabText, active, path }) => {
	return (
		<NavLink exact="true" to={path}>
			<div className={styles.button}>
				<Button type="secondary" size="medium">
					<div className={styles.icon}>
						{icon}
					</div>
					<span className={active ? styles.active_text : styles.inactive_text}>
						{tabText}
					</span>
				</Button>
			</div>
		</NavLink>
	);
};

HeaderButton.propTypes = {
	icon:       PropTypes.element.isRequired,
	tabText:    PropTypes.string.isRequired,
	path:       PropTypes.string.isRequired,
	active:     PropTypes.bool.isRequired
};

export default HeaderButton;