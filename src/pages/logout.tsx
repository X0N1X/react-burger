import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { LOGOUT, userLogout } from "../services/actions/user";
import {useAppDispatch, useAppSelector} from "../hooks";

export function PageLogout() {

    const dispatch = useAppDispatch();

    const { isAuth } = useAppSelector(state => state.user);

    useEffect(()=>{
        isAuth && dispatch(userLogout() as any);
        dispatch({type:LOGOUT});
    }, [dispatch]);


    return (
        <Navigate to="/login"/>
    );
}