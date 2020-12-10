import { addUser, getUserFromEmail } from "../../services/authServices.js";
import { bcrypt } from "../../deps.js";
import { validateRegistration } from "../../middlewares/validations.js";

const loginPage = async({render}) => {
	const data = {
		errors: []
	};
	render('login.ejs', data);
}

const postLoginPage = async({ request, response, session, render }) => {
	const body = request.body();
	const params = await body.value;
	const email = params.get('email');
	const password = params.get('password');
	// check if the email exists in the database
	const res = await getUserFromEmail(email);
	if (res.rowCount === 0) {
		const data = {
			errors: {
				error: { error: "Invalid email or password"}
			}
		};
		render('login.ejs', data);
		response.status = 401;
		return;
	}
	// take the first row from the results
	const userObj = res.rowsOfObjects()[0];
	const hash = userObj.password;  
	const passwordCorrect = await bcrypt.compare(password, hash);
	if (!passwordCorrect) {
		const data = {
			errors: {
				error: { error: "Invalid email or password"}
			}
		};
		render('login.ejs', data);
		response.status = 401;
		return;
	}
	await session.set('authenticated', true);
	await session.set('user', {
		id: userObj.id,
		email: userObj.email
	});
	response.body = 'Authentication successful!';
	response.redirect('/user/reporting');
}

const registerPage = async({render}) => {
	const data = {
		errors: [],
		email: ''
	};
	render('register.ejs', data);
}

const postRegisterPage = async({request, response, render}) => {
	const data = await validateRegistration(request);
	const email = data.email;
	const password = data.password;
	const verification = data.verification;
	const existingUsers = await getUserFromEmail(email);
	if (existingUsers.rowCount > 0) {
		data.errors['email'] = { required: "The email is already in use" };
	}
	if (password !== verification) {
		data.errors['matching'] = { required: "The entered passwords did not match" };
	}
	console.log(data.errors);
	if (data.errors) {
		render('register.ejs', data);
		return;
	}

	const hash = await bcrypt.hash(password);
	addUser(email, hash);
	response.body = 'Registration successful!';
	response.redirect('/auth/login');
}

const logOut = async({response, session}) => {
	await session.set('user', undefined);
	await session.set('authenticated', undefined);
	response.redirect('/auth/login');
}

export{ loginPage, postLoginPage, registerPage, postRegisterPage, logOut };