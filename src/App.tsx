import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { ROUTES } from './Routes/Routes';

const App = () => {
	const router = createBrowserRouter(ROUTES);

	return (
		<RouterProvider
			router={router}
		/>
	)
}

export default App
