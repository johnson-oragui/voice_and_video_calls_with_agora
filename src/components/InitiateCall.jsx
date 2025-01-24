import React, { useState } from 'react';
import API from '../api/axios';
// Import your RTC library (e.g., AgoraRTC)
import AgoraRTC from 'agora-rtc-sdk-ng'; // Example for Agora

const InitiateCall = () => {
	const [receiverId, setReceiverId] = useState('');
	const [callType, setCallType] = useState('voice');
	const [callToken, setCallToken] = useState('');
	const [channelName, setChannelName] = useState('');
	const [uid, setUid] = useState(null);
	const [error, setError] = useState('');

	const handleStartCall = async () => {
		try {
			// Call the backend API to initiate a call
			const response = await API.post(`/calls/${receiverId}/start`, {
				receiver_id: receiverId,
				call_type: callType,
				call_dyt_token: 1000, // Example token balance
			});

			// Extract data from the API response
			const { token, channel_name, uid } = response.data.data;

			// Save token to local storage or state
			localStorage.setItem('agora_token', token);
			setCallToken(token);
			setChannelName(channel_name);
			setUid(uid);

			alert('Call initiated successfully! Now connecting...');
			initiateConnection(channel_name, token, uid); // Join the call
		} catch (err) {
			console.error('Error occurred: ', err);
			setError(err.response?.data?.detail || 'An error occurred');
		}
	};

	const initiateConnection = async (channelName, token, uid) => {
		try {
			// Create the Agora RTC client
			const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

			// Join the channel with the provided details
			await client.join(
				'c13a5c48c65848cb90fad3f0c00ca568',
				channelName,
				token,
				uid
			);

			console.log('Successfully joined the call!');
			alert('Successfully joined the call!');

			// Publish the local audio/video stream
			let localStream;
			if (callType === 'video') {
				// Use both microphone and camera for video calls
				localStream = await AgoraRTC.createMicrophoneAndCameraTracks();
			} else {
				// Use only the microphone for voice calls
				localStream = await AgoraRTC.createMicrophoneAudioTrack();
			}

			client.publish(localStream).then(() => {
				console.log('Publishing local stream');
			});
		} catch (err) {
			console.error('Error initiating the connection: ', err);
			setError('Failed to initiate the connection');
		}
	};

	return (
		<div>
			<h1>Initiate Call</h1>
			<input
				type='text'
				placeholder='Receiver ID'
				value={receiverId}
				onChange={(e) => setReceiverId(e.target.value)}
			/>
			<select
				value={callType}
				onChange={(e) => setCallType(e.target.value)}
			>
				<option value='voice'>Voice</option>
				<option value='video'>Video</option>
			</select>
			<button onClick={handleStartCall}>Start Call</button>
			{callToken && <p>Call Token: {callToken}</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
};

export default InitiateCall;
