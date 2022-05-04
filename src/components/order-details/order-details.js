import styles from './order-details.module.css';
import PropTypes from 'prop-types';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";


const OrderDetails = (props) => {

	const textCls = styles.id_text + ' text text_type_main-medium';

	return (
		<div className = {styles.panel}>
			{props.loading ? (
				<h2> Обработка ...</h2>
			) : props.hasError ? (
				<h2> Ошибка при обработке заказа</h2>
			) : (
				<>
					<div className = 'text_type_digits-large'>
						{props.number}
					</div>
					<div className = {textCls}>
						идентификатор заказа
					</div>
					<div className = {styles.image}>
						<CheckMarkIcon type="primary"/>
					</div>
					<div className = 'text text_type_main-small'>
						Ваш заказ начали готовить
					</div>
					<div className = 'text text_type_main-small text_color_inactive'>
						Дождитесь готовности на орбитальной станции
					</div>
				</>
			)}
		</div>
	)
};


OrderDetails.propTypes = {
    number:   PropTypes.number,
	loading:  PropTypes.bool.isRequired,
	hasError: PropTypes.bool.isRequired
};

export default OrderDetails;

