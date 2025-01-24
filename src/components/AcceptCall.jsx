import React, { useState } from 'react';
import API from '../api/axios';
// Import your RTC library (e.g., AgoraRTC)
import AgoraRTC from 'agora-rtc-sdk-ng'; // Example for Agora

const AcceptCall = () => {
	const [callId, setCallId] = useState('');
	const [callToken, setCallToken] = useState('');
	const [channelName, setChannelName] = useState('');
	const [uid, setUid] = useState(null);
	const [error, setError] = useState('');

	const handleAcceptCall = async () => {
		try {
			// Accept the call and retrieve token, channel name, and UID
			const response = await API.post(`/calls/${callId}/accept`);
			const { token, channel_name, uid } = response.data.data;

			setCallToken(token);
			setChannelName(channel_name);
			setUid(uid);

			alert('Call accepted successfully! Now joining...');
			joinCall(channel_name, token, uid); // Call join logic
		} catch (err) {
			console.error('Error accepting call: ', err);
			setError(err.response?.data?.detail || 'An error occurred');
		}
	};

	const joinCall = async (channelName, token, uid) => {
		try {
			// Create the client
			const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

			// Join the call
			await client.join('YOUR_APP_ID', channelName, token, uid);

			console.log('Joined the call successfully!');
			alert('Joined the call successfully!');

			// Publish local streams (audio/video)
			const localStream = AgoraRTC.createMicrophoneAndCameraTracks();
			client.publish(localStream).then(() => {
				console.log('Publishing local stream');
			});
		} catch (err) {
			console.error('Error joining the call: ', err);
			setError('Failed to join the call');
		}
	};

	return (
		<div>
			<h1>Accept Call</h1>
			<input
				type='text'
				placeholder='Call ID'
				value={callId}
				onChange={(e) => setCallId(e.target.value)}
			/>
			<button onClick={handleAcceptCall}>Accept Call</button>
			{callToken && <p>Call Token: {callToken}</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
};

export default AcceptCall;
