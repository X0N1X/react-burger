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
		currentTab:     'constructor',
		currentBurger: null
	});

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
		const getIngredients = async() => {
			setState({...state, loading: true});
			try {
				const res  = await fetch(url);
				const data = await res.json();
				if (data.success) {
					setState({...state, store: getGroups(data.data)});
				}
			} catch (error) {
				console.log('Возникла проблема с fetch запросом: ', error.message);
			}
		};
		getIngredients();
	}, []);

	const changeTab = (tab) => setState(oldState => ({...oldState, currentTab: tab}));

	return (
		<div className={styles.app}>
			<AppHeader
				currentTab={state.currentTab}
				onChangeTab={changeTab}
			/>
			<section className={state.currentTab === 'constructor' ? styles.constructor : styles.hidden_section}>
				<BurgerIngredients store={state.store} currentBurger={state.currentBurger}/>
				<BurgerConstructor currentBurger={state.currentBurger}/>
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