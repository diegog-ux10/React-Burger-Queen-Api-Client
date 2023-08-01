import { IUser } from "../../Util/interfaces";

function Home({user}: { user: IUser}) {

	return (<>
		<section>
			Welcome {user.email}!
		</section>
	</>);
}
export default Home;