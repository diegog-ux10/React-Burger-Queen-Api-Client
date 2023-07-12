import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './Login/Login'
import { useEffect } from 'react';
import Home from './Home/Home';

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		//const currentPath = window.location.pathname;
		const route = token !== null? '/home' : '/';
		navigate(route);
	}, [navigate]);

	return (<>
		<header>
			Welcome to KvnBurger
		</header>
		<main>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</main>
		<footer>Created by Kvn</footer>
	</>)
}

export default App
