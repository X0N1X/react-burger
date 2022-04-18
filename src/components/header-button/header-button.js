import React from 'react';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "../header-button/header-button.module.css";

class HeaderButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.button}>
				<Button type="secondary" size="medium">
					<div className={styles.icon}>
						{this.props.icon}
					</div>
					<span className={styles.text}
						  style={{color: (this.props.currentTab === this.props.tabName ?
								  'var(--text-primary-color)' : 'var(--text-inactive-color)')}}>
						{this.props.tabText}
					</span>
				</Button>
			</div>
		)
	}
}

export default HeaderButton;