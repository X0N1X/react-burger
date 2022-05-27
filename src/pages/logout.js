import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { LOGOUT, userLogout } from "../services/actions/user";
import { useDispatch, useSelector } from "react-redux";

export function PageLogout() {

    const dispatch = useDispatch();

    const { isAuth } = useSelector(state => state.user);

    useEffect(()=>{
        isAuth && dispatch(userLogout());
        dispatch({type:LOGOUT});
    }, [dispatch]);


    return (
        <Navigate to="/login"/>
    );
}