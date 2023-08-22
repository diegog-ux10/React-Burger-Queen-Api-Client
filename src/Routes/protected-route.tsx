import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getSession } from "../services/token-repository";
import { PATHNAMES } from "./routes";
import { getUser } from "../services/user-repository";

export const ProtectedRoute = () => {
  const { token, userId } = getSession();
  const navigate = useNavigate();

  useEffect(() => {
    getUser(userId).catch(() => navigate(PATHNAMES.LOGIN));
  }, []);

  return token ? <Outlet /> : <Navigate to={PATHNAMES.LOGIN} replace />;
};
