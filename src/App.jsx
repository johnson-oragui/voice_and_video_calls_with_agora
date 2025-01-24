// import React, { useEffect, useState } from 'react';
// import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// import Navbar from './components/NavBar';
// import Footer from './components/Footer';
// import InitRoom from './components/InitRoom';
// import Home from './components/Home';
// import Room from './components/Room';
// import Login from './components/Login';

// function App() {
// 	const location = useLocation();

// 	const [showCreateRoom, setShowCreateRoom] = useState(false);

// 	useEffect(() => {
// 		if (showCreateRoom) {
// 			document.body.style.overflowY = 'hidden';
// 		} else {
// 			document.body.style.overflowY = 'auto';
// 		}
// 	}, [showCreateRoom]);

// 	return (
// 		<>
// 			<main className='min-h-screen bg-slate-800'>
// 				<div className='3xl:container 3xl:mx-auto'>
// 					{location.pathname.split('/').includes('room') ? null : (
// 						<Navbar setShowCreateRoom={setShowCreateRoom} />
// 					)}
// 					<Routes>
// 						<Route
// 							path='/login'
// 							element={<Login />}
// 						/>
// 						<Route
// 							path='/'
// 							element={<Home />}
// 						/>
// 						<Route
// 							path='/room/:channel'
// 							element={<Room />}
// 						/>
// 						<Route
// 							path='*'
// 							element={<Navigate to={'/'} />}
// 						/>
// 					</Routes>
// 					{location.pathname.split('/').includes('room') ? null : <Footer />}
// 				</div>
// 			</main>

// 			{showCreateRoom && <InitRoom setShowCreateRoom={setShowCreateRoom} />}
// 		</>
// 	);
// }

// export default App;
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login2 from './components/Login2';
import InitiateCall from './components/InitiateCall';
import AcceptCall from './components/AcceptCall';

const App = () => {
	return (
		// <Router>
		<Routes>
			<Route
				path='/'
				element={<Login2 />}
			/>
			<Route
				path='/initiate-call'
				element={<InitiateCall />}
			/>
			<Route
				path='/accept-call'
				element={<AcceptCall />}
			/>
		</Routes>
		// </Router>
	);
};

export default App;
