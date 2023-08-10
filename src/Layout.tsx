import { Outlet } from "react-router-dom";
import { NavBar } from "./Components/NavBar/NavBar";
import { IUser } from "./Models/interfaces.d";

export const Layout = ({onLogout, user}: {onLogout: () => void, user: IUser}) => {
	return (<>
		<header>
			<span>KvnBurger</span>
			<NavBar user={user} onLogout={onLogout} />
		</header>
		<main>
			<Outlet />
		</main>
		<footer>Laboratoria - Created by Kvn</footer>
	</>);
}