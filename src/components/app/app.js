import React from 'react';
import styles from './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import { useDispatch } from 'react-redux';
import { getIngredients } from "../../services/actions/store";
import { Outlet } from 'react-router-dom';

export default function App() {

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getIngredients());
		}, [dispatch]
	);

	return (
		<>
			<AppHeader/>
			<main className={styles.app}>
				<Outlet/>
			</main>
		</>
	);
};