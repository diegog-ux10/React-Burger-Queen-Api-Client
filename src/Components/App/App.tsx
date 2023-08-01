import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from '../Login/Login'
import { useEffect, useState } from 'react';
import Home from '../Home/Home';
import { ERole, ICurrentUser, IUser } from '../../Models/interfaces.d';
import { ProtectedRoute } from '../../Routes/ProtectedRoute';
import { createSession, deleteSession, getSession } from '../../Services/TokenRepository';
import { Layout } from '../../Layout';
import { ROUTES } from '../../Routes/Routes';
import { getUser } from '../../Services/User.service';

const initialUserCurrent = {
	token: '',
	user: {
		id: -1,
		email: '',
		role: ERole.waiter,
		password: ''
	}
};

function App() {
	const [currentUser, setCurrentUser] = useState<ICurrentUser>(initialUserCurrent);
	const navigate = useNavigate();
	const handleSignOut = () => {
		setCurrentUser(initialUserCurrent);
		deleteSession();
		navigate("/");
	};
	const handleCreateToken = (user: ICurrentUser) => {
		setCurrentUser(user);
		createSession(user);
		navigate("/home");
	};
	const getUserRequest = (userId: number) => getUser(userId)
		.then((user: IUser) => {
			setCurrentUser({
				...currentUser,
				user: user
			})
		})
		.catch(handleSignOut);

	useEffect(() => {
		const { userId } = getSession();
		if(userId > 0)
			getUserRequest(userId);
		
	}, []);

	return (
		<Routes>
			<Route element={<Layout user={currentUser.user} onLogout={handleSignOut} />}> 
				<Route element={<ProtectedRoute isLoginRoute={true}/>}>
					<Route path={ROUTES.login} element={<Login onCreateToken={handleCreateToken} />} />
				</Route>
				<Route element={<ProtectedRoute isLoginRoute={false} />}>
					<Route path={ROUTES.home} element={<Home user={currentUser.user} />} />
				</Route>
				<Route path="*" element={<>Route not found</>} />
			</Route>
		</Routes>
	)
}

export default App
