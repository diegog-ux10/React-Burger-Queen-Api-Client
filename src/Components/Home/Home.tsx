import { ERole, IUser } from "../../Models/interfaces.d";
import Waiter from "../Waiter/Waiter";

function Home({user}: { user: IUser}) {

	const getMainContent = () => {
		let content = (<></>);
		switch (user.role) {
			case ERole.admin:
				//content = (<>Admin view</>);
				content = (<Waiter />);
				break;
				
			case ERole.waiter:
				content = (<Waiter />);
				
				break;
			case ERole.chef:
				content = (<>Chef view</>);
				
				break;
		}
		return content;
    }

	return (<>
		{ getMainContent() }
	</>);
}
export default Home;
