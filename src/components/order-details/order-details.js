import styles from './order-details.module.css';
import PropTypes from 'prop-types';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const OrderDetails = (props) => {

	const textCls = styles.id_text + ' text text_type_main-medium';

	return (
		<div className = {styles.panel}>
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
		</div>
	)
};


OrderDetails.propTypes = {
    number: PropTypes.number.isRequired
};

export default OrderDetails;

