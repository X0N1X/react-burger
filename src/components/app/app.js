import React from 'react';
import styles from './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { BurgerContext } from "../../services/burgerContext";
import { ingredients as url, checkResponse} from "../../services/urls";

const getTmpBurger = store => {
	return {
		bun: store.find((item => item._id === '60d3b41abdacab0026a733c6')),
		ingredients: [
			store.find((item => item._id === '60d3b41abdacab0026a733c8')),
			store.find((item => item._id === '60d3b41abdacab0026a733c9')),
			store.find((item => item._id === '60d3b41abdacab0026a733cb')),
			store.find((item => item._id === '60d3b41abdacab0026a733cc')),
			store.find((item => item._id === '60d3b41abdacab0026a733d1')),
			store.find((item => item._id === '60d3b41abdacab0026a733d3'))
		]
	};
};

const getGroups = store => {
	const groups = [];

	store.forEach(item => {
		const index = groups.findIndex(group => group.name === item.type);

		if (index >= 0) {
			groups[index].children.push(item);

		} else {
			let text = '';
			switch (item.type) {
				case 'bun':
					text = 'Булки';
					break;
				case 'sauce':
					text = 'Булки';
					break;
				case 'main':
					text = 'Начинки';
					break;
			}

			groups.push({
				name:     item.type,
				text:     text,
				children: [item]
			});
		}
	});
	return groups;
};

export default function App() {

	const context = {
		store:         [],
		loading:       false,
		hasError:      false,
		currentTab:    'constructor',
		order: {
			currentBurger: null,
			number:        0,
			loading:       false,
			hasError:      false
		}
	};

	const [state, setState] = React.useState(context);

	React.useEffect(() => {
		const getIngredients = () => {
			setState({...state, loading: true});
			fetch(url).then(checkResponse).then((result) => {
				if (result && result.success) {
					const burger = getTmpBurger(result.data);
					setState({...state, store:getGroups(result.data), order:{...state.order, currentBurger:burger}});
				} else {
					setState({...state, hasError:true, isLoading:false});
				}
			}).catch((e) => {
				setState({ ...state, hasError: true, isLoading: false})
			});
		};
		getIngredients();
	}, []);

	return (

		<BurgerContext.Provider value={{state, setState}}>
			<div className={styles.app}>
				<AppHeader
					currentTab={state.currentTab}
				/>
				<section className={state.currentTab === 'constructor' ? styles.constructor : styles.hidden_section}>
					{!state.hasError ? (
						<>
							<BurgerIngredients />
							<BurgerConstructor />
						</>
					):(
						<h1>Ошибка чтения ингредиентов</h1>
					)}
				</section>
				<section className={state.currentTab === 'orders' ? styles.orders : styles.hidden_section}>
					Лента заказов
				</section>
				<section className={state.currentTab === 'profile' ? styles.profile : styles.hidden_section}>
					Личный кабинет
				</section>
			</div>
		</BurgerContext.Provider>

	);
}