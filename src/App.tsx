import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './Login/Login'
import { useEffect, useState } from 'react';
import Home from './Home/Home';
import { IUser, Role } from './interfaces.d';
import { ProtectedRoute } from './ProtectedRoute';
import { createSession, deleteSession, getSession } from './TokenRepository';
import { Layout } from './Layout';
import { ROUTES } from './Constants';

const initialUser = {
	id: -1,
	email: '',
	role: Role.waiter,
	token: ''
};

function App() {
	const [user, setUser] = useState<IUser>(initialUser);
	const navigate = useNavigate();
	const handleSignOut = () => {
		setUser(initialUser);
		deleteSession();
		navigate("/");
	};
	const handleCreateToken = (user: IUser) => {
		setUser(user);
		createSession(user);
		navigate("/home");
	};

	useEffect(() => {
		const { userId } = getSession();
		//TODO: pending get all user info
		setUser({ ...user, id: userId });
	}, []);

	return (
		<Routes>
			<Route element={<Layout user={user} onLogout={handleSignOut} />}> 
				<Route element={<ProtectedRoute isLoginRoute={true}/>}>
					<Route path={ROUTES.login} element={<Login onCreateToken={handleCreateToken} />} />
				</Route>
				<Route element={<ProtectedRoute isLoginRoute={false} />}>
					<Route path={ROUTES.home} element={<Home user={user} />} />
				</Route>
				<Route path="*" element={<>Route not found</>} />
			</Route>
		</Routes>
	)
}

export default App
