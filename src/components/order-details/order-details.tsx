import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC} from "react";

interface IOrderDetails {
	number?:  number;
	loading:  boolean;
	hasError: boolean;
}

const OrderDetails: FC<IOrderDetails> = ({number, loading, hasError}) => {

	const textCls = styles.id_text + ' text text_type_main-medium';

	return (
		<div className = {styles.panel}>
			{loading ? (
				<h2> Обработка ...</h2>
			) : hasError ? (
				<h2> Ошибка при обработке заказа</h2>
			) : (
				<>
					<div className = 'text_type_digits-large'>
						{number}
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

export default OrderDetails;

