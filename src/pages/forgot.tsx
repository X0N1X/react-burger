import React, {useEffect, FormEvent, useState, ChangeEvent, SyntheticEvent, ReactElement, FC, ReactNode} from "react";
import styles from './panel.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, Navigate } from 'react-router-dom';
import { passwordForgot, setPasswordForgot } from '../services/actions/password';
import { useAppSelector, useAppDispatch } from "../hooks";

declare const Button1: React.FC<{
    type?: 'secondary' | 'primary';
    size?: 'small' | 'medium' | 'large';
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    disabled?: boolean;
    name?: string;
    htmlType?: 'button' | 'submit' | 'reset.tsx';
}>;

export function PageForgot() {
    const titleCls = 'text text_type_main-large ' + styles.header;
    const { email } = useAppSelector(state => state.password.forgotForm);
    const { isAuth } = useAppSelector(state => state.user);
    const { forgotLoading, forgotSuccess } = useAppSelector(state => state.password);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
            if (forgotSuccess) {
                navigate('/reset-password', {replace: true});
            }
        }, [forgotSuccess]
    );

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setPasswordForgot(e.target.name, e.target.value));
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(passwordForgot() as any);
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