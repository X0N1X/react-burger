import React, {ChangeEvent, FormEvent} from "react";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './panel.module.css';
import { useAppDispatch, useAppSelector } from "../hooks";
import { setRegistration, registration } from '../services/actions/registration';
import { Link, Navigate } from 'react-router-dom';

export function PageRegistration() {
    const titleCls = 'text text_type_main-large ' + styles.header;

    const { form } = useAppSelector(state => state.registration);
    const { name, email, password } = form;

    const { isAuth } = useAppSelector(state => state.user);
    const { loading } = useAppSelector(state => state.registration);

    const dispatch = useAppDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setRegistration(e.target.name, e.target.value));
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registration(form));
    };

    if (isAuth) {
        return (
           <Navigate to="/profile"/>
        );
    }

    return(
        <section className={styles.panel}>
            <form className={styles.login} onSubmit={onSubmit}>
                <h1 className={titleCls}>Регистрация</h1>
                <Input
                    type        = "text"
                    placeholder = "Имя"
                    onChange    = {onChange}
                    value       = {name}
                    name        = "name"
                    error       = {false}
                    errorText   = "Ошибка"
                    size        = "default"
                />
                <Input
                    type        = "text"
                    placeholder = "E-mail"
                    onChange    = {onChange}
                    value       = {email}
                    name        = "email"
                    error       = {false}
                    errorText   = "Ошибка"
                    size        = "default"
                />
                <PasswordInput
                    onChange = {onChange}
                    value    = {password}
                    name     = "password"
                />
                <Button
                    type     = "primary"
                    size     = "medium"
                    disabled = {loading}
                >
                    Зарегистрироваться
                </Button>
            </form>
            <div className={styles.link}>
                <span>
                    Уже зарегистрированы?
                    <Link to="/login">Войти</Link>
                </span>
            </div>
        </section>
    );
}