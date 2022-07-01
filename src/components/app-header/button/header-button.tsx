import React, {ReactNode} from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./header-button.module.css";
import { NavLink } from "react-router-dom";

interface IHeaderButton {
	icon:ReactNode;
	tabText:string;
	active:boolean;
	path:string;
}

const HeaderButton = ({ icon, tabText, active, path }:IHeaderButton) => {
	return (
		<NavLink to={path}>
			<div className={styles.button}>
				<Button type="secondary" size="medium">
					<div className={styles.icon}>
						{icon}
					</div>
					<span className={active ? styles.active_text : styles.inactive_text}>
						{tabText}
					</span>
				</Button>
			</div>
		</NavLink>
	);
};

export default HeaderButton;