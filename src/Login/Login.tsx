import { useState } from "react";
import { EventOnChange, EventPreventDefault } from "../interfaces";
import { login } from "../Services/Login.service";

function Login() {

	const initialFormState = {
			email: "",
			password: ""
		},
		[ formData, setFormData ] = useState(initialFormState),
		[ loginLoading, setLoginLoading ] = useState(false),
		[ result, setResult ] = useState(""),
		setEmail = (e: EventOnChange) => setFormData({...formData, email: e.target.value }),
		setPassword = (e: EventOnChange) => setFormData({...formData, password: e.target.value }),
		submit = (e: EventPreventDefault) => {
			e.preventDefault();
			setResult("");
            setLoginLoading(true);
			login(formData.email, formData.password)
				.then(res => {
					let newResult;
					if (typeof res === 'string') {
						newResult = res;
					} else {
						newResult = 'Logged in successfully';
						localStorage.setItem("token", res.accessToken)
					}
					setResult(newResult);
				}).catch(err => console.log(err))
				.finally(() => setLoginLoading(false));
		};

	return (<>
		<section>
			Login
			<form onSubmit={ submit }>
				<label htmlFor="user-email">E-mail:</label>
				<input required type="email" placeholder="E-mail" id="user-email"
					disabled={ loginLoading }
					value={ formData.email }
					onChange={ setEmail }
					/>
				<br />
				<label htmlFor="user-password">Password:</label>
                <input required type="password" placeholder="Password" id="user-password"
					disabled={ loginLoading }
					value={ formData.password }
					onChange={ setPassword }
					/>
				<br />
				{ loginLoading && <><span>Loading...</span><br /></> }
				{ result && <><span>{result}</span><br /></> }
                <button type="submit"
					disabled={ loginLoading }
					>
					Login
					</button>
			</form>
		</section>
	</>)
}
export default Login;