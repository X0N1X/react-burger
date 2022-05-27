import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./header-button.module.css";


const HeaderButton = ({ icon,tabText, tabName, currentTab }) => {
	return (
		<div className={styles.button}>
			<Button type="secondary" size="medium">
				<div className = {styles.icon}>
					{icon}
				</div>
				<span className = {currentTab === tabName ?
						styles.active_text : styles.inactive_text}>
					{tabText}
				</span>
			</Button>
		</div>
	);
};

HeaderButton.propTypes = {
	icon:       PropTypes.element.isRequired,
	tabName:    PropTypes.string.isRequired,
	tabText:    PropTypes.string.isRequired,
	currentTab: PropTypes.string.isRequired
};

export default HeaderButton;