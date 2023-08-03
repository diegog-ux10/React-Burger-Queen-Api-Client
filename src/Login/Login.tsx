import { useState } from "react";
import { EventOnChange, EventPreventDefault, ILoginResponse, IUser } from "../interfaces";
import { login } from "../Services/Login.service";

function Login({ onCreateToken }: { onCreateToken: (a: IUser) => void }) {
	const initialFormState = {
		email: "",
		password: ""
	};
	const [formData, setFormData] = useState(initialFormState);
	const [loginLoading, setLoginLoading] = useState(false);
	const [message, setMessage] = useState("");
	const handleChangeEmail = (e: EventOnChange) => setFormData({ ...formData, email: e.target.value });
	const handleChangePassword = (e: EventOnChange) => setFormData({ ...formData, password: e.target.value });
	const handleSubmit = (e: EventPreventDefault) => {
		e.preventDefault();
		setMessage("");
		setLoginLoading(true);
		login(formData.email, formData.password)
			.then((res: string | ILoginResponse) => {
				const error = typeof res === 'string';
				const newResult = error ? res : 'Logged in successfully';

				if (!error) {
					const user = {
						...res.user,
						token: res.accessToken
					};
					onCreateToken(user);
				}
				setMessage(newResult);
			}).catch(err => console.log(err))// revisar sin internet y actualizar el message
			.finally(() => setLoginLoading(false));
	};

	return (<>
		<section>
			Login
			<form onSubmit={handleSubmit}>
				<label htmlFor="user-email">E-mail:</label>
				<input required type="email" placeholder="E-mail" id="user-email"
					disabled={loginLoading}
					value={formData.email}
					onChange={handleChangeEmail}
				/>
				<br />
				<label htmlFor="user-password">Password:</label>
				<input required type="password" placeholder="Password" id="user-password"
					disabled={loginLoading}
					value={formData.password}
					onChange={handleChangePassword}
				/>
				<br />
				{loginLoading && <><span>Loading...</span><br /></>}
				{message && <><span>{message}</span><br /></>}
				<button type="submit"
					disabled={loginLoading}
				>
					Login
				</button>
			</form>
		</section>
	</>);
}
export default Login;