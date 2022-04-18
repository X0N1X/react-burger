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
			<div style={{width:600, marginLeft:40}}>

			</div>
		)
	}
}

export default BurgerConstructor