import React from 'react';
import styles from './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

export default function App() {

	//const url = 'https://norma.nomoreparties.space/api/ingredients';	//этот URL часто отваливается по таймауту
	const url = 'https://api.codetabs.com/v1/proxy/?quest=https://fr.upravdom.duckdns.org/wl/?id=fNTuij9V6KeE1A0sa4ndGSpxFdg0s0iq&fmode=open';

	const [state, setState] = React.useState({
		store:         [],
		loading:       false,
		hasError:      false,
		currentTab:     'constructor',
		currentBurger: null
	});

	const getTotal = burger => {
		let total = burger.bun.price * 2;
		burger.ingredients.forEach((item)=>{total += item.price});
		return total;
	};

	const getTmpBurger = store => {
		const burger = {
			bun: store.find((item=>item._id === '60d3b41abdacab0026a733c6')),
			ingredients: [
				store.find((item=>item._id === '60d3b41abdacab0026a733c8')),
				store.find((item=>item._id === '60d3b41abdacab0026a733c9')),
				store.find((item=>item._id === '60d3b41abdacab0026a733cb')),
				store.find((item=>item._id === '60d3b41abdacab0026a733cc')),
				store.find((item=>item._id === '60d3b41abdacab0026a733d1')),
				store.find((item=>item._id === '60d3b41abdacab0026a733d3'))
			]
		};
		burger.total = getTotal(burger);
		return burger;
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

	React.useEffect(() => {
		const getIngredients = () => {
			setState({...state, loading: true});
			fetch(url).then((response) => {
				return response.ok ? response.json() : Promise.reject(response.status);
			}).then((result) => {
				if (result && result.success) {
					const burger = getTmpBurger(result.data);
					setState({...state, store:getGroups(result.data), currentBurger:burger});
				} else {
					setState({...state, hasError:true, isLoading:false});
				}
			}).catch((e) => {
				setState({ ...state, hasError: true, isLoading: false })
			});
		};
		getIngredients();
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader
				currentTab={state.currentTab}
			/>
			<section className={state.currentTab === 'constructor' ? styles.constructor : styles.hidden_section}>
				{!state.hasError ? (
					<>
						<BurgerIngredients store={state.store} currentBurger={state.currentBurger}/>
						<BurgerConstructor currentBurger={state.currentBurger}/>
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
	);
}