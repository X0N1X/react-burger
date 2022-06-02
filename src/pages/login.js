import React from "react";
import styles from './panel.module.css';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login, setLogin } from "../services/actions/login";
import { useSelector } from "react-redux";
import { checkAccessToken } from "../services/urls";


export function PageLogin() {
    const titleCls = 'text text_type_main-large ' + styles.header;
    const { email, password } = useSelector(state => state.login.form);

    const { isAuth } = useSelector(state => state.user);
    const { loading } = useSelector(state => state.login);

    const isAccessToken = checkAccessToken();

    const dispatch = useDispatch();
    const { state } = useLocation();

    const onChange = (e) => {
        dispatch(setLogin(e.target.name, e.target.value))
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(login());
    };

    if (isAuth || isAccessToken) {
        return (
          <Navigate to={state ? state.from : '/'} replace={true}/>
        );
    }

    return (
        <section className={styles.panel}>
            <form className={styles.login} onSubmit={submit}>
                <h1 className={titleCls}>Вход</h1>
                <Input
                    type        = "text"
                    placeholder = "E-mail:"
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
                    Войти
                </Button>
            </form>
            <div className={styles.link}>
                <span>
                    Вы новый пользователь? <Link to="/register">Зарегистрироваться</Link>
                </span>
                <span>
                    Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
                </span>
            </div>
        </section>
    );
}