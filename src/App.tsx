import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './Login/Login'
import { useEffect, useState } from 'react';
import Home from './Home/Home';
import { IUser, Role } from './interfaces.d';

const loginPath = '/';
const homePath = '/home';

const ProtectedRoute = ({
	isAllowed,
	redirectPath = loginPath,
	children,
}: {
	isAllowed: boolean;
    redirectPath?: string;
    children: React.ReactNode;
}) => {
	if (!isAllowed) {
		return <Navigate to={redirectPath} replace />;
	}

	return children ? children : <Outlet />;
};

function App() {
	const tokenKey = 'token';
	const tokenUserId = 'userId';
	const navigate = useNavigate();
	const initialUser = {
		id: -1,
		email: '',
		role: Role.waiter,
		token: ''
	};
	const [user, setUser] = useState<IUser>({ ...initialUser, id: -2 });
	const [isUserSignedIn, setIsUserSignedIn] = useState(false);
	const handleSignOut = () => {
		setUser(initialUser);
	};
	const validateNavigate = () => {
		const tokenLS = localStorage.getItem(tokenKey);
		setIsUserSignedIn(tokenLS !== null);
	};
	const renderNav = () => (
		<nav>
			<ul>
				<li>
					<a href='#' onClick={handleSignOut}>Sign out</a>
				</li>
			</ul>
		</nav>);

	useEffect(() => {
		validateNavigate();
	}, [navigate]);

	useEffect(() => {
		const signOut = user.id === -1;
		const signIn = user.id >= 0;
		if (signOut) {
			localStorage.removeItem(tokenUserId);
			localStorage.removeItem(tokenKey);
		} else if (signIn) {
			localStorage.setItem(tokenUserId, user.id.toString());
			localStorage.setItem(tokenKey, user.token);
		}
		validateNavigate();
	}, [user]);

	return (<>
		<header>
			KvnBurger
			{isUserSignedIn && renderNav()}
		</header>
		<main>
			<Routes>
				<Route path={loginPath} element={<ProtectedRoute isAllowed={!isUserSignedIn} redirectPath={homePath} >
					<Login setUser={setUser} />
				</ProtectedRoute>} />
				<Route path={homePath} element={<ProtectedRoute isAllowed={isUserSignedIn} >
					<Home user={user} />
				</ProtectedRoute>} />
				<Route path="*" element={<>Route not found</>} />
			</Routes>
		</main>
		<footer>Created by Kvn</footer>
	</>)
}

export default App
