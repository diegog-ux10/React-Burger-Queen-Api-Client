import { useNavigate } from "react-router-dom";
import { ROLES } from "../../Models/Role.d";
import { getSession } from "../../Services/TokenRepository";
import { PATHNAMES } from "../../Routes/Routes";
import './Dashboard.css';

const Dashboard: React.FC = () => {

	const { user } = getSession();
	const navigate = useNavigate();

	return <ul>
		{
			user.role === ROLES.admin && <>
				<li>
					<button onClick={() => navigate(PATHNAMES.PRODUCTS)}>Administrar productos</button>
				</li>
				<li>
					<button onClick={() => navigate(PATHNAMES.USERS)}>Administrar usuarios</button>
				</li>
			</>
		}
		{
			(user.role === ROLES.admin || user.role === ROLES.waiter) && <>
				<li>
					<button onClick={() => navigate(PATHNAMES.ORDERS + '/' + PATHNAMES.CREATE)}>Crear pedidos</button>
				</li>
			</>
		}
		<li>
			<button onClick={() => navigate(PATHNAMES.ORDERS + '/' + PATHNAMES.PENDING)}>Ver pedidos por preparar</button>
		</li>
		<li>
			<button onClick={() => navigate(PATHNAMES.ORDERS + '/' + PATHNAMES.DELIVERING)}>Ver pedidos por entregar</button>
		</li>
		<li>
			<button onClick={() => navigate(PATHNAMES.ORDERS + '/' + PATHNAMES.DELIVERED)}>Ver pedidos por entreados</button>
		</li>
	</ul >;
}
export default Dashboard;
