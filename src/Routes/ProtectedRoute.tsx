import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getSession } from "../Services/TokenRepository";
import { PATHNAMES } from "./Routes";
import { getUser } from "../Services/UserRepository";

export const ProtectedRoute = () => {
	const { token, userId } = getSession();
	const navigate = useNavigate();

	useEffect(() => {
		getUser(userId)
			.catch(() => navigate(PATHNAMES.LOGIN));
	}, []);

	return token ? <Outlet /> : <Navigate to={PATHNAMES.LOGIN} replace />;
};