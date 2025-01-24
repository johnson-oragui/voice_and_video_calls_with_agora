import React, { useState } from 'react';
import API from '../api/axios';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await API.post('/auth/login', {
				email,
				password,
				device_info: {
					device_id: `'akjfokallkd09u0454l5lkaj095'${Math.random()}`,
					platform: 'ios',
					device_name: 'Galaxy S8',
					app_version: '1.0.0',
				},
			});
			localStorage.setItem('access_token', response.data.data.access_token);
			alert('Login successful!');
		} catch (err) {
			setError('Invalid credentials');
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type='submit'>Login</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
};

export default Login;
