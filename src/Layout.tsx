import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar/NavBar";
import { IUser } from "./interfaces";

export const Layout = ({onLogout, user}: {onLogout: () => void, user: IUser}) => {
	return (<>
		<header>
			KvnBurger
			<NavBar user={user} onLogout={onLogout} />
		</header>
		<main>
			<Outlet />
		</main>
		<footer>Created by Kvn</footer>
	</>);
}