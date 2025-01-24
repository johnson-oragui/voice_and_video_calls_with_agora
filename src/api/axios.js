import axios from 'axios';

const API = axios.create({
	baseURL: 'http://localhost:7001/api/v1', // Replace with your FastAPI server's URL
});

// Add JWT token to request headers
API.interceptors.request.use((config) => {
	const token = localStorage.getItem('access_token'); // Assume token is stored in localStorage
	console.log('token: ', token);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default API;
