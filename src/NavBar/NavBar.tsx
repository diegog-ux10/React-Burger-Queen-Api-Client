import { IUser } from "../interfaces";

export const NavBar = ({onLogout, user}: {onLogout: () => void, user: IUser}) => {
	const userSignedIn = user.id > 0;

	return (userSignedIn &&
	<nav>
		<ul>
			<li>
				<a href='#' onClick={onLogout}>Sign out</a>
			</li>
		</ul>
	</nav>
	)
};
