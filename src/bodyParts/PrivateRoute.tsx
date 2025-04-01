import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    component: React.ComponentType<any>;
    isAuthenticated: boolean;
    [key: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: Component,
    isAuthenticated,...rest
    }) => (
    <Route
        {...rest}
        element={
            isAuthenticated ? (
                <Component />
            ) : (
                <Navigate to="/login" replace />
            )
        }
    />
);

export default PrivateRoute;