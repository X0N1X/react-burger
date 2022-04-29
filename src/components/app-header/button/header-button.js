import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./header-button.module.css";


class HeaderButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.button}>
				<Button type="secondary" size="medium">
					<div className = {styles.icon}>
						{this.props.icon}
					</div>
					<span className = {this.props.currentTab === this.props.tabName ?
							styles.active_text : styles.inactive_text}>
						{this.props.tabText}
					</span>
				</Button>
			</div>
		)
	}
}

HeaderButton.propTypes = {
	icon:    PropTypes.element.isRequired,
	tabName: PropTypes.string.isRequired,
	tabText: PropTypes.string.isRequired
};

export default HeaderButton;