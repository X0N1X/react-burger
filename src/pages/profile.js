import React, { useEffect } from 'react';
import styles from './profile.module.css';
import { NavLink, Navigate} from 'react-router-dom';
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { setUser, patchUser, getUser } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';

export function PageProfile() {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUser());
    },[dispatch]);

    const { name, email, password } = useSelector(state => state.user.profile);

    const { patchLoading } = useSelector(state => state.user);

    const onChange = (e) => {
        dispatch(setUser(e.target.name, e.target.value));
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(patchUser());
    };

    const cancel = (e) => {
        e.preventDefault();
        dispatch(getUser());
    };

    return (
        <section className={styles.panel}>
            <div className={styles.navigationPanel}>
                <ul>
                    <li>
                        <NavLink
                            to        = "/profile"
                            className = {(isActive) => isActive ?
                                'text text_type_main-medium text_color_primary' :
                                'text text_type_main-medium text_color_inactive'}
                            exact     = "true">
                            Профиль
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to        = "/profile/orders"
                            className = {(isActive) => isActive ?
                                'text text_type_main-medium text_color_primary' :
                                'text text_type_main-medium text_color_inactive'}
                            exact     = "true">
                            История заказов
                        </NavLink>
                    </li>
                    <li className={'text text_type_main-medium'}>
                        <NavLink
                            to        = "/logout"
                            className = {(isActive) => isActive ?
                                'text text_type_main-medium text_color_primary' :
                                'text text_type_main-medium text_color_inactive'}
                            exact     = "true">
                            Выход
                        </NavLink>
                    </li>
                </ul>
                <p className={'text text_color_inactive'}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <form className={styles.user + ''} onSubmit={submit}>
                <Input
                    type        = "text"
                    placeholder = "Имя"
                    name        = "name"
                    error       = {false}
                    errorText   = "Ошибка"
                    size        = "default"
                    onChange    = {onChange}
                    value       = {name}
                />
                <EmailInput
                    onChange = {onChange}
                    value    = {email}
                    name     = "email"
                />
                <PasswordInput
                    onChange = {onChange}
                    value    = {password}
                    name     = "password"
                />
                <div className={styles.btn_container}>
                    <Button
                        type     = "primary"
                        size     = "medium"
                        disabled = {patchLoading}
                        onClick  = {cancel}
                    >
                        Отмена
                    </Button>
                    <Button
                        type     = "primary"
                        size     = "medium"
                        disabled = {patchLoading}
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
        </section>
    )
}