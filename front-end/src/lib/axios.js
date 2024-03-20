import axios from 'axios';
import AppService from '../services/AppService';

const axiosInstance = axios.create({
	//baseURL: 'http://147.175.98.115:8000'

	//For local development
	 baseURL: 'http://localhost:80'
});

axiosInstance.interceptors.request.use(async req => {
	const accessToken = AppService.getToken();
	if (accessToken) {
		// @ts-ignore
		req.headers.Authorization = `Bearer ${accessToken}`;
	}
	return req;
});

axiosInstance.interceptors.response.use(
	async res => res?.data,
	err => {
		if (err.response?.status === 401) {
			AppService.clearToken();
		}
		return Promise.reject(err);
	}
);

export default axiosInstance;