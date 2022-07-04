import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Outlet } from 'react-router-dom';

export default function App() {

	return (
		<>
			<AppHeader/>
			<main className={styles.app}>
				<Outlet/>
			</main>
		</>
	);
};