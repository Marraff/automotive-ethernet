import React from 'react';
import useAuth from '../../hooks/useAuth';
import Login from '../../pages/authentification/Login';

const AuthGuard = ({ children }) => {
	const auth = useAuth();

	if (!auth.isAuthenticated) {
		return <Login />;
	}

	return <>{children}</>;
};

export default AuthGuard;