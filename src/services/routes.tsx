import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { checkAccessToken } from "./urls";

const PublicOnlyRoute = ({ outlet }:{outlet:React.ReactElement}):React.ReactElement => {
    const { isAuth }:{isAuth:boolean} = useAppSelector(state => state.user),
          isAccessToken:boolean = checkAccessToken();
    const location = useLocation();
    const state = location.state as LocationState;

    return !isAuth && !isAccessToken ? outlet : (<Navigate to={state ? state.from : '/'} replace={true}/>);

};

const ProtectedRoute = ({ outlet }:{outlet:React.ReactElement}):React.ReactElement => {
    const { isAuth } = useAppSelector(state => state.user),
          location = useLocation(),
          isAccessToken = checkAccessToken();

    return isAuth || isAccessToken ? outlet : (<Navigate to='/login' state={{from: location.pathname}}/>);
};

export { PublicOnlyRoute, ProtectedRoute };