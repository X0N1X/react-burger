import React, {ChangeEvent, FormEvent, SyntheticEvent, useEffect} from 'react';
import styles from './profile.module.css';
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { setUser, patchUser, getUser } from '../services/actions/user';
import { useAppDispatch, useAppSelector } from  "../hooks";
import { ProfileNavigation } from "../components/profile-navigation/profile-navigation";

export function PageProfile() {
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getUser());
    },[dispatch]);

    const { profile, patchLoading } = useAppSelector(state => state.user);
    const { name, email, password } = profile;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setUser(e.target.name, e.target.value));
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(patchUser(profile));
    };

    const cancel = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(getUser());
    };

    return (
        <div>
            <section className={styles.panel}>
                <ProfileNavigation/>
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
            <p className={'text text_color_inactive'} style={{paddingTop:20}}>
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </div>
    )
}