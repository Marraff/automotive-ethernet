import { createContext, useEffect, useReducer } from 'react';
import AuthService from '../services/AuthService';
import AppService from '../services/AppService';

const initialState = {
	isAuthenticated: false,
	isInitialized: false,
	user: null,
	loading: false
};

const authReducer = (state, action) => {
	switch (action.type) {
		case 'INITIALIZE': {
			const { isAuthenticated, user } = action.payload;
			return {
				...state,
				isAuthenticated: isAuthenticated,
				isInitialized: true,
				user
			};
		}
		case 'LOGIN': {
			const { user } = action.payload;
			return {
				...state,
				isAuthenticated: true,
				user
			};
		}
		case 'LOGOUT': {
			return {
				...state,
				isAuthenticated: false,
				user: null
			};
		}
		case 'LOADING': {
			const { loading } = action.payload;
			return {
				...state,
				loading: loading
			};
		}
		default:
			return state;
	}
};

export const AuthContext = createContext({
	...initialState,
	platform: 'JWT',
	login: async () => {},
	logout: async () => {},
	register: async () => {},
	setLoading: () => {}
});

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	useEffect(() => {
		const initialize = async () => {
			const accessToken = AppService.getToken();
			if (accessToken) {
				try {
					dispatch({ type: 'LOADING', payload: { loading: true } });
					const user = await AuthService.me();
					dispatch({
						type: 'INITIALIZE',
						payload: {
							isAuthenticated: true,
							user
						}
					});
				} catch (error) {
					AppService.clearToken();
				}
				dispatch({ type: 'LOADING', payload: { loading: false } });
			} else {
				dispatch({
					type: 'INITIALIZE',
					payload: {
						isAuthenticated: false,
						user: null
					}
				});
			}
		};
		initialize();
	}, []);

	const login = async (username, password) => {
		dispatch({ type: 'LOADING', payload: { loading: true } });
		try {
			const { token: accessToken } = await AuthService.login({ username, password });
			AppService.setToken(accessToken);
			const user = await AuthService.me();
			dispatch({
				type: 'LOGIN',
				payload: { user }
			});
			dispatch({ type: 'LOADING', payload: { loading: false } });
		} catch (error) {
			dispatch({ type: 'LOADING', payload: { loading: false } });
			throw new Error(error.message);
		}
	};

	const logout = async () => {
		AppService.clearToken();
		window.location.href = '/';
		dispatch({ type: 'LOGOUT' });
	};

	/*const register = async (email, password, name, surname) => {
		dispatch({ type: 'LOADING', payload: { loading: true } });
		try {
			await AuthService.register({ email, password, name, surname });
			dispatch({ type: 'LOADING', payload: { loading: false } });
		} catch (error) {
			dispatch({ type: 'LOADING', payload: { loading: false } });
			throw new Error(error.message);
		}
	};*/
	const register = async (data) => {
		dispatch({ type: 'LOADING', payload: { loading: true } });
		try {
			await AuthService.register(data);
			dispatch({ type: 'LOADING', payload: { loading: false } });
		} catch (error) {
			dispatch({ type: 'LOADING', payload: { loading: false } });
			throw new Error(error.message);
		}
	};

	const setLoading = async loading => {
		dispatch({ type: 'LOADING', payload: { loading: loading } });
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				platform: 'JWT',
				login,
				logout,
				register,
				setLoading
			}}>
			{children}
		</AuthContext.Provider>
	);
};