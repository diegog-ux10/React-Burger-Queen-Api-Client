import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import { getSession } from "../Services/TokenRepository";

interface LayoutProps {

}

const Layout : React.FC<LayoutProps> = () => {

	const {user} = getSession();

	const onLogout = () => {
		console.log("Logout");
	};

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

export default Layout;