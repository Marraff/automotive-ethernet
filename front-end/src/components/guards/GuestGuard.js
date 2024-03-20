import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const GuestGuard = ({ children }) => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Navigate to="/" />;
	}
	return <>{children}</>;
};

export default GuestGuard;