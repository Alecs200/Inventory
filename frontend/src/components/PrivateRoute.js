import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Verifica si hay un token en el almacenamiento local

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
