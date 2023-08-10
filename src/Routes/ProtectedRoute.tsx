import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../Services/TokenRepository";
import { ROUTES } from "./Routes";

export const ProtectedRoute = ({isLoginRoute}: {isLoginRoute: boolean}) => {
	const { token } = getSession();
	const onFailRedirects = isLoginRoute ? ROUTES.home : ROUTES.login;
	const allowContinue = isLoginRoute ? !token : token;

	return allowContinue ? <Outlet /> : <Navigate to={onFailRedirects} replace />;
};