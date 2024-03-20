import api from '../lib/axios';

class AuthService {
	static login = ({ username, password }) => api.post('api/auth/email', { username, password });

	static register = data => api.post('api/auth/register', data);

	static me = () => api.get('api/me');
}

export default AuthService;