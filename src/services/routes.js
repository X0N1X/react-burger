import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { checkAccessToken } from "./urls";

const PublicOnlyRoute = ({ outlet }) => {
    const { isAuth } = useSelector(state => state.user),
          isAccessToken = checkAccessToken();
    const { state } = useLocation();

    return !isAuth && !isAccessToken ? outlet : (<Navigate to={state ? state.from : '/'} replace={true}/>);
};

const ProtectedRoute = ({ outlet }) => {
    const { isAuth } = useSelector(state => state.user),
          location = useLocation(),
          isAccessToken = checkAccessToken();

    return isAuth || isAccessToken ? outlet : (<Navigate to='/login' state={{from: location.pathname}}/>);
};

PublicOnlyRoute.propTypes = {
    outlet: PropTypes.element.isRequired
};

ProtectedRoute.propTypes = {
    outlet: PropTypes.element.isRequired
};

export { PublicOnlyRoute, ProtectedRoute };