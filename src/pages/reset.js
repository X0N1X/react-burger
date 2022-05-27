import React from "react";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './panel.module.css';

import { useSelector, useDispatch } from "react-redux";
import { passwordReset, setPasswordReset } from '../services/actions/password';
import { Link, Navigate } from 'react-router-dom';

export function PageReset() {

    const titleCls = 'text text_type_main-large ' + styles.header;

    const { password, token } = useSelector(state => state.password.resetForm);
    const { isAuth } = useSelector(state => state.user);
    const { resetLoading, resetSuccess, forgotSuccess } = useSelector(state => state.password);
    const dispatch = useDispatch();

    const onChange = (e) => {
        dispatch(setPasswordReset(e.target.name, e.target.value));
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(passwordReset())
    };

    if (isAuth) {
        return (
          <Navigate to="/profile"/>
        );
    }

    if (!forgotSuccess) {
        return (
            <Navigate to="/forgot-password"/>
        )
    }

    if (resetSuccess) {
        return (
            <Navigate to="/login"/>
        )
    }

    return (
        <section className={styles.panel}>
            <form className={styles.login} onSubmit={submit}>
                <h1 className={titleCls}>Восстановление пароля</h1>
                <PasswordInput 
                    onChange = {onChange} 
                    value    = {password} 
                    name     = "password" 
                />
                <Input
                    type        = "text"
                    placeholder = "Введите код из письма"
                    onChange    = {onChange}
                    value       = {token}
                    name        = "token"
                    error       = {false}
                    errorText   = "Ошибка"
                    size        = "default"
                />
                <Button
                    type     = "primary"
                    size     = "medium"
                    disabled = {resetLoading}
                >
                    Сохранить
                </Button>
            </form>
            <div className={styles.link}>
                <span>
                    Вспомнили пароль? <Link to="/login">Войти</Link>
                </span>
            </div>
        </section>
    );
}