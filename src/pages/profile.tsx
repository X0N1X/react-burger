import React, {ChangeEvent, FormEvent, SyntheticEvent, useEffect} from 'react';
import styles from './profile.module.css';
import { NavLink, Navigate} from 'react-router-dom';
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { setUser, patchUser, getUser } from '../services/actions/user';
import { useAppDispatch, useAppSelector } from  "../hooks";

export function PageProfile() {
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getUser() as any);
    },[dispatch]);

    const { name, email, password } = useAppSelector(state => state.user.profile);

    const { patchLoading } = useAppSelector(state => state.user);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setUser(e.target.name, e.target.value));
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(patchUser() as any);
    };

    const cancel = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(getUser() as any);
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