import api from '../lib/axios';

class AuthService {
	static login = ({ username, password }) => api.post('api/login.php', { username, password });

	static register = data => api.post('api/register.php', data);
								
	static me = () => api.get('api/me');
}

export default AuthService;