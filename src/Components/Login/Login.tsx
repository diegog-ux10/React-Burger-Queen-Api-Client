import { useState } from "react";
import { EventOnChange, EventPreventDefault, ICurrentUser, ILoginResponse } from "../../Models/interfaces.d";
import { login } from "../../Services/Login.service";

function Login({ onCreateToken }: { onCreateToken: (a: ICurrentUser) => void }) {
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
			.then((res: ILoginResponse) => {
				const currentUser = {
					user: res.user,
					token: res.accessToken
				};
				onCreateToken(currentUser);
			}).catch(setMessage)
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