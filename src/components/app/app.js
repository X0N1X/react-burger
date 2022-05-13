import React from 'react';
import styles from './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

import {useDispatch, useSelector} from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {getIngredients} from "../../services/actions/store";


export default function App() {

	const dispatch = useDispatch();
	const { hasError } = useSelector(state => state.store);
	const { tab } = useSelector(state => state.state);

	React.useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={styles.app}>
				<AppHeader
					currentTab={tab}
				/>
				<section className={tab === 'constructor' ? styles.constructor : styles.hidden_section}>
					{!hasError ? (
						<>
							<BurgerIngredients />
							<BurgerConstructor />
						</>
					):(
						<h1>Ошибка чтения ингредиентов</h1>
					)}
				</section>
				<section className={tab === 'orders' ? styles.orders : styles.hidden_section}>
					Лента заказов
				</section>
				<section className={tab === 'profile' ? styles.profile : styles.hidden_section}>
					Личный кабинет
				</section>
			</div>
		</DndProvider>
	);
}