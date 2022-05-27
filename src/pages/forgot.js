import React, { useEffect } from "react";
import styles from './panel.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { passwordForgot, setPasswordForgot } from '../services/actions/password';

export function PageForgot() {
    const titleCls = 'text text_type_main-large ' + styles.header;
    const { email } = useSelector(state => state.password.forgotForm);
    const { isAuth } = useSelector(state => state.user);
    const { forgotLoading, forgotSuccess } = useSelector(state => state.password);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
            if (forgotSuccess) {
                navigate('/reset-password', {replace: true});
            }
        }, [forgotSuccess]
    );

    const onChange = (e) => {
        dispatch(setPasswordForgot(e.target.name, e.target.value));
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(passwordForgot(e.target.name, e.target.value));
    };

    if (isAuth) {
        return (
          <Navigate to="/profile"/>
        );
    }
    
    return (
        <section className={styles.panel}>
            <form className={styles.login} onSubmit={submit}>
                <h1 className={titleCls}>Восстановление пароля</h1>
                <Input
                    type        = "text"
                    size        = "default"
                    name        = "email"
                    placeholder = "Укажите e-mail"
                    onChange    = {onChange}
                    value       = {email}
                    error       = {false}
                    errorText   = "Ошибка"
                />
                <Button
                    type     = "primary"
                    size     = "medium"
                    disabled = {forgotLoading}
                >
                    Восстановить
                </Button>
            </form>
            <div className={styles.link}>
                <span>
                    Вспомнили пароль? <Link to="/login">Войти</Link>
                </span>
            </div>
        </section>
    );
};