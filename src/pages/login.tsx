import React, {ChangeEvent, FormEvent} from "react";
import styles from './panel.module.css';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from 'react-router-dom';
import { login, setLogin } from "../services/actions/login";
import { checkAccessToken } from "../services/urls";
import { useAppDispatch, useAppSelector } from "../hooks";


export function PageLogin() {
    const titleCls = 'text text_type_main-large ' + styles.header;
    const { form } = useAppSelector(state => state.login);
    const { email, password } = form;

    const { isAuth } = useAppSelector(state => state.user);
    const { loading } = useAppSelector(state => state.login);

    const isAccessToken = checkAccessToken();

    const dispatch = useAppDispatch();
    const location = useLocation();
    const state = location.state as LocationState;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setLogin(e.target.name, e.target.value))
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(form));
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