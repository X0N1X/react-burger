import styles from "../../pages/profile.module.css";
import { NavLink } from "react-router-dom";
import React from "react";

export const ProfileNavigation = () => {
    return (
        <div className={styles.navigationPanel}>
            <ul>
                <li>
                    <NavLink
                        to        = "/profile"
                        className = {(isActive) => isActive ?
                            'text text_type_main-medium text_color_primary' :
                            'text text_type_main-medium text_color_inactive'}
                    >
                        Профиль
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to        = "/profile/orders"
                        className = {(isActive) => isActive ?
                            'text text_type_main-medium text_color_primary' :
                            'text text_type_main-medium text_color_inactive'}
                    >
                        История заказов
                    </NavLink>
                </li>
                <li className={'text text_type_main-medium'}>
                    <NavLink
                        to        = "/logout"
                        className = {(isActive) => isActive ?
                            'text text_type_main-medium text_color_primary' :
                            'text text_type_main-medium text_color_inactive'}
                    >
                        Выход
                    </NavLink>
                </li>
            </ul>
        </div>
    )
};