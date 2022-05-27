import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PublicOnlyRoute = ({ outlet }) => {
    const { isAuth } = useSelector(state => state.user),
          location   = useLocation();

    return !isAuth ? outlet : (<Navigate to={location?.from || '/'}/>);
};

const ProtectedRoute = ({ outlet }) => {
    const { isAuth } = useSelector(state => state.user),
          location = useLocation();

    return isAuth ? outlet : (<Navigate to='/login' state={{from: location.pathname}}/>);
};

PublicOnlyRoute.propTypes = {
    outlet: PropTypes.element.isRequired
};

ProtectedRoute.propTypes = {
    outlet: PropTypes.element.isRequired
};

export { PublicOnlyRoute, ProtectedRoute };