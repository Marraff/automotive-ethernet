class AppService {
	static getToken = () => window.localStorage.getItem('accessToken');

	static setToken = token => window.localStorage.setItem('accessToken', token);

	static clearToken = () => window.localStorage.removeItem('accessToken');

	static setUser = user => window.localStorage.setItem('user', user);

	static getUser = () => window.localStorage.getItem('user');

	static clearUser = () => window.localStorage.removeItem('user');


}

export default AppService;